/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/shipment/pages/edit/components/style';
import { formatPriceNumber } from '@helper_currency';
import TextField from '@common_textfield';
import { getIconByStatus } from '@modules/shipment/helpers';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Autocomplete from '@common_autocomplete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListSubheader from '@material-ui/core/ListSubheader';

const shipmentEditContent = (props) => {
    const {
        shipmentDetail,
        formikNotes,
        formikConfirm,
        formikCantFullfill,
        formikRellocation,
        dataCompany,
        getShipmentAvailableLocation,
        dataLocation,
        loadingLocation,
        companyId,
        setCompanyId,
        handleCheckAvailabilty,
        showModal,
        setShowModal,
        dataLocationSku,
        loadingLocationSku,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const companyOptions = dataCompany?.getShipmentAvailableCompany.slice().map((item) => ({
        name: item.label,
        id: item.value,
    })) || [];

    const locOptions = dataLocation?.getShipmentAvailableLocation.slice().map((item) => ({
        name: item.label,
        id: item.value,
    })) || [];

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/sales/shipment')} variant="contained" style={{ marginRight: 10 }}>
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
            <h2 className={classes.titleTop}>{`Detail Shipment #${shipmentDetail.shipmentId}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img src={getIconByStatus(shipmentDetail.statusValue, shipmentDetail.statusLabel)} alt="" className="iconHeader" />
                            {shipmentDetail.statusLabel}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Number</h5>
                        <span className="spanHeader">{shipmentDetail.channelOrderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Date</h5>
                        <span className="spanHeader">{shipmentDetail.orderDate}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Location</h5>
                        <span className="spanHeader">{shipmentDetail.location}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Shipping Method</h5>
                        <span className="spanHeader">{shipmentDetail.shippingLabel}</span>
                    </div>
                </div>
                {shipmentDetail.statusValue === 'process_for_shipping' && !shipmentDetail.allocation && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={formikConfirm.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                                style={{ marginRight: 10 }}
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
                            >
                                <CloseIcon style={{ marginRight: 10 }} />
                                Cannot Fullfill
                            </Button>
                        </div>
                    </div>
                )}

                {shipmentDetail.statusValue === 'process_for_shipping' && shipmentDetail.allocation === 'cannot_fulfill' && (
                    <div className={classes.content}>
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h3 className={classes.th}>Company</h3>
                            <Autocomplete
                                name="company"
                                style={{ width: 300, marginRight: 10 }}
                                value={companyOptions.find((e) => e.id === companyId)}
                                onChange={async (newValue) => {
                                    setCompanyId(newValue && newValue.id);
                                    if (newValue && newValue.id) {
                                        await getShipmentAvailableLocation();
                                    }
                                }}
                                options={companyOptions}
                            />

                            <h3 className={classes.th}>Location</h3>
                            <Autocomplete
                                name="loc_code"
                                style={{ width: 300, marginRight: 10 }}
                                value={locOptions.find((e) => e.id === formikRellocation.values.loc_code)}
                                onChange={(newValue) => {
                                    formikRellocation.setFieldValue('loc_code', newValue && newValue.id);
                                }}
                                options={locOptions}
                                getOptions={getShipmentAvailableLocation}
                                loading={loadingLocation}
                                disabled={!companyId}
                            />
                            <Button
                                className={clsx(classes.btn, 'noMargin')}
                                type="submit"
                                onClick={formikRellocation.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                                disabled={!formikRellocation.values.loc_code}
                            >
                                Submit
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
                                {`${shipmentDetail.billing.firstname} ${shipmentDetail.billing.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {shipmentDetail.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {shipmentDetail.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{shipmentDetail.billing.street}</span>
                            <span className={classes.orderLabel}>{shipmentDetail.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${shipmentDetail.billing.region}, 
                                ${shipmentDetail.billing.postcode}, ${shipmentDetail.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            {shipmentDetail.isPickup ? (
                                <>
                                    <h5 className={classes.titleSmall}>Pickup Info</h5>
                                    <span className={classes.orderLabel}>{shipmentDetail.pickup.name || '-'}</span>
                                    <span className={classes.orderLabel}>{shipmentDetail.pickup.email || '-'}</span>
                                    <span className={classes.orderLabel}>{shipmentDetail.pickup.phone || '-'}</span>
                                </>
                            ) : (
                                <>
                                    <h5 className={classes.titleSmall}>Shipping Address</h5>
                                    <span className={classes.orderLabel}>{shipmentDetail.shipping.street}</span>
                                    <span className={classes.orderLabel}>{shipmentDetail.shipping.city}</span>
                                    <span className={classes.orderLabel}>
                                        {`${shipmentDetail.shipping.region},
                                ${shipmentDetail.shipping.postcode}, ${shipmentDetail.shipping.country_name}`}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Items Ordered</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            SKU Product
                                        </th>
                                        <th className={classes.th}>Name</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            Unit Price
                                        </th>
                                        <th className={classes.th} style={{ textAlign: 'center' }}>
                                            QTY
                                        </th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            Subtotal
                                        </th>
                                        {shipmentDetail.statusValue === 'process_for_shipping' && shipmentDetail.allocation === 'cannot_fulfill' && (
                                            <th className={classes.th}>Action</th>
                                        )}
                                    </tr>
                                    {shipmentDetail.orderItem.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                {e.sku}
                                            </td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>
                                                {formatPriceNumber(e.base_price)}
                                            </td>
                                            <td className={classes.td} style={{ textAlign: 'center' }}>
                                                {e.qty_shipped}
                                            </td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>
                                                {formatPriceNumber(e.row_total)}
                                            </td>
                                            {shipmentDetail.statusValue === 'process_for_shipping' && shipmentDetail.allocation === 'cannot_fulfill' && (
                                                <td
                                                    className={clsx(classes.td, companyId && 'check')}
                                                    onClick={() => (companyId ? handleCheckAvailabilty(e.sku) : null)}
                                                >
                                                    Check Availability
                                                </td>
                                            )}
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
                                <th className={classes.th} style={{ paddingLeft: 0 }}>
                                    Date
                                </th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Notes</th>
                            </tr>
                            {shipmentDetail.statusHistory?.length ? (
                                shipmentDetail.statusHistory.map((e) => {
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
                            ) : (
                                <tr>
                                    <td className={classes.td} style={{ paddingLeft: 0 }}>
                                        -
                                    </td>
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
                        <Button className={classes.btn} type="submit" onClick={formikNotes.handleSubmit} variant="contained">
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>

            <Modal
                className={classes.modal}
                open={showModal}
                onClose={() => setShowModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModal}>
                    <div className={classes.paper}>
                        <ListSubheader className={classes.subHead}>
                            <h5 className={classes.modalTitle}>Available Location</h5>
                        </ListSubheader>

                        {loadingLocationSku ? (
                            <CircularProgress className={classes.progress} size={60} />
                        ) : (
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    padding: 0,
                                }}
                            >
                                {dataLocationSku?.getShipmentAvailableLocation.map((item) => (
                                    <ListItem key={item.value} disablePadding>
                                        <ListItemText id={item.value} primary={item.label} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default shipmentEditContent;
