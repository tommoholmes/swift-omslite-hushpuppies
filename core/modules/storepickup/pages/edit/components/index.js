/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/storepickup/pages/edit/components/style';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const StorePickupEditContent = (props) => {
    const {
        storePickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikPickedUp,
        formikNotes,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/storepickup')}
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
                {`Store Pickup # ${storePickup.shipmentNumber}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{storePickup.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Order Date
                        </h5>
                        <span className="spanHeader">{storePickup.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipped From
                        </h5>
                        <span className="spanHeader">{storePickup.location || 'kosong'}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    {storePickup.allocation === 'cannot_fulfill' ? (
                        <div className={classes.progressBarFail}>
                            <div className="step line">
                                <img className="imgIcon" alt="" src="/assets/img/order_status/cannotfulfill.svg" />
                                <div className={classes.statusLabelActive}>
                                    Cannot Fulfill
                                </div>
                            </div>
                        </div>
                    )
                        : (
                            <div className={classes.progressBar}>
                                <div className="step line">
                                    <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                                    <div className={classes.statusLabelActive}>
                                        Process for Pack
                                    </div>
                                </div>
                                <div className="step line">
                                    {(storePickup.statusValue === 'process_for_shipping') ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                                            <div className={classes.statusLabelInactive}>
                                                Ready for Pack
                                            </div>
                                        </>
                                    )
                                        : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    Ready for Pack
                                                </div>
                                            </>
                                        )}
                                </div>
                                <div className="step line">
                                    {(storePickup.statusValue === 'process_for_shipping') || (storePickup.statusValue === 'ready_for_pack') ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                                            <div className={classes.statusLabelInactive}>
                                                Ready for Pick
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />
                                            <div className={classes.statusLabelActive}>
                                                Ready for Pick
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="step">
                                    {!(storePickup.statusValue === 'customer_picked_up') ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                                            <div className={classes.statusLabelInactive}>
                                                Customer
                                                <br />
                                                Picked Up
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />
                                            <div className={classes.statusLabelActive}>
                                                Customer
                                                <br />
                                                Picked Up
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    <hr />
                    <div className={classes.printProgress}>

                        {(storePickup.statusValue === 'process_for_shipping')
                            && (storePickup.allocation !== 'cannot_fulfill') && (
                            <>
                                <div className={classes.progressTitle}>
                                    Order for store pickup at
                                    {' '}
                                    {storePickup.location}
                                </div>
                                <div className={classes.formFieldButton}>

                                    <br />
                                    {!(storePickup.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                                buttonType="primary-rounded"
                                                style={{ marginRight: 10 }}
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                Confirm Order
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikCantFullfill.handleSubmit}
                                                variant="contained"
                                                buttonType="outlined-rounded"
                                            >
                                                <CloseIcon style={{ marginRight: 10 }} />
                                                Cannot Fullfill
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className={clsx(classes.btn)}
                                                onClick={() => window.open(`/printoms/pick/${storePickup.id}`)}
                                                variant="contained"
                                                buttonType="outlined-rounded"
                                                style={{ marginRight: 10 }}
                                            >
                                                Print Pick List
                                            </Button>
                                            <Button
                                                className={clsx(classes.btn)}
                                                onClick={() => window.open(`/printoms/pack/${storePickup.id}`)}
                                                variant="contained"
                                                style={{ marginRight: 10 }}
                                                buttonType="outlined-rounded"
                                            >
                                                Print Shipping Label
                                            </Button>
                                            <Button
                                                className={classes.btn}
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
                        {(storePickup.statusValue === 'process_for_shipping')
                            && (storePickup.allocation === 'cannot_fulfill') && (
                            <>
                                <div className={classes.progressTitle}>
                                    Order for store pickup at
                                    {' '}
                                    {storePickup.location}
                                </div>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => router.push('/shipment/storepickup')}
                                        variant="contained"
                                    >
                                        Reallocating Order
                                    </Button>
                                </div>
                            </>
                        )}
                        {(storePickup.statusValue === 'ready_for_pack') && (
                            <>
                                <div className={classes.progressTitle}>
                                    Order for store pickup at
                                    {' '}
                                    {storePickup.location}
                                </div>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => window.open(`/printoms/pick/${storePickup.id}`)}
                                        buttonType="outlined-rounded"
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Pick List
                                    </Button>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => window.open(`/printoms/pack/${storePickup.id}`)}
                                        variant="contained"
                                        buttonType="outlined-rounded"
                                        style={{ marginRight: 10 }}
                                    >
                                        Print Shipping Label
                                    </Button>
                                    <br />
                                    <Button
                                        className={classes.btn}
                                        onClick={formikPacked.handleSubmit}
                                        variant="contained"
                                    >
                                        <CheckIcon style={{ marginRight: 10 }} />
                                        Mark Pack Complete
                                    </Button>
                                </div>
                            </>
                        )}
                        {(storePickup.statusValue === 'ready_for_pickup') && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'marginTop')}
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={formikPickedUp.values.name}
                                        onChange={formikPickedUp.handleChange}
                                        error={!!(formikPickedUp.touched.name && formikPickedUp.errors.name)}
                                        helperText={(formikPickedUp.touched.name && formikPickedUp.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        style={{ marginRight: 10 }}
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'marginTop')}
                                        label="ID/Reference"
                                        variant="outlined"
                                        name="reference"
                                        value={formikPickedUp.values.reference}
                                        onChange={formikPickedUp.handleChange}
                                        error={!!(formikPickedUp.touched.reference && formikPickedUp.errors.reference)}
                                        helperText={(formikPickedUp.touched.reference && formikPickedUp.errors.reference) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        style={{ marginRight: 10 }}
                                    />
                                    <Button
                                        className={classes.btn}
                                        onClick={formikPickedUp.handleSubmit}
                                        variant="contained"
                                        style={{ maxHeight: 45 }}
                                    >
                                        Pick Up Complete
                                    </Button>
                                </div>
                            </>
                        )}

                        {(storePickup.statusValue === 'customer_picked_up') && (
                            <div className={classes.progressTitle} style={{ margin: '20px 0' }}>
                                Picked up on
                                {' '}
                                {new Date(storePickup.awb.created_at).toLocaleString('en-US', {
                                    day: 'numeric',
                                    year: 'numeric',
                                    month: 'short',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                })}
                                <br />
                                {`${storePickup.awb.title}, ID/Reference: ${storePickup.awb.track_number}`}
                            </div>
                        )}
                    </div>

                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${storePickup.firstname} ${storePickup.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {storePickup.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {storePickup.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{storePickup.street}</span>
                            <span className={classes.orderLabel}>{storePickup.city}</span>
                            <span className={classes.orderLabel}>
                                {`${storePickup.region}, ${storePickup.postcode}, ${storePickup.countryId}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Pickup Info</h5>
                            {(storePickup.pickup) ? (
                                <>
                                    <span className={classes.orderLabel}>{storePickup.pickup.name || '-'}</span>
                                    <span className={classes.orderLabel}>{storePickup.pickup.loc_details || '-'}</span>
                                    <span className={classes.orderLabel}>{storePickup.pickup.vehice_number || '-'}</span>
                                    <span className={classes.orderLabel}>{storePickup.pickup.vehicle_desc || '-'}</span>
                                    <span className={classes.orderLabel}>{storePickup.pickup.notes || '-'}</span>
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
                                    {storePickup.order.map((e) => (
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
                            {storePickup.history.map((e) => {
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
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Notes for this order</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'full')}
                        variant="outlined"
                        name="notes"
                        value={formikNotes.values.notes}
                        onChange={formikNotes.handleChange}
                        error={!!(formikNotes.touched.notes && formikNotes.errors.notes)}
                        helperText={(formikNotes.touched.notes && formikNotes.errors.notes) || ''}
                        fullWidth
                        multiline
                        rows={5}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formikNotes.handleSubmit}
                            variant="contained"
                            disabled={!formikNotes.values.notes}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default StorePickupEditContent;
