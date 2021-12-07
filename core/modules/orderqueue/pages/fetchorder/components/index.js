/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/orderqueue/pages/fetchorder/components/style';

const FetchOrderContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/order/allorder')}
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
            <h2 className={classes.titleTop}>Fetch Order</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Start Date</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="start_date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.start_date && formik.errors.start_date)}
                            helperText={(formik.touched.start_date && formik.errors.start_date) || ''}
                            className={classes.fieldRoot}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>End Date</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="end_date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.end_date && formik.errors.end_date)}
                            helperText={(formik.touched.end_date && formik.errors.end_date) || ''}
                            className={classes.fieldRoot}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
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

export default FetchOrderContent;