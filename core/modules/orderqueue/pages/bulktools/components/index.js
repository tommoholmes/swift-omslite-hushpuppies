/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/orderqueue/pages/bulktools/components/style';
import CancelIcon from '@material-ui/icons/Cancel';
import Head from 'next/head';
import Autocomplete from '@common_autocomplete';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { useRouter } from 'next/router';

const ProductListImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
        errorHtml,
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Bulk Tools</title>
            </Head>
            <h2 className={classes.titleTop}>Bulk Tools</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>ATTACH FILE</span>
                {errorHtml && (
                    <div className={classes.errorHtml}>
                        <CancelIcon />
                        <div style={{ paddingLeft: 5 }} dangerouslySetInnerHTML={{ __html: errorHtml }} />
                    </div>
                )}
                <div className={classes.contentWithoutBorder}>
                    <div className={clsx(classes.formField, classes.textLeft)}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Bulk Type</span>
                        </div>
                        <Autocomplete
                            value={bulkType}
                            className={classes.autocompleteRoot}
                            onChange={(e) => {
                                setBulkType(e);
                            }}
                            defaultValue={{ loc_name: 'select', loc_code: 0 }}
                            options={bulkToolsOptionsState}
                            primaryKey="acl"
                            labelKey="name"
                        />
                    </div>
                </div>

                <div className={classes.content}>
                    <div className={classes.formField}>
                        {bulkType && (
                            <span className={classes.label}>
                                <a href={urlDownload} className={classes.linkDownload}>
                                    Download the Sample CSV
                                </a>
                            </span>
                        )}
                    </div>
                    <div className={clsx(classes.formField, classes.textLeft)}>
                        <DropFile
                            title="Please select the file : "
                            error={formik.errors.binary && formik.touched.binary}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained" disabled={bulkType === null}>
                        Submit
                    </Button>
                </div>
                {activityState && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress) ? (
                    <div className={classes.progressContainer}>
                        <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                    </div>
                ) : null}
                {activityState
                    && activityState.run_status
                    && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress)
                    && finishedAfterSubmit && (
                        <div className={classes.formFieldButton}>
                            {activityState.run_status !== 'running' && showProgress ? (
                                activityState.error_message ? (
                                    <div className={clsx(classes.status, 'error')}>ERROR</div>
                                ) : (
                                    <div className={clsx(classes.status, 'success')}>SUCCESS</div>
                                )
                            ) : null}

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>Status :</TableCell>
                                            <TableCell className={clsx(classes.rightColumn, 'capitalize')}>{activityState.run_status}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>Started At :</TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                {new Date(activityState.started_at).toLocaleString('en-US', {
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>Run By :</TableCell>
                                            <TableCell className={classes.rightColumn}>{activityState.run_by}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>Error Message :</TableCell>
                                            <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                {activityState.error_message || '-'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>Attachment :</TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                <a
                                                    onClick={() => (activityState.attachment ? router.push(activityState.attachment) : null)}
                                                    style={{
                                                        color: '#BE1F93',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {activityState.attachment ? 'Download' : '-'}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
            </Paper>
        </>
    );
};

export default ProductListImport;
