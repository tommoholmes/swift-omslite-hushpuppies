/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import { optionsInItem, optionsEmailCustomer, optionsEmailAdmin } from '@modules/rmastatuses/helpers';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/rmastatuses/pages/edit/components/style';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const RmaStatusesEditContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/sales/rmastatuses')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>Manage Status</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Status Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            disabled
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
                            <span className={classes.label}>Status Label</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="label"
                            value={formik.values.label}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.label && formik.errors.label)}
                            helperText={(formik.touched.label && formik.errors.label) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Position</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.position && formik.errors.position)}
                            helperText={(formik.touched.position && formik.errors.position) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Include in Item Status</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.inItem}
                            onChange={(e) => formik.setFieldValue('inItem', e)}
                            options={optionsInItem}
                            error={!!(formik.touched.inItem && formik.errors.inItem)}
                            helperText={(formik.touched.inItem && formik.errors.inItem) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Auto Message Text</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="messageText"
                            value={formik.values.messageText}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.messageText && formik.errors.messageText)}
                            helperText={(formik.touched.messageText && formik.errors.messageText) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Send Email to Customer</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.emailCustomer}
                            onChange={(e) => formik.setFieldValue('emailCustomer', e)}
                            options={optionsEmailCustomer}
                            error={!!(formik.touched.emailCustomer && formik.errors.emailCustomer)}
                            helperText={(formik.touched.emailCustomer && formik.errors.emailCustomer) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Custom Email Text to Customer</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <TextareaAutosize
                                name="customerText"
                                minRows={4}
                                style={{
                                    borderRadius: 20,
                                    width: '100%',
                                    padding: '5px',
                                    borderColor: `${formik.touched.customerText && formik.errors.customerText ? 'red' : 'black'}`,
                                }}
                                value={formik.values.customerText}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.customerText && formik.errors.customerText && (
                                <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{formik.errors.customerText}</p>
                            )}
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Send Email to Admin</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.emailAdmin}
                            onChange={(e) => formik.setFieldValue('emailAdmin', e)}
                            options={optionsEmailAdmin}
                            error={!!(formik.touched.emailAdmin && formik.errors.emailAdmin)}
                            helperText={(formik.touched.emailAdmin && formik.errors.emailAdmin) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Custom Email Text to Admin</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <TextareaAutosize
                                minRows={4}
                                style={{
                                    borderRadius: 20,
                                    width: '100%',
                                    padding: '5px',
                                    borderColor: `${formik.touched.adminText && formik.errors.adminText ? 'red' : 'black'}`,
                                }}
                                name="adminText"
                                value={formik.values.adminText}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.adminText && formik.errors.adminText && (
                                <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{formik.errors.adminText}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default RmaStatusesEditContent;
