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

import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/orderqueue/pages/edit/components/style';
import { formatPriceNumber } from '@helper_currency';
import { Formik, Field, FieldArray } from 'formik';
import Autocomplete from '@common_autocomplete';
import gqlProduct from '@modules/productlist/services/graphql';

const OrderQueueEditContent = (props) => {
    const {
 formikAllocation, formikNew, orderQueue, parent, aclCheckData, initialValueEditItem, handleSubmitEdit,
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
    const [searchSKU, setSearchSKU] = useState('');
    const [optionsSKU, setOptionsSKU] = useState([]);
    const [getProductList, getProductListRes] = gqlProduct.getProductList();
    const replacementOptions = initialValueEditItem.order_items;

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSKU && optionsSKU.filter((elm) => elm?.sku?.toLowerCase().includes(searchSKU?.toLowerCase()));
            if (searchSKU && isExist.length <= 3) {
                getProductList({
                    variables: {
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            product_name: {
                                like: searchSKU,
                            },
                        },
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSKU]);

    useEffect(() => {
        if (getProductListRes && getProductListRes.data && getProductListRes.data.getProductList && getProductListRes.data.getProductList.items) {
            const sku = new Set(optionsSKU.map((d) => d.sku));
            setOptionsSKU([...optionsSKU, ...getProductListRes.data.getProductList.items.filter((d) => !sku.has(d.sku))]);
        }
    }, [getProductListRes.data]);
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
                    <div>
                        <div style={{
 display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
}}>
                            <div>
                                <h5 className={classes.titleSmall}>Items Ordered</h5>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                {orderQueue.isAllowReallocate && (
                                    <Button className={isModeEdit ? classes.btnSecondary : classes.btn} onClick={() => setIsModeEdit(!isModeEdit)}>
                                        {isModeEdit ? 'Cancel' : 'Edit'}
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            SKU Product
                                        </th>
                                        <th className={classes.th}>Name</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            Price
                                        </th>
                                        <th className={classes.th}>qty</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            Discount Amount
                                        </th>
                                        <th className={classes.th}>Location Code</th>
                                        <th className={classes.th}>Pickup At</th>
                                        {(aclCheckData && aclCheckData.isAccessAllowed) === true && <th className={classes.th}>Replacement For</th>}
                                        {orderQueue.isAllowReallocate && isModeEdit && <th className={classes.th}>Action</th>}
                                    </tr>
                                    {isModeEdit && (
                                        <Formik initialValues={initialValueEditItem}>
                                            {({
 values, setFieldValue, errors, touched,
}) => (
                                                <>
                                                    <FieldArray name="order_items">
                                                        {({ remove, push }) => (
                                                            <>
                                                                {values.order_items.map((item, idx) => (
                                                                    <tr key={idx}>
                                                                        <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                                            {item?.sku}
                                                                        </td>
                                                                        <td className={classes.td} style={{ width: 300 }}>
                                                                            {!item?.is_can_delete && item?.name}
                                                                            {item?.is_can_delete && (
                                                                                <Autocomplete
                                                                                    name={`order_items.${idx}.sku`}
                                                                                    mode={optionsSKU.length > 0 ? 'default' : 'lazy'}
                                                                                    className={`${classes.autocomplete}`}
                                                                                    value={values.order_items[idx].name}
                                                                                    onChange={(e) => {
                                                                                        setFieldValue(`order_items.${idx}.sku`, e?.sku ?? '');
                                                                                        setFieldValue(
                                                                                            `order_items.${idx}.base_price`,
                                                                                            e?.product_price ?? 0,
                                                                                        );
                                                                                        setFieldValue(`order_items.${idx}.name`, e);
                                                                                    }}
                                                                                    loading={
                                                                                        !values.order_items[idx].sku && getProductListRes.loading
                                                                                    }
                                                                                    options={optionsSKU}
                                                                                    getOptionsVariables={{
                                                                                        variables: {
                                                                                            search: searchSKU,
                                                                                            pageSize: 20,
                                                                                            currentPage: 1,
                                                                                        },
                                                                                    }}
                                                                                    getOptions={getProductList}
                                                                                    primaryKey="sku"
                                                                                    labelKey="product_name"
                                                                                    onInputChange={(e) => setSearchSKU(e && e.target && e.target.value)}
                                                                                    error={
                                                                                        !!(
                                                                                            errors?.order_items?.[idx]?.name
                                                                                            && touched?.order_items?.[idx]?.name
                                                                                        )
                                                                                    }
                                                                                    helperText={
                                                                                        (errors?.order_items?.[idx]?.name
                                                                                            && touched?.order_items?.[idx]?.name)
                                                                                        || ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </td>

                                                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                                                            {typeof item?.base_price === 'string'
                                                                                ? item?.base_price
                                                                                : formatPriceNumber(item?.base_price)}
                                                                        </td>
                                                                        <td className={classes.td} style={{ textAlign: 'center' }}>
                                                                            {!item.is_can_delete && item?.qty}
                                                                            {item.is_can_delete && (
                                                                                <Field
                                                                                    className={classes.fieldQty}
                                                                                    name={`order_items.${idx}.qty`}
                                                                                    type="number"
                                                                                />
                                                                            )}
                                                                        </td>
                                                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                                                            {item?.discount_amount}
                                                                        </td>
                                                                        <td className={classes.td}>{item?.loc_code || '-'}</td>
                                                                        <td className={classes.td}>{item?.pickup_name || '-'}</td>
                                                                        {(aclCheckData && aclCheckData.isAccessAllowed) === true && (
                                                                            <td className={classes.td}>
                                                                                {!item?.is_can_delete && (item?.replacement_for || '-')}
                                                                                {item?.is_can_delete && (
                                                                                    <Autocomplete
                                                                                        name={`order_items.${idx}.sku`}
                                                                                        className={`${classes.autocomplete}`}
                                                                                        value={values.order_items[idx].replacement_for}
                                                                                        onChange={(e) => {
                                                                                            setFieldValue(
                                                                                                `order_items.${idx}.item_id_replacement`,
                                                                                                e?.id,
                                                                                            );
                                                                                            setFieldValue(`order_items.${idx}.replacement_for`, e);
                                                                                        }}
                                                                                        options={replacementOptions}
                                                                                        primaryKey="id"
                                                                                        labelKey="sku"
                                                                                        error={
                                                                                            !!(
                                                                                                errors?.order_items?.[idx]?.replacement_for
                                                                                                && touched?.order_items?.[idx]?.replacement_for
                                                                                            )
                                                                                        }
                                                                                        helperText={
                                                                                            (errors?.order_items?.[idx]?.replacement_for
                                                                                                && touched?.order_items?.[idx]?.replacement_for)
                                                                                            || ''
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </td>
                                                                        )}
                                                                        {item?.is_can_delete ? (
                                                                            <td
                                                                                className="link-button"
                                                                                style={{ cursor: 'pointer' }}
                                                                                onClick={() => remove(idx)}
                                                                            >
                                                                                delete
                                                                            </td>
                                                                        ) : (
                                                                            '-'
                                                                        )}
                                                                    </tr>
                                                                ))}
                                                                <div>
                                                                    <Button
                                                                        className={classes.btnSecondary}
                                                                        onClick={() => push({ is_can_delete: true })}
                                                                    >
                                                                        Add Product
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </FieldArray>
                                                    <div>
                                                        <Button className={classes.btn} onClick={() => handleSubmitEdit(values)}>
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </Formik>
                                    )}

                                    {!isModeEdit
                                        && orderQueue.orderItem.map((e, idx) => (
                                            <tr key={idx}>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                    {e.sku}
                                                </td>
                                                <td className={classes.td}>{e.name}</td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>
                                                    {formatPriceNumber(e.base_price)}
                                                </td>
                                                <td className={classes.td} style={{ textAlign: 'center' }}>
                                                    {e?.qty}
                                                </td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>
                                                    {e.discount_amount}
                                                </td>
                                                <td className={classes.td}>{e.loc_code || '-'}</td>
                                                <td className={classes.td}>{e.pickup_name || '-'}</td>
                                                {(aclCheckData && aclCheckData.isAccessAllowed) === true && (
                                                    <td className={classes.td}>{e.replacement_for || '-'}</td>
                                                )}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
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
