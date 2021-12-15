/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/adminstore/pages/edit/components/style';

const AdminStoreEditContent = (props) => {
    const {
        formik,
        dataCompany,
        dataLocation,
        dataGroup,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/userdata/adminstore')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>Edit User</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Firstname</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Lastname</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            helperText={(formik.touched.lastname && formik.errors.lastname) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Email</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>New Password</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Location</span>
                        </div>
                        <Autocomplete
                            multiple
                            className={classes.autocompleteRoot}
                            name="customer_loc_code"
                            value={typeof formik.values.customer_loc_code === 'object' ? formik.values.customer_loc_code
                                : [formik.values.customer_loc_code]}
                            onChange={(e) => formik.setFieldValue('customer_loc_code', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataLocation}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Group</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="group"
                            value={formik.values.group}
                            onChange={(e) => formik.setFieldValue('group', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataGroup}
                            error={!!(formik.touched.group && formik.errors.group)}
                            helperText={(formik.touched.group && formik.errors.group) || ''}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Company</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="company"
                            value={formik.values.company}
                            onChange={(e) => formik.setFieldValue('company', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataCompany}
                            fullWidth
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default AdminStoreEditContent;
