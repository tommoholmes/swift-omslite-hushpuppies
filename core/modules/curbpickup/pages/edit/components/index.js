/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/curbpickup/pages/edit/components/style';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const CurbPickupEditContent = (props) => {
    const {
        curbPickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikComplete,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/curbpickup')}
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
                Shipment #
                {curbPickup.shipmentNumber}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, 'jarak')}>
                        Order Number :
                        {curbPickup.orderNumber}
                    </h5>
                    <h5 className={classes.title}>
                        {curbPickup.status}
                    </h5>
                    <div className={classes.progressBar}>
                        <div className="step line">
                            <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'process_for_shipping') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />}
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'process_for_shipping') || (curbPickup.statusValue === 'ready_for_pack') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />}
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'customer_waiting') || (curbPickup.statusValue === 'customer_picked_up') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerwaiting.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerwaiting_gray.svg" />}
                        </div>
                        <div className="step">
                            {!(curbPickup.statusValue === 'customer_picked_up') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />}
                        </div>
                    </div>
                    <hr />
                    <div className={classes.printProgress}>
                        {(curbPickup.statusValue === 'process_for_shipping') && (
                            <>
                                Order for curbside pickup at
                                {' '}
                                {curbPickup.location}
                                <div className={classes.formFieldButton}>
                                    {!(curbPickup.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                Confirm
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikCantFullfill.handleSubmit}
                                                variant="contained"
                                                buttonType="outlined-rounded"
                                                style={{ marginLeft: 10 }}
                                            >
                                                <CloseIcon style={{ marginRight: 10 }} />
                                                Cannot Fullfill
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pick/${curbPickup.id}`)}
                                                variant="contained"
                                            >
                                                Print Pick List
                                            </Button>
                                            <br />
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                Mark Pick Complete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'ready_for_pack') && (
                            <>
                                the packing order is ready to be processed
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pack/${curbPickup.id}`)}
                                        variant="contained"
                                    >
                                        Print Pack List
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
                        {(curbPickup.statusValue === 'ready_for_pickup') && (
                            <>
                                Customer is filling out form
                                <br />
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikComplete.handleSubmit}
                                        variant="contained"
                                    >
                                        Customer Picked Up
                                    </Button>
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'customer_waiting') && (
                            <>
                                Customer has been waiting since
                                {' '}
                                {curbPickup.pickup.created_at}
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikComplete.handleSubmit}
                                        variant="contained"
                                    >
                                        Customer Picked Up
                                    </Button>
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'customer_picked_up') && (
                            <>
                                Customer picked up on
                                <br />
                                {(curbPickup.track) ? (
                                    <>
                                        {curbPickup.track[0].created_at}
                                    </>
                                ) : <></>}
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div>
                        <h5 className={classes.titleSmall}>Pickup Info</h5>
                        {(curbPickup.pickup) ? (
                            <>
                                <span className={classes.orderLabel}>
                                    {curbPickup.pickup.name || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    Pickup :
                                    {' '}
                                    {curbPickup.locName || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    Pickup Details :
                                    {' '}
                                    {curbPickup.pickup.loc_details || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    Vehicle Plate Number :
                                    {' '}
                                    {curbPickup.pickup.vehicle_number || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    Vehicle Description :
                                    {' '}
                                    {curbPickup.pickup.vehicle_desc || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    Notes :
                                    {' '}
                                    {curbPickup.pickup.notes || '-'}
                                </span>
                            </>
                        ) : <span className={classes.orderLabel}>-</span>}
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Customer Info</h5>
                        <span className={classes.orderLabel}>
                            <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                            {curbPickup.firstname}
                        </span>
                        <span className={classes.orderLabel}>
                            <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                            {curbPickup.shippingPhone}
                        </span>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Billing Address</h5>
                        <span className={classes.orderLabel}>
                            {curbPickup.firstname}
                            {' '}
                            {curbPickup.lastname}
                        </span>
                        <span className={classes.orderLabel}>{curbPickup.street}</span>
                        <span className={classes.orderLabel}>
                            {curbPickup.city}
                            ,
                            {' '}
                            {curbPickup.region}
                            ,
                            {' '}
                            {curbPickup.postcode}
                            {' '}
                            {curbPickup.countryId}
                        </span>
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
                                    {curbPickup.order.map((e) => (
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
                        <span className={classes.orderLabel} style={{ fontWeight: '700' }}>
                            Total :
                            {curbPickup.total}
                        </span>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default CurbPickupEditContent;
