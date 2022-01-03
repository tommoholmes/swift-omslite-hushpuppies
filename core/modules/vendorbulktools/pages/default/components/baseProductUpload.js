/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Button from '@common_button';
import DropFile from '@common_dropfile';
import clsx from 'clsx';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';
import Link from 'next/link';

const ProductBundle = (props) => {
    const {
        gqlUpload, urlDownload, handleSubmit, toolName, code, isNoTutorial = false,
    } = props;
    const classes = useStyles();
    const [uploader] = gqlUpload();

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: async (values) => {
            const variables = {
                binary: values.binary,
            };
            handleSubmit(variables, uploader);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    return (
        <>
            <div className={classes.content}>
                <div className={classes.formField}>
                    <span className={classes.label}>
                        <a href={urlDownload} className={classes.linkDownload}>
                            Download the Sample CSV
                        </a>
                        {!isNoTutorial && (
                            <>
                                <br />
                                <Link href={`/vendorportal/tutorialupload?code=${code}`}>
                                    <a target="_blank" className={classes.linkDownload}>
                                        Tutorial {toolName ?? 'Upload'}
                                    </a>
                                </Link>
                            </>
                        )}
                    </span>
                </div>
                <div className={clsx(classes.formField, classes.textLeft)}>
                    <DropFile title="Please select the file : " error={formik.errors.binary && formik.touched.binary} getBase64={handleDropFile} />
                </div>
            </div>
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} variant="contained" onClick={formik.handleSubmit}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ProductBundle;
