/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import DropFile from '@common_dropfile';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/productassembly/pages/import/components/style';
import CancelIcon from '@material-ui/icons/Cancel';

const ProductListImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
        errorHtml,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/product/productassembly')}
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
            <h2 className={classes.titleTop}>Bulk Import</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {errorHtml
                        && (
                            <div className={classes.errorHtml}>
                                <CancelIcon />
                                <div style={{ paddingLeft: 5 }} dangerouslySetInnerHTML={{ __html: errorHtml }} />
                            </div>
                        )}
                    <div className={classes.formField}>
                        <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                    </div>
                    <div className={classes.grid}>
                        <div className={classes.formField}>
                            <DropFile
                                title="Please select the file : "
                                error={(
                                    (formik.errors.binary && formik.touched.binary)
                                )}
                                getBase64={handleDropFile}
                            />
                        </div>
                        <div className={classes.formField} style={{ textAlign: 'right' }}>
                            <span className={classes.label}><a href={urlDownload} className={classes.linkDownload}>Download the Sample CSV</a></span>
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

export default ProductListImport;
