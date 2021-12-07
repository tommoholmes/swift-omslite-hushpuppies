/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import useStyles from '@modules/managevendor/pages/edit/components/style';

const ManageVendorEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const option = [
        {
            name: 'Yes',
            value: 1,
        },
        {
            name: 'No',
            value: 0,
        },
    ];

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/vendorportal/managevendor')}
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
            <h2 className={classes.titleTop}>
                Manage Vendor
                {' '}
                {formik.values.name}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Vendor Code</span>
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
                            <span className={clsx(classes.label, classes.labelRequired)}>Vendor Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>New Product (Can upload new product)</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                select
                                name="is_new"
                                value={formik.values.is_new}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.is_new && formik.errors.is_new)}
                                helperText={(formik.touched.is_new && formik.errors.is_new) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            >
                                {option.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Margin</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="margin"
                                value={formik.values.margin}
                                onChange={formik.handleChange}
                                type="number"
                                error={!!(formik.touched.margin && formik.errors.margin)}
                                helperText={(formik.touched.margin && formik.errors.margin) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Product Auto Approval (Can auto approve product)</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                select
                                name="is_approve"
                                value={formik.values.is_approve}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.is_approve && formik.errors.is_approve)}
                                helperText={(formik.touched.is_approve && formik.errors.is_approve) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            >
                                {option.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                        </div>
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

export default ManageVendorEditContent;
