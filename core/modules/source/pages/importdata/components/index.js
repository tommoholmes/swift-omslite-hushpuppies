/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from './style';

const SourceImportData = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = locationGqlService.getLocationList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/source')}
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
            <h2 className={classes.titleTop}>Import Data Source</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}><a className={classes.linkDownload}>Download the Sample CSV</a></span>
                        <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                    </div>
                    <div className={classes.formField}>
                        <span className={classes.label}>
                            Please select the file
                            <input
                                accept="image/*"
                                className={classes.inputCsv}
                                id="contained-button-file"
                                type="file"
                            />
                        </span>
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

export default SourceImportData;
