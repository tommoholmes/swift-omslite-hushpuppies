/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useStyles from '@modules/overridestock/pages/sync/components/style';
import Autocomplete from '@common_autocomplete';
import gqlStore from '@modules/store/services/graphql';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const SyncToMPContent = (props) => {
    const {
        formik, activityState, firstLoad, showProgress, finishedAfterSubmit,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const firstRender = useRef(true);
    const [getStoreList, { data, loading }] = gqlStore.getStoreList();
    const [storeListOptions, setStoreListOptions] = useState([]);

    useEffect(() => {
        getStoreList({
            variables: {
                pageSize: 100,
                currentPage: 1,
                filter: {
                    partner_id: {
                        notnull: 'true',
                        neq: '',
                    },
                    hash_key: {
                        notnull: 'true',
                        neq: '',
                    },
                },
            },
        });
    }, []);

    useEffect(() => {
        if (data && data.getStoreList && data.getStoreList.items) {
            if (data.getStoreList.total_count === 1) {
                formik.setFieldValue('channel_store_id', data.getStoreList.items[0], false);
            }
            setStoreListOptions(data.getStoreList.items);
            firstRender.current = false;
        }
    }, [data]);

    useEffect(() => {
        if (data && data.getStoreList && data.getStoreList.items && data.getStoreList.total_count === 1 && formik.values.channel_store_id) {
            formik.submitForm();
        }
    }, [formik.values]);

    if (firstRender.current && loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Sync Stock to MP</title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/overridestock')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
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
            <h2 className={classes.titleTop}>Sync Stock to MP</h2>
            <Paper className={classes.container}>
                {data
                    && data.getStoreList
                    && (data.getStoreList.items.length > 1 || data.getStoreList.items.length === 0 || data.getStoreList.items === null) && (
                    <div className={classes.content}>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={clsx(classes.label, classes.labelRequired)}>Store</span>
                            </div>
                            <Autocomplete
                                className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                                value={formik.values.channel_store_id}
                                onChange={(e) => formik.setFieldValue('channel_store_id', e)}
                                options={storeListOptions}
                                primaryKey="channel_store_id"
                                labelKey="name"
                            />
                        </div>
                        <Button
                            className={classes.btn}
                            onClick={formik.handleSubmit}
                            variant="contained"
                            disabled={!formik.values.channel_store_id || (activityState && activityState.run_status === 'running')}
                        >
                            Sync
                        </Button>
                    </div>
                )}

                {activityState && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress) ? (
                    <div className={classes.progressContainer}>
                        <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                    </div>
                ) : null}
                {firstLoad ? (
                    <div className={classes.formFieldButton}>
                        <div className={clsx(classes.status)}>Loading...</div>
                    </div>
                ) : (
                    activityState
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
                    )
                )}
            </Paper>
        </>
    );
};

export default SyncToMPContent;
