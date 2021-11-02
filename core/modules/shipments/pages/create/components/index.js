/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouter } from 'next/router';
import useStyles from '@modules/shipments/pages/create/components/style';
import Jne from '@modules/shipments/pages/create/components/Jne';
import GoSend from '@modules/shipments/pages/create/components/GoSend';
import GrabExpress from '@modules/shipments/pages/create/components/GrabExpress';
import ShipperID from '@modules/shipments/pages/create/components/ShipperID';
import SiCepat from '@modules/shipments/pages/create/components/SiCepat';
import SapShipment from '@modules/shipments/pages/create/components/SapShipment';
import { Formik, Form, FieldArray } from 'formik';

const RowShippingCourier = (props) => {
    const {
        idx, option, remove, setFieldValue, handleChange,
    } = props;
    const classes = useStyles();
    const key = Object.keys(option)[0];
    return (
        <tr>
            <td>
                <TextField
                    variant="outlined"
                    name={`swiftoms_shipment_courier_options[${idx}].${key}.title`}
                    value={option[key].title}
                    InputProps={{
                        className: classes.tableInput,
                    }}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //     setFieldValue(`swiftoms_shipment_courier_options[${idx}].${key}.title`, e.target.value);
                    // }}
                />
            </td>
            <td>
                <TextField
                    variant="outlined"
                    name={`swiftoms_shipment_courier_options[${idx}].${key}.code`}
                    value={option[key].code}
                    InputProps={{
                        className: classes.tableInput,
                    }}
                    onChange={handleChange}
                    // onChange={(e) => setFieldValue(`swiftoms_shipment_courier_options[${idx}].${key}.code`, e.target.value)}
                />
            </td>
            <td>
                <button
                    type="button"
                    onClick={() => remove(idx)}
                    style={{
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                    }}
                    className="link-button"
                >
                    Remove
                </button>
            </td>
        </tr>
    );
};

const ChannelCreateContent = (props) => {
    const { shippingCourir, data, handleSubmit } = props;
    const classes = useStyles();
    const router = useRouter();

    const [expanded, setExpanded] = React.useState('jne');
    const handleChangeShippindChild = (e) => (event, isExpanded) => {
        setExpanded(isExpanded ? e : false);
    };
    const [expandedShipping, setExpandedShipping] = React.useState('method');
    const handleChangeShipping = (e) => (event, isExpandedShipping) => {
        setExpandedShipping(isExpandedShipping ? e : false);
    };

    return (
        <>
            <h2 className={classes.titleTop}>Shipment Configuration</h2>
            <Paper className={classes.container}>
                <Formik
                    initialValues={{ ...data, swiftoms_shipment_courier_options: shippingCourir }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validateOnMount={false}
                    validationSchema={false}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, handleChange }) => (
                        <Form>
                            <div className={classes.content}>
                                <Accordion elevation={4} expanded={expandedShipping === 'method'} onChange={handleChangeShipping('method')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                        <h2 className={classes.title}>Shipping Method</h2>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Jne
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                        <GoSend
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                        <GrabExpress
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                        <ShipperID
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                        <SiCepat
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                        <SapShipment
                                            expanded={expanded}
                                            handleChangeShippindChild={handleChangeShippindChild}
                                            setFieldValue={setFieldValue}
                                            values={values}
                                            handleChange={handleChange}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion elevation={4} expanded={expandedShipping === 'courier'} onChange={handleChangeShipping('courier')}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                        <h2 className={classes.title}>Shipping Courier</h2>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={classes.formField}>
                                            <div className={classes.divLabel}>
                                                <span className={classes.label}>Courier Options</span>
                                            </div>
                                        </div>
                                        <div className={classes.formField}>
                                            <div className={classes.divLabel}>
                                                <table className={classes.table}>
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Code</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <FieldArray name="swiftoms_shipment_courier_options">
                                                        {({ push, remove }) => (
                                                            <>
                                                                <tbody>
                                                                    {values.swiftoms_shipment_courier_options?.length > 0
                                                                        && values.swiftoms_shipment_courier_options.map((option, idx) => (
                                                                            <RowShippingCourier
                                                                                key={idx}
                                                                                option={option}
                                                                                idx={idx}
                                                                                remove={remove}
                                                                                values={values}
                                                                                onChange={handleChange}
                                                                                setFieldValue={setFieldValue}
                                                                                handleChange={handleChange}
                                                                            />
                                                                        ))}
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td colSpan="3">
                                                                            <Button
                                                                                className={classes.btn}
                                                                                onClick={() => push({
                                                                                    [`item${
                                                                                            values.swiftoms_shipment_courier_options.length + 1
                                                                                        }`]: {
                                                                                        title: '',
                                                                                        code: '',
                                                                                    },
                                                                                })}
                                                                                variant="contained"
                                                                            >
                                                                                Add
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                </tfoot>
                                                            </>
                                                        )}
                                                    </FieldArray>
                                                </table>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <div className={classes.formFieldButton}>
                                <Button type="submit" className={classes.btn} variant="contained">
                                    Save Config
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </>
    );
};

export default ChannelCreateContent;
