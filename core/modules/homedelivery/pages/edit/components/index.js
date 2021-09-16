/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/edit/components/style';

const HomeDeliveryEditContent = (props) => {
    const {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/homedelivery')}
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
                {`Shipment # ${homeDelivery.shipmentNumber}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{homeDelivery.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Order Date
                        </h5>
                        <span className="spanHeader">{homeDelivery.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipped From
                        </h5>
                        <span className="spanHeader">{homeDelivery.location || 'kosong'}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>
                        {homeDelivery.statusLabel}
                    </h5>
                    <div className={classes.progressBar}>
                        <div className="step line">
                            <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'process_for_shipping') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />}
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'process_for_shipping') || (homeDelivery.statusValue === 'ready_for_pack') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />}
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'order_shipped') || (homeDelivery.statusValue === 'order_delivered') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />}
                        </div>
                        <div className="step">
                            {!(homeDelivery.statusValue === 'order_delivered') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />}
                        </div>
                    </div>
                    <hr />
                    <div className={classes.printProgress}>
                        {(homeDelivery.statusValue === 'process_for_shipping') && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pick/${homeDelivery.id}`)}
                                        variant="contained"
                                    >
                                        Print Pick List
                                    </Button>
                                    <br />
                                    {!(homeDelivery.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                            >
                                                Confirm Order
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikCantFullfill.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10 }}
                                            >
                                                Cannot Fullfill
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                            >
                                                Mark Pick Complete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {(homeDelivery.statusValue === 'ready_for_pack') && (
                            <>
                                the packing order is ready to be processed
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pack/${homeDelivery.id}`)}
                                        variant="contained"
                                    >
                                        Print Pack List
                                    </Button>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        // onClick={() => window.open(`/shipment/homeDelivery/printpack/${homeDelivery.id}`)}
                                        variant="contained"
                                        style={{ marginLeft: 10 }}
                                    >
                                        Print Shipping Label
                                    </Button>
                                    <br />
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
                        {((homeDelivery.statusValue === 'ready_for_ship') || (homeDelivery.statusValue === 'shipment_booked')) && (
                            <>
                                {!(homeDelivery.statusValue === 'shipment_booked') && (
                                    <div className={classes.formFieldButton}>
                                        <Button
                                            className={classes.btn}
                                            onClick={formikCourier.handleSubmit}
                                            variant="contained"
                                        >
                                            Book Courier
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                    <TextField
                                        className={classes.fieldRoot}
                                        label="JNE Shipping"
                                        variant="outlined"
                                        name="carrier"
                                        value={formikShipped.values.carrier}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'fieldCenter')}
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={formikShipped.values.name}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                        helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fieldRoot}
                                        label="AWB Number"
                                        variant="outlined"
                                        name="reference"
                                        value={formikShipped.values.reference}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                        helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
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
                        {(homeDelivery.statusValue === 'order_shipped') && (
                            <>
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                </span>
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
                        {(homeDelivery.statusValue === 'order_delivered') && (
                            <>
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    <br />
                                    {`Delivered on : ${homeDelivery.updated} `}
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
                                {`${homeDelivery.firstname} ${homeDelivery.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {homeDelivery.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {homeDelivery.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{homeDelivery.street}</span>
                            <span className={classes.orderLabel}>{homeDelivery.city}</span>
                            <span className={classes.orderLabel}>
                                {`${homeDelivery.region}, ${homeDelivery.postcode}, ${homeDelivery.countryId}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Pickup Info</h5>
                            {(homeDelivery.pickup) ? (
                                <>
                                    <span className={classes.orderLabel}>{homeDelivery.pickup.name || '-'}</span>
                                    <span className={classes.orderLabel}>{homeDelivery.pickup.loc_details || '-'}</span>
                                    <span className={classes.orderLabel}>{homeDelivery.pickup.vehice_number || '-'}</span>
                                    <span className={classes.orderLabel}>{homeDelivery.pickup.vehicle_desc || '-'}</span>
                                    <span className={classes.orderLabel}>{homeDelivery.pickup.notes || '-'}</span>
                                </>
                            ) : <span className={classes.orderLabel}>-</span>}
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
                                    {homeDelivery.order.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td}>{e.price}</td>
                                            <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty}</td>
                                            <td className={classes.td}>{e.row_total}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" />
                                        <td className={classes.td} style={{ fontWeight: '700' }}>Total</td>
                                        <td className={classes.td} style={{ fontWeight: '700' }}>{homeDelivery.total || 'kosong'}</td>
                                    </tr>
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
                            {homeDelivery.history.map((e) => (
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
                    <h5 className={classes.titleSmall}>Notes for this order</h5>
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            // onClick={formikConfirm.handleSubmit}
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

export default HomeDeliveryEditContent;
