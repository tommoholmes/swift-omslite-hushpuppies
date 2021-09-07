/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import { optionsHistory } from '@modules/updatestockbyfilehistory/helpers';
import useStyles from '@modules/updatestockbyfilehistory/pages/create/components/style';

const UpdateStockHistoryContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.titleTop}>Update Stock by File History</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Type History</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.code}
                            onChange={(e) => formik.setFieldValue('code', e)}
                            options={optionsHistory}
                            error={!!(formik.touched.history && formik.errors.history)}
                            helperText={(formik.touched.history && formik.errors.history) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        // onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Load File
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default UpdateStockHistoryContent;
