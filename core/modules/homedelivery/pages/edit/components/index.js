/* eslint-disable no-nested-ternary */
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
import gqlService from '@modules/homedelivery/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/edit/components/style';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { formatPriceNumber } from '@helper_currency';

const HomeDeliveryEditContent = (props) => {
    const {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
        formikNotes,
        pickPackEnable,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getShipmentCancelReason, getShipmentCancelReasonRes] = gqlService.getShipmentCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();

    const step = () => {
        switch (homeDelivery.statusValue) {
        case 'process_for_shipping':
        case 'pick_in_progress':
            return 1;
        case 'ready_for_pack':
        case 'pick_uncomplete':
            return 2;
        case 'ready_for_ship':
        case 'shipment_booked':
        case 'gosend_rejected':
            return 3;
        case 'order_shipped':
        case 'canceled':
        case 'closed':
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
                {`Home Delivery #${homeDelivery.shipmentNumber}`}
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
                            Channel Order Date
                        </h5>
                        <span className="spanHeader">{homeDelivery.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipped From
                        </h5>
                        <span className="spanHeader">{homeDelivery.location}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipping Method
                        </h5>
                        <span className="spanHeader">{homeDelivery.shipping || '-'}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    {/* <h5 className={classes.title}>
                        {homeDelivery.statusLabel}
                    </h5> */}
                    {homeDelivery.allocation === 'cannot_fulfill' || step() === 0 ? (
                        <div className={classes.progressBarFail}>
                            <div className="step">
                                <img className="imgIcon" alt="" src="/assets/img/order_status/cannotfulfill.svg" />
                                <div className={classes.statusLabelActive}>
                                    Cannot Fulfill
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
                                            {step() >= 1 && homeDelivery.allocation === 'confirmed'
                                                ? homeDelivery.statusValue === 'pick_in_progress'
                                                    ? 'Pick In Progress'
                                                    : 'Confirmed' : 'Process for Shipping'}
                                        </div>
                                    </div>
                                    <div className="step line">
                                        {step() >= 2 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    {homeDelivery.statusValue === 'pick_uncomplete'
                                                        ? 'Pick Incomplete' : 'Ready for Pack'}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    {homeDelivery.statusValue === 'pick_uncomplete'
                                                        ? 'Pick Incomplete' : 'Ready for Pack'}
                                                </div>

                                            </>
                                        )}
                                    </div>
                                    <div className="step line">
                                        {step() >= 3 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />
                                                <div className={classes.statusLabelActive}>
                                                    Ready for Ship
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                                                <div className={classes.statusLabelInactive}>
                                                    Ready for Ship
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
                    <br />
                    <div className={classes.printProgress}>

                        {homeDelivery.statusValue === 'process_for_shipping'
                            && !homeDelivery.allocation && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
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
                                </div>
                            </>
                        )}

                        {(homeDelivery.statusValue === 'process_for_shipping')
                            && (homeDelivery.allocation === 'cannot_fulfill') && (
                            <>
                                <div className={classes.progressTitle}>
                                    Order for home delivery from
                                    {' '}
                                    {homeDelivery.location}
                                </div>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => router.push(`/sales/orderreallocation/edit/${homeDelivery.id}`)}
                                        variant="contained"
                                    >
                                        Reallocating Order
                                    </Button>
                                </div>
                            </>
                        )}

                        {step() === 1 && homeDelivery.allocation === 'confirmed' && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
                                    {pickPackEnable ? (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pick/${homeDelivery.id}`)}
                                                variant="contained"
                                            >
                                                Print Pick List
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                Mark Pick Complete
                                            </Button>
                                        </>

                                    ) : (
                                        <div>
                                            <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                            <Autocomplete
                                                className={classes.autocompleteRoot}
                                                mode="lazy"
                                                value={formikShipped.values.carrier}
                                                onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                                loading={getCourierOptionRes.loading}
                                                options={
                                                    getCourierOptionRes
                                                    && getCourierOptionRes.data
                                                    && getCourierOptionRes.data.getCourierOption
                                                }
                                                getOptions={getCourierOption}
                                                error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                                helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                                primaryKey="value"
                                                labelKey="label"
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
                                                    Order Shipped
                                                </Button>
                                            </div>
                                        </div>
                                    )}

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
                                </div>
                            </>
                        )}

                        {step() === 2 && (
                            <>
                                the packing order is ready to be processed
                                <div className={classes.formFieldButton}>
                                    {pickPackEnable ? (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pack/${homeDelivery.id}`)}
                                                variant="contained"
                                            >
                                                Print Pack List
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPacked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                Mark Pack Complete
                                            </Button>
                                        </>
                                    ) : (
                                        <div>
                                            <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                            <Autocomplete
                                                className={classes.autocompleteRoot}
                                                mode="lazy"
                                                value={formikShipped.values.carrier}
                                                onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                                loading={getCourierOptionRes.loading}
                                                options={
                                                    getCourierOptionRes
                                                    && getCourierOptionRes.data
                                                    && getCourierOptionRes.data.getCourierOption
                                                }
                                                getOptions={getCourierOption}
                                                error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                                helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                                primaryKey="value"
                                                labelKey="label"
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
                                                    Order Shipped
                                                </Button>
                                            </div>
                                        </div>
                                    )}
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
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'ready_for_ship' && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikCourier.handleSubmit}
                                        variant="contained"
                                    >
                                        Book Courier
                                    </Button>
                                </div>
                                <div>
                                    <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={
                                            getCourierOptionRes
                                            && getCourierOptionRes.data
                                            && getCourierOptionRes.data.getCourierOption
                                        }
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
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
                                            Order Shipped
                                        </Button>
                                    </div>
                                </div>
                                <div className={classes.formFieldButton}>
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
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'shipment_booked' && (
                            <div>
                                <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                <Autocomplete
                                    className={classes.autocompleteRoot}
                                    mode="lazy"
                                    value={formikShipped.values.carrier}
                                    onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                    loading={getCourierOptionRes.loading}
                                    options={
                                        getCourierOptionRes
                                            && getCourierOptionRes.data
                                            && getCourierOptionRes.data.getCourierOption
                                    }
                                    getOptions={getCourierOption}
                                    error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                    helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                    primaryKey="value"
                                    labelKey="label"
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
                                        Order Shipped
                                    </Button>
                                </div>
                            </div>
                        )}

                        {homeDelivery.statusValue === 'gosend_rejected' && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikCourier.handleSubmit}
                                        variant="contained"
                                    >
                                        Book Courier
                                    </Button>
                                </div>
                                <div>
                                    <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={
                                            getCourierOptionRes
                                            && getCourierOptionRes.data
                                            && getCourierOptionRes.data.getCourierOption
                                        }
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
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
                                            Order Shipped
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {(homeDelivery.statusValue === 'order_shipped') && (
                            <>
                                {(homeDelivery.awb) ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
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
                        {(homeDelivery.statusValue === 'order_delivered') && (
                            <>
                                {(homeDelivery.awb) ? (
                                    <span className={classes.orderLabel}>
                                        {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel}>
                                        AWB Number : -
                                    </span>
                                )}
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
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
                                {`${homeDelivery.region}, ${homeDelivery.postcode}, ${homeDelivery.countryName}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Address</h5>
                            <span className={classes.orderLabel}>{homeDelivery.shipping_address.street}</span>
                            <span className={classes.orderLabel}>{homeDelivery.shipping_address.city}</span>
                            <span className={classes.orderLabel}>
                                {`${homeDelivery.shipping_address.region}, ${homeDelivery.shipping_address.postcode}, ${homeDelivery.shipping_address.country_name}`}
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
                                    {homeDelivery.order?.map((e) => (
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
                            {homeDelivery.history?.map((e) => {
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

export default HomeDeliveryEditContent;
