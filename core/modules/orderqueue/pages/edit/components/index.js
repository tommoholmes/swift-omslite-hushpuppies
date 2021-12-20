/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */

import React, { useEffect, useRef, useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import useStyles from '@modules/orderqueue/pages/edit/components/style';
import clsx from 'clsx';
import { formatPriceNumber } from '@helper_currency';
import { Formik, FieldArray, Field } from 'formik';
import ModalFindProduct from '@modules/orderqueue/pages/edit/components/modalFindProduct';
import gqlLocation from '@modules/orderqueue/services/graphql';

const OrderQueueEditContent = (props) => {
    const {
 formikAllocation, formikNew, orderQueue, parent, aclCheckData, initialValueEditItem, handleSubmitEdit, handleCancel,
} = props;
    const classes = useStyles();
    const router = useRouter();

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };

    const iconFilter = (channel_code) => {
        if (channel_code) {
            if (channel_code.toLowerCase().includes('swi')) {
                return '/assets/img/dashboard/channel_official.png';
            }
            if (channel_code.toLowerCase().includes('bklp')) {
                return '/assets/img/dashboard/channel_bukalapak.svg';
            }
            if (channel_code.toLowerCase().includes('blib')) {
                return '/assets/img/dashboard/channel_blibli.png';
            }
            if (channel_code.toLowerCase().includes('jdid')) {
                return '/assets/img/dashboard/channel_jd.png';
            }
            if (channel_code.toLowerCase().includes('lzda')) {
                return '/assets/img/dashboard/channel_lazada.png';
            }
            if (channel_code.toLowerCase().includes('shpe')) {
                return '/assets/img/dashboard/channel_shopee.png';
            }
            if (channel_code.toLowerCase().includes('srcl')) {
                return '/assets/img/dashboard/channel_sirclo.png';
            }
            if (channel_code.toLowerCase().includes('tkpd')) {
                return '/assets/img/dashboard/channel_tokopedia.png';
            }
            if (channel_code.toLowerCase().includes('zlra')) {
                return '/assets/img/dashboard/channel_zalora.png';
            }
            return `/assets/img/dashboard/${channel_code}.png`;
        }
        return null;
    };

    const [isModeEdit, setIsModeEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idxOpendModal, setIdxOpendModal] = useState(null);

    const handleOpenModal = (idx) => {
        setIdxOpendModal(idx);
        setIsModalOpen(true);
    };

    const [getLocationOptions, { data: dataLoc, loading: LoadingLoc }] = gqlLocation.getLocationOptions();
    const firstRenderGetLoc = useRef(true);
    const [initialLocation, setInitialLocation] = useState([]);

    useEffect(() => {
        getLocationOptions();
    }, []);

    useEffect(() => {
        if (firstRenderGetLoc.current && dataLoc && dataLoc.getLocationOptions) {
            const uniqueLocCodeBefore = initialValueEditItem?.order_items?.reduce((newList, current) => {
                const currentLoc = current?.loc_code?.split(',').map((item) => item);
                currentLoc?.forEach((loc) => {
                    if (!newList.some((x) => x === loc)) {
                        newList.push(loc);
                    }
                });

                return newList;
            }, []);

            const locCodes = new Set(uniqueLocCodeBefore);

            const fixInitialLoc = dataLoc.getLocationOptions.filter((d) => locCodes.has(d.value));

            setInitialLocation(fixInitialLoc);
            firstRenderGetLoc.current = false;
        }
    }, [dataLoc]);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(parent ? `/order/${parent}` : '/order/allorder')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{`Detail Order #${orderQueue.id}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(orderQueue.status)}>{orderQueue.status}</div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={iconFilter(orderQueue.channelCode)}
                                alt=""
                                className="iconHeader"
                                onError={(event) => (event.target.style.display = 'none')}
                            />
                            {orderQueue.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Number</h5>
                        <span className="spanHeader">{orderQueue.channelOrderId}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Date</h5>
                        <span className="spanHeader">{orderQueue.createdAt}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Last Update</h5>
                        <span className="spanHeader">{orderQueue.lastUpdated}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Acceptance Deadline</h5>
                        <span className="spanHeader">{orderQueue.acceptanceDeadline}</span>
                    </div>
                </div>

                {orderQueue.isAllowReallocate && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div className={classes.orderLabel}>
                                Order status is
{' '}
<span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={formikAllocation.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Set as Allocating
                            </Button>
                            <Button
                                className={clsx(classes.btn, 'btn-cancel')}
                                type="submit"
                                onClick={handleCancel}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {orderQueue.isAllowRecreate && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div>
                                Order status is
{' '}
<span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={formikNew.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Set as New
                            </Button>
                        </div>
                    </div>
                )}

                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${orderQueue.billing.firstname} ${orderQueue.billing.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {orderQueue.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {orderQueue.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{orderQueue.billing.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.billing.region}, 
                                ${orderQueue.billing.postcode}, ${orderQueue.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Address</h5>
                            <span className={classes.orderLabel}>{orderQueue.shipping.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.shipping.region},
                                ${orderQueue.shipping.postcode}, ${orderQueue.shipping.country_name}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Payment Method</h5>
                            <span className={classes.orderLabel}>{orderQueue.channelPaymentMethod}</span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Method</h5>
                            <span className={classes.orderLabel}>{orderQueue.channelShippingMethod}</span>
                        </div>
                    </div>
                    <br />
                    <div style={{ width: '100%' }}>
                        <div>
                            <div>
                                <h5 className={classes.titleSmall}>Items Ordered</h5>
                            </div>
                        </div>
                        <Formik initialValues={initialValueEditItem}>
                            {({
 values, setFieldValue, setValues, touched, errors,
}) => (
                                <>
                                    <ModalFindProduct
                                        open={isModalOpen}
                                        handleClose={() => setIsModalOpen(false)}
                                        idx={idxOpendModal}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                    />
                                    <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                                        <table className={classes.table}>
                                            <tbody>
                                                <tr className={classes.tr}>
                                                    <th className={classes.th} style={{ paddingLeft: 0 }}>
                                                        SKU Product
                                                    </th>
                                                    <th className={classes.th}>Name</th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Price
                                                    </th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Qty
                                                    </th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Discount Amount
                                                    </th>
                                                    <th className={classes.th}>Location Code</th>
                                                    <th className={classes.th}>Pickup At</th>
                                                    {(aclCheckData && aclCheckData.isAccessAllowed) === true && (
                                                        <th className={classes.th}>Replacement For</th>
                                                    )}
                                                    {orderQueue.isAllowReallocate && isModeEdit && (
                                                        <th className={classes.th} style={{ textAlign: 'center' }}>
                                                            Action
                                                        </th>
                                                    )}
                                                </tr>
                                                <FieldArray name="order_items">
                                                    {({ remove }) => (
                                                        <>
                                                            {values.order_items.map((e, idx) => (
                                                                <tr key={idx}>
                                                                    <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                                        {e.sku}
                                                                    </td>
                                                                    <td className={classes.td}>{e.name}</td>
                                                                    <td className={classes.td} style={{ textAlign: 'center' }}>
                                                                        {typeof e?.base_price === 'string'
                                                                            ? e?.base_price
                                                                            : formatPriceNumber(e?.base_price)}
                                                                    </td>
                                                                    <td className={classes.td} style={{ textAlign: 'center' }}>
                                                                        {isModeEdit ? (
                                                                            <Field
                                                                                type="number"
                                                                                className={classes.fieldQty}
                                                                                name={`order_items.[${idx}].qty`}
                                                                            />
                                                                        ) : (
                                                                            e?.qty
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td} style={{ textAlign: 'center' }}>
                                                                        {e.discount_amount}
                                                                    </td>
                                                                    {/* <td className={classes.td}>{e.loc_code || '-'}</td> */}
                                                                    <td className={classes.td} style={{ width: `${isModeEdit ? '300px' : 'auto'}` }}>
                                                                        {!isModeEdit ? (
                                                                            <td className={classes.td}>{e.loc_code || '-'}</td>
                                                                        ) : (
                                                                            <Autocomplete
                                                                                multiple
                                                                                className={classes.autocompleteRoot}
                                                                                name={`order_items.[${idx}].loc_code`}
                                                                                value={(() => {
                                                                                    if (typeof e.loc_code === 'string') {
                                                                                        const currentLoc = e.loc_code.split(',').map((item) => item);

                                                                                        const fixInitialLoc = currentLoc?.map((d) => initialLocation.find((loc) => loc?.value === d));
                                                                                        return fixInitialLoc;
                                                                                    }
                                                                                    return e.loc_code;
                                                                                })()}
                                                                                onChange={(val) => {
                                                                                    if (Array.isArray(val)) {
                                                                                        setFieldValue(`order_items.[${idx}].loc_code`, val);
                                                                                    }
                                                                                }}
                                                                                primaryKey="value"
                                                                                labelKey="label"
                                                                                options={dataLoc && dataLoc.getLocationOptions}
                                                                                loading={LoadingLoc}
                                                                                error={!!(touched.location && errors.location)}
                                                                                helperText={(touched.location && errors.location) || ''}
                                                                                fullWidth
                                                                            />
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td}>{e.pickup_name || '-'}</td>
                                                                    {(aclCheckData && aclCheckData.isAccessAllowed) === true && (
                                                                        <td className={classes.td}>{e.replacement_for || '-'}</td>
                                                                    )}
                                                                    {isModeEdit && (
                                                                        <td
                                                                            className={classes.td}
                                                                            style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
                                                                        >
                                                                            <div style={{ margin: 'auto 5px', display: 'flex' }}>
                                                                                <img src="/assets/img/replace.svg" alt="replace" />
                                                                                <button
                                                                                    type="button"
                                                                                    className={`link-button ${classes.btnClear}`}
                                                                                    onClick={() => handleOpenModal(idx)}
                                                                                >
                                                                                    replace
                                                                                </button>
                                                                            </div>
                                                                            <div style={{ margin: 'auto 5px', display: 'flex' }}>
                                                                                <img src="/assets/img/trash.svg" alt="delete" />
                                                                                <button
                                                                                    type="button"
                                                                                    className={`link-button ${classes.btnClear}`}
                                                                                    onClick={() => {
                                                                                        const tempDeletedItems = [...values.deleted_items];
                                                                                        tempDeletedItems.push(values.order_items[idx]);

                                                                                        setFieldValue('deleted_items', tempDeletedItems);
                                                                                        remove(idx);
                                                                                    }}
                                                                                >
                                                                                    delete
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}
                                                </FieldArray>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'end',
                                            alignItems: 'center',
                                            margin: '15px 0',
                                        }}
                                    >
                                        {aclCheckData && aclCheckData.isAccessAllowed && orderQueue.isAllowReallocate && (
                                            <>
                                                <div>
                                                    <Button
                                                        style={{ height: '30px' }}
                                                        className={classes.btn}
                                                        onClick={() => (isModeEdit ? handleSubmitEdit(values) : setIsModeEdit(true))}
                                                    >
                                                        {isModeEdit ? 'Save' : 'Edit Order'}
                                                    </Button>
                                                </div>
                                                {isModeEdit && (
                                                    <div style={{ margin: '15px 15px 0px 15px' }}>
                                                        <button
                                                            type="button"
                                                            className={`link-button ${classes.btnClear}`}
                                                            onClick={() => {
                                                                setFieldValue('deleted_items', []);
                                                                setValues(initialValueEditItem);
                                                                setIsModeEdit(false);
                                                            }}
                                                        >
                                                            cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Order Totals</h5>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Shipping Cost</td>
                                    <td className={classes.td} style={{ textAlign: 'right' }}>
                                        {formatPriceNumber(orderQueue.shippingCost)}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Grand Total</td>
                                    <td className={classes.td} style={{ textAlign: 'right' }}>
                                        {formatPriceNumber(orderQueue.grandTotal)}
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Notes for This Order</h5>
                            <span className={classes.dataSmallBlack}>{orderQueue.notes || '-'}</span>
                        </div>
                    </div>
                    {/* <div className={classes.gridTotal}>
                        <div className="grid-child" />
                        <div className="grid-child" />
                        <div className="grid-child" style={{ textAlign: 'right' }}>
                            <Button
                                className={classes.btn}
                                type="submit"
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Edit Order
                            </Button>
                        </div>
                    </div> */}
                </div>
            </Paper>
        </>
    );
};

export default OrderQueueEditContent;
