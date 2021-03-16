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
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsFramework, optionsRuleType } from '@modules/channel/helpers';
import clsx from 'clsx';
import useStyles from './style';

const ChannelCreateContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getVirtualStockList, getVirtualStockListRes] = channelGqlService.getVirtualStockList();

    const [expanded, setExpanded] = React.useState('jne');
    const handleChange = (e) => (event, isExpanded) => {
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
                <div className={classes.content}>
                    <Accordion elevation={4} expanded={expandedShipping === 'method'} onChange={handleChangeShipping('method')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.accordion}
                        >
                            <h2 className={classes.title}>Shipping Method</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Accordion elevation={0} expanded={expanded === 'jne'} onChange={handleChange('jne')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>jne</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Price</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>JNE URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>JNE URL Tracking</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Username</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>API KEY</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={0} expanded={expanded === 'gosend'} onChange={handleChange('gosend')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>gosend</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox Mode</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Production URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Client ID</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Pass key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Orderno</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Make Booking</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Price</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Google Maps API Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={0} expanded={expanded === 'grabexpress'} onChange={handleChange('grabexpress')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>grab express</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Is Production</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Cient ID</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Client Secret</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Start Time</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>End Time</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Payment Type</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>SMS Enable</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sender Instruction</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={0} expanded={expanded === 'shipperid'} onChange={handleChange('shipperid')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>shipper id</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox Mode</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Production URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>API Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Dimension Calculation</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Allow Free Shipping</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Minimum Order Amount For Free Shipping</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Auto Booking</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={0} expanded={expanded === 'sicepat'} onChange={handleChange('sicepat')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>si cepat</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox Mode</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Production URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>sandbox URL</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Production API Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox API Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={0} expanded={expanded === 'sapshipment'} onChange={handleChange('sapshipment')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordion}
                                >
                                    <h2 className={classes.title}>sap shipment</h2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled SAP COD</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Enabled SAP Express</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Global Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Sandbox Mode</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Post API Key</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>Company Code</span>
                                        </div>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.code && formik.errors.code)}
                                            helperText={(formik.touched.code && formik.errors.code) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={4} expanded={expandedShipping === 'courier'} onChange={handleChangeShipping('courier')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.accordion}
                        >
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
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <TextField
                                                        variant="outlined"
                                                        name="code"
                                                        value="JNE Shipping"
                                                        InputProps={{
                                                            className: classes.tableInput,
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="outlined"
                                                        name="code"
                                                        value="jneshipping"
                                                        InputProps={{
                                                            className: classes.tableInput,
                                                        }}
                                                    />
                                                </td>
                                                <td><a>Remove</a></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">
                                                    <Button
                                                        className={classes.btn}
                                                        // onClick={formik.handleSubmit}
                                                        variant="contained"
                                                    >
                                                        Add
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        // onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Save Config
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ChannelCreateContent;
