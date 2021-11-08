import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/stocktransfer/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [uploadStockTransfer] = gqlService.uploadStockTransfer();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'stock_transfer' });

    useEffect(() => {
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        uploadStockTransfer({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Export Source',
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/stocktransfer'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
