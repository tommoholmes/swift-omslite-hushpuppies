/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import useStyles from '@modules/updatestockbyfilehistory/pages/create/components/style';
import gqlService from '@modules/updatestockbyfilehistory/services/graphql';

const UpdateStockHistoryContent = (props) => {
    const { formik, getUpdateStockByFileHistoryListRes } = props;
    const classes = useStyles();
    const [getFileHistoryTypes, getFileHistoryTypesRes] = gqlService.getFileHistoryTypes();
    const [listFiles, setListFiles] = useState({
        message: '',
        files: [],
    });

    useEffect(() => {
        if (
            getUpdateStockByFileHistoryListRes
            && getUpdateStockByFileHistoryListRes.data
            && getUpdateStockByFileHistoryListRes.data.getUpdateStockByFileHistoryList
        ) {
            if (getUpdateStockByFileHistoryListRes.data.getUpdateStockByFileHistoryList?.length === 0) {
                setListFiles({
                    ...listFiles,
                    message: 'empty file history',
                    files: getUpdateStockByFileHistoryListRes.data.getUpdateStockByFileHistoryList,
                });
            } else {
                setListFiles({
                    ...listFiles,
                    files: getUpdateStockByFileHistoryListRes.data.getUpdateStockByFileHistoryList?.map((file) => {
                        const url = new URL(file);
                        const path = url.pathname.split('/');
                        const filename = path[path.length - 1];
                        return {
                            url,
                            filename,
                        };
                    }),
                });
            }
        }
        if (typeof window !== 'undefined' && window.backdropLoader && getUpdateStockByFileHistoryListRes.loading) {
            window.backdropLoader(true);
        } else if (typeof window !== 'undefined' && window.backdropLoader) {
            window.backdropLoader(false);
        }
    }, [getUpdateStockByFileHistoryListRes]);

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
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.type}
                            onChange={(e) => formik.setFieldValue('type', e)}
                            options={getFileHistoryTypesRes && getFileHistoryTypesRes.data && getFileHistoryTypesRes.data.getFileHistoryTypes}
                            loading={getFileHistoryTypesRes.loading}
                            getOptions={getFileHistoryTypes}
                            error={!!(formik.touched.type && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                            primaryKey="type"
                            labelKey="title"
                        />
                    </div>
                    <div className={classes.formField}>
                        {listFiles?.message ? (
                            <div style={{ fontWeight: 'bold' }}>{listFiles?.message}</div>
                        ) : (
                            <div>
                                <ul>
                                    {listFiles?.files?.map((file, key) => (
                                        <li key={key}>
                                            <Link href={file?.url}>
                                                <a className="link-button">{file?.filename}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        Load File
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default UpdateStockHistoryContent;
