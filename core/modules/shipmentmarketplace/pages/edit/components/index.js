/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import FormDialog from '@common_formdialog';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/shipmentmarketplace/pages/edit/components/style';
import { formatPriceNumber } from '@helper_currency';

const ShipmentMarketplaceEditContent = (props) => {
    const {
        shipmentMarketplace,
        formikConfirm,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikShipped,
        formikDelivered,
        formikNotes,
        dataConfig,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getShipmentCancelReason, getShipmentCancelReasonRes] = gqlService.getShipmentCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();
    const iconFilter = (channel_code) => {
        if (channel_code) {
            const codeExploded = channel_code.split('_');
            const code = codeExploded[1];
            if (code.toLowerCase().includes('swi')) {
                return '/assets/img/print_icon/swi.png';
            }
            if (code.toLowerCase().includes('bklp')) {
                return '/assets/img/print_icon/bklp.png';
            }
            if (code.toLowerCase().includes('blib')) {
                return '/assets/img/print_icon/blib.png';
            }
            if (code.toLowerCase().includes('jdid')) {
                return '/assets/img/print_icon/jdid.png';
            }
            if (code.toLowerCase().includes('lzda')) {
                return '/assets/img/print_icon/lzda.png';
            }
            if (code.toLowerCase().includes('shpe')) {
                return '/assets/img/print_icon/shpe.png';
            }
            if (code.toLowerCase().includes('srcl')) {
                return '/assets/img/print_icon/srcl.png';
            }
            if (code.toLowerCase().includes('tkpd')) {
                return '/assets/img/print_icon/tkpd.png';
            }
            if (code.toLowerCase().includes('zlra')) {
                return '/assets/img/print_icon/zlra.png';
            }
            return `/assets/img/print_icon/${code}.png`;
        }
        return null;
    };

    const step = () => {
        switch (shipmentMarketplace.statusValue) {
        case 'process_for_shipping':
        case 'pick_in_progress':
            return 1;
        case 'ready_for_pack':
        case 'pick_uncomplete':
            return 2;
        case 'ready_for_ship':
            return 3;
        case 'order_shipped':
            return 4;
        case 'order_delivered':
            return 5;
        default:
            return 0;
        }
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/shipmentmarketplace')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {`Marketplace #${shipmentMarketplace.shipmentNumber}`}
            </h2>
            <div style={{ position: 'relative' }}>
                <img
                    className={classes.headerImg}
                    alt=""
                    src={iconFilter(shipmentMarketplace.channelCode)}
                    onError={(event) => event.target.style.display = 'none'}
                />
            </div>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.channelId}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {`${shipmentMarketplace.channelName} Order Number`}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Date
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipped From
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.location}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipping Method
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.method}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    {shipmentMarketplace.statusValue === 'canceled' ? (
                        <div className={classes.progressBarFail}>
                            <div className="step">
                                <img className="imgIcon" alt="" src="/assets/img/order_status/cannotfulfill.svg" />
                                <div className={classes.statusLabelActive}>
                                    Canceled
                                </div>
                            </div>
                        </div>
                    )

                        : (
                            <div className={classes.progressBarContainer}>
                                <div className={classes.progressBar}>
                                    <div className="step line">
                                        <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                                        <div className={classes.statusLabelActive}>
                                            {step() >= 1 && shipmentMarketplace.allocation === 'confirmed'
                                                ? shipmentMarketplace.statusValue === 'pick_in_progress'
                                                    ? 'Pick In Progress'
                                                    : 'Confirmed' : 'Process for Shipping'}
                                        </div>
                                    </div>
                                    <div className="step line">
                                        {step() >= 2 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    {shipmentMarketplace.statusValue === 'pick_uncomplete'
                                                        ? 'Pick Incomplete' : 'Ready for Pack'}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    {shipmentMarketplace.statusValue === 'pick_uncomplete'
                                                        ? 'Pick Uncomplete' : 'Ready for Pack'}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step line">
                                        {step() >= 3 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    Ready to Ship
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    Ready to Ship
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step line">
                                        {step() >= 4 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    Order Shipped
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {' '}
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    Order Shipped
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step">
                                        {step() >= 5 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    Order Delivered
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    Order Delivered
                                                </div>

                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    <hr />
                    <div className={classes.printProgress}>
                        {(shipmentMarketplace.statusValue === 'canceled') && (
                            <>
                                <span className={classes.orderLabel} style={{ marginTop: 10 }}>
                                    Order Canceled
                                </span>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'process_for_shipping'
                            && !shipmentMarketplace.allocation) && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
                                    <>
                                        <Button
                                            className={classes.btn}
                                            type="submit"
                                            onClick={formikConfirm.handleSubmit}
                                            variant="contained"
                                            style={{ marginRight: 10 }}
                                        >
                                            Confirm Order
                                        </Button>
                                        <FormDialog
                                            labelButton="Canceled"
                                            titleDialog="Cancel Reason"
                                            message={(
                                                <>
                                                    <span className={clsx(classes.spanLabel, classes.labelRequired)}>Cancel Reason</span>
                                                    <Autocomplete
                                                        className={clsx(classes.autocompleteRoot, 'popup')}
                                                        mode="lazy"
                                                        value={formikCanceled.values.reason}
                                                        onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                        loading={getShipmentCancelReasonRes.loading}
                                                        options={
                                                            getShipmentCancelReasonRes
                                                                && getShipmentCancelReasonRes.data
                                                                && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                        }
                                                        getOptions={getShipmentCancelReason}
                                                        error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                        helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                        primaryKey="value"
                                                        labelKey="label"
                                                    />
                                                    <div className={classes.formFieldButton}>
                                                        <Button
                                                            className={classes.btn}
                                                            onClick={formikCanceled.handleSubmit}
                                                            variant="contained"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </>
                                </div>
                            </>
                        )}

                        {((shipmentMarketplace.statusValue === 'process_for_shipping'
                            || shipmentMarketplace.statusValue === 'pick_in_progress')
                            && shipmentMarketplace.allocation) && (
                            <>
                                {dataConfig
                                    ? (
                                        <>
                                            Print your packlist, Pick your items
                                            <br />
                                            and pack your items
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={clsx(classes.btn, 'print')}
                                                    onClick={() => window.open(`/printoms/pick/${shipmentMarketplace.id}`)}
                                                    variant="contained"
                                                >
                                                    Print Pick List
                                                </Button>

                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikPicked.handleSubmit}
                                                    variant="contained"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    Mark Pick Complete
                                                </Button>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <br />
                                            Order ready to process
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikShipped.handleSubmit}
                                                    variant="contained"
                                                >
                                                    Order Shipped
                                                </Button>
                                            </div>
                                        </>
                                    )}
                            </>
                        )}

                        {(shipmentMarketplace.statusValue === 'ready_for_pack'
                        || shipmentMarketplace.statusValue === 'pick_uncomplete') && (
                            <>
                                {dataConfig
                                    ? (
                                        <>
                                            The packing order is ready to be processed
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={clsx(classes.btn, 'print')}
                                                    onClick={() => window.open(`/printoms/pack/${shipmentMarketplace.id}`)}
                                                    variant="contained"
                                                >
                                                    Print Pack List
                                                </Button>

                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikPacked.handleSubmit}
                                                    variant="contained"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    Mark Pack Complete
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <br />
                                            Order ready to process
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikShipped.handleSubmit}
                                                    variant="contained"
                                                >
                                                    Order Shipped
                                                </Button>
                                            </div>
                                        </>
                                    )}

                            </>
                        )}

                        {(shipmentMarketplace.statusValue === 'ready_for_ship'
                            || (shipmentMarketplace.statusValue === 'order_shipped' && !shipmentMarketplace.awb))
                            && (
                                <>
                                    <div>
                                        <span className={classes.spanText}>Enter shipping and tracking information</span>
                                        <TextField
                                            className={classes.fieldRoot}
                                            label="AWB Number"
                                            variant="outlined"
                                            name="awb"
                                            value={formikShipped.values.awb}
                                            onChange={formikShipped.handleChange}
                                            error={!!(formikShipped.touched.awb && formikShipped.errors.awb)}
                                            helperText={(formikShipped.touched.awb && formikShipped.errors.awb) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                        {shipmentMarketplace.allocation === 'confirmed'
                                            && (
                                                (dataConfig && (shipmentMarketplace.statusValue === 'ready_for_ship'
                                                    || shipmentMarketplace.statusValue === 'shipment_booked'))
                                                || (!dataConfig && (shipmentMarketplace.statusValue !== 'order_delivered'
                                                    || shipmentMarketplace.statusValue !== 'closed'
                                                    || shipmentMarketplace.statusValue !== 'canceled'))
                                            )
                                            ? (
                                                <div className={classes.formFieldButton2}>
                                                    <Button
                                                        className={classes.btn}
                                                        onClick={formikShipped.handleSubmit}
                                                        variant="contained"
                                                    >
                                                        Order Shipped
                                                    </Button>
                                                </div>
                                            )
                                            : null}
                                    </div>
                                </>
                            )}
                        {(shipmentMarketplace.statusValue === 'order_shipped' && (shipmentMarketplace.awb)) && (
                            <>
                                {(shipmentMarketplace.awb) ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`AWB Number : ${shipmentMarketplace.awb.title} ${shipmentMarketplace.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        AWB Number : -
                                    </span>
                                )}
                                <div className={classes.formFieldButton2}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikDelivered.handleSubmit}
                                        variant="contained"
                                    >
                                        Mark as Delivered
                                    </Button>
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'order_delivered') && (
                            <>
                                {(shipmentMarketplace.awb) ? (
                                    <span className={classes.orderLabel}>
                                        {`AWB Number : ${shipmentMarketplace.awb.title} ${shipmentMarketplace.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel}>
                                        AWB Number : -
                                    </span>
                                )}
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`Delivered on : ${shipmentMarketplace.updated} `}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${shipmentMarketplace.firstname} ${shipmentMarketplace.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {shipmentMarketplace.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {shipmentMarketplace.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{shipmentMarketplace.street}</span>
                            <span className={classes.orderLabel}>{shipmentMarketplace.city}</span>
                            <span className={classes.orderLabel}>
                                {`${shipmentMarketplace.region}, ${shipmentMarketplace.postcode}, ${shipmentMarketplace.countryName}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Address</h5>
                            <span className={classes.orderLabel}>{shipmentMarketplace.shippingAddress.street}</span>
                            <span className={classes.orderLabel}>{shipmentMarketplace.shippingAddress.city}</span>
                            <span className={classes.orderLabel}>
                                {`${shipmentMarketplace.shippingAddress.region}, ${shipmentMarketplace.shippingAddress.postcode}, ${shipmentMarketplace.shippingAddress.country_name}`}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Items Ordered</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>SKU Product</th>
                                        <th className={classes.th}>Name</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>Unit Price</th>
                                        <th className={classes.th} style={{ textAlign: 'center' }}>QTY</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>Subtotal</th>
                                    </tr>
                                    {shipmentMarketplace.order?.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(e.base_price)}</td>
                                            <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty_shipped}</td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(e.row_total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Status History</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>Date</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Notes</th>
                            </tr>
                            {shipmentMarketplace.history && shipmentMarketplace.history.length ? shipmentMarketplace.history.map((e) => {
                                const date = new Date(e.created_at);
                                return (
                                    <tr>
                                        <td className={classes.td} style={{ paddingLeft: 0 }}>
                                            {date.toLocaleString('en-US', {
                                                day: 'numeric',
                                                year: 'numeric',
                                                month: 'short',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                            })}
                                        </td>
                                        <td className={clsx(classes.td, 'status')}>{e.status.split('_').join(' ')}</td>
                                        <td className={classes.td}>{e.comment}</td>
                                    </tr>
                                );
                            })
                                : (
                                    <tr>
                                        <td className={classes.td} style={{ paddingLeft: 0 }}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Notes for this Shipment</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="notes"
                        value={formikNotes.values.notes}
                        onChange={formikNotes.handleChange}
                        error={!!(formikNotes.touched.notes && formikNotes.errors.notes)}
                        helperText={(formikNotes.touched.notes && formikNotes.errors.notes) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formikNotes.handleSubmit}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ShipmentMarketplaceEditContent;
