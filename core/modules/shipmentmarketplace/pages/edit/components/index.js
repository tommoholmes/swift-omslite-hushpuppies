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
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getShipmentCancelReason, getShipmentCancelReasonRes] = gqlService.getShipmentCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();

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
                <img className={classes.headerImg} alt="" src={`/assets/img/print_icon/${shipmentMarketplace.channelName}.png`} />
            </div>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {`${shipmentMarketplace.channelName} Order Number`}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Order Date
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
                            Source AWB
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.awbSource}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>
                        {shipmentMarketplace.statusLabel}
                    </h5>
                    <div className={classes.progressBar}>
                        <div className="step line">
                            <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                        </div>
                        <div className="step line">
                            {(shipmentMarketplace.statusValue === 'process_for_shipping') || (shipmentMarketplace.statusValue === 'closed') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />}
                        </div>
                        <div className="step line">
                            {(shipmentMarketplace.statusValue === 'process_for_shipping') || (shipmentMarketplace.statusValue === 'ready_for_pack') || (shipmentMarketplace.statusValue === 'closed') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />}
                        </div>
                        <div className="step line">
                            {(shipmentMarketplace.statusValue === 'order_shipped') || (shipmentMarketplace.statusValue === 'order_delivered') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />}
                        </div>
                        <div className="step">
                            {!(shipmentMarketplace.statusValue === 'order_delivered') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />}
                        </div>
                    </div>
                    <hr />
                    <div className={classes.printProgress}>
                        {(shipmentMarketplace.statusValue === 'process_for_shipping') && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/address/${shipmentMarketplace.id}`)}
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Address
                                    </Button>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/invoice/${shipmentMarketplace.id}`)}
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Invoice
                                    </Button>
                                    {!(shipmentMarketplace.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                            >
                                                Confirm Order
                                            </Button>
                                        </>
                                    ) : (
                                        <>
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
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10 }}
                                            >
                                                Mark Pick Complete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'ready_for_pack') && (
                            <>
                                the packing order is ready to be processed
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/address/${shipmentMarketplace.id}`)}
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Address
                                    </Button>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/invoice/${shipmentMarketplace.id}`)}
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Invoice
                                    </Button>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikPacked.handleSubmit}
                                        variant="contained"
                                    >
                                        Mark Pack Complete
                                    </Button>
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'ready_for_ship') && (
                            <>
                                <div>
                                    <span className={classes.spanText}>Or enter shipping and tracking information</span>
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
                                    <div className={classes.formFieldButton2}>
                                        <Button
                                            className={classes.btn}
                                            onClick={formikShipped.handleSubmit}
                                            variant="contained"
                                        >
                                            Shipped
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'order_shipped') && (
                            <>
                                {(shipmentMarketplace.awb) ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`AWB Number : ${shipmentMarketplace.awb.title} ${shipmentMarketplace.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        AWB Number : -
                                    </span>
                                ) }
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
                                {`${shipmentMarketplace.region}, ${shipmentMarketplace.postcode}, ${shipmentMarketplace.countryId}`}
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
                                        <th className={classes.th}>Unit Price</th>
                                        <th className={classes.th}>QTY</th>
                                        <th className={classes.th}>Subtotal</th>
                                    </tr>
                                    {shipmentMarketplace.order.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td}>{e.price}</td>
                                            <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty}</td>
                                            <td className={classes.td}>{e.row_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Shipping and Tracking Information</h5>
                        <span className={classes.orderLabel}>
                            <strong>{`Shipping Method : ${shipmentMarketplace.method}`}</strong>
                        </span>
                        {(shipmentMarketplace.awb)
                            && (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className={classes.table}>
                                        <tbody>
                                            <tr className={classes.tr}>
                                                <th className={classes.th} style={{ paddingLeft: 0 }}>Date</th>
                                                <th className={classes.th}>Courier</th>
                                                <th className={classes.th}>Name</th>
                                                <th className={classes.th}>AWB Number</th>
                                            </tr>
                                            <tr>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>{shipmentMarketplace.awb.created_at}</td>
                                                <td className={classes.td}>{shipmentMarketplace.method}</td>
                                                <td className={classes.td}>{shipmentMarketplace.awb.title}</td>
                                                <td className={classes.td}>{shipmentMarketplace.awb.track_number}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
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
                            {shipmentMarketplace.history.map((e) => (
                                <tr>
                                    <td className={classes.td} style={{ paddingLeft: 0 }}>{e.created_at}</td>
                                    <td className={classes.td}>{e.status}</td>
                                    <td className={classes.td}>{e.comment}</td>
                                </tr>
                            ))}
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
