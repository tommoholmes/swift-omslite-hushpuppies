import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productattributemapping/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const pageConfig = {
        title: 'Import Mapping',
    };

    const [importMarketplaceProductAttributeMapping] = gqlService.importMarketplaceProductAttributeMapping();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'marketplace_product_attribute_mapping' });
    const [downloadListFix, downloadListFixRes] = gqlService.downloadSampleCsv({ type: 'marketplace_fixed_product_attribute_mapping' });

    useEffect(() => {
        downloadList();
        downloadListFix();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;
    const urlDownloadFix = downloadListFixRes && downloadListFixRes.data && downloadListFixRes.data.downloadSampleCsv;

    const handleSubmit = ({
        binary,
    }) => {
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        importMarketplaceProductAttributeMapping({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Update Categories Status',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketplace/productattributemapping'), 250);
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
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_mapping_product_attribute',
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
        urlDownloadFix,
        handleDropFile,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
