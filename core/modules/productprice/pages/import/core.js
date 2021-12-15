import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productprice/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [importMarketplaceProductPrice] = gqlService.importMarketplaceProductPrice();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'marketplace_product_price' });

    useEffect(() => {
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({
        binary,
    }) => {
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        importMarketplaceProductPrice({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success uploading marketplace product price',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketplace/productprice'), 250);
        }).catch((e) => {
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
        const binarySplited = baseCode.split(',');
        const binary = binarySplited[binarySplited.length - 1];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', binary);
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_product_price',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
