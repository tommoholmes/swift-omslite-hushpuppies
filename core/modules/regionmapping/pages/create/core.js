import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@modules/regionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const { Content, options } = props;
    const router = useRouter();

    const [saveChannelRegion] = gqlService.saveChannelRegion();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveChannelRegion({
            variables: { input },
        }).then(async () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Add New Mapping!',
                variant: 'success',
            });
            setTimeout(() => { router.push('/configurations/regionmapping'); }, 250);
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
            region_raw: '',
            countries: {
                full_name_english: 'Indonesia',
                id: 'ID',
            },
            region: null,
        },
        validationSchema: Yup.object().shape({
            region_raw: Yup.string().required('This field is Required!'),
            region: Yup.object().shape({
                code: Yup.string().required('This field is Required!'),
            }),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                region_raw: values.region_raw,
                code: values.region.code,
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        options,
    };
    return (
        <Content {...contentProps} {...props} />
    );
};

const Core = (props) => {
    const pageConfig = {
        title: 'Add New Region Mapping',
    };
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
    });

    const { loading, data } = gqlService.getCountries();

    if (aclCheckLoading || loading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return (
            <Layout pageConfig={{ title: 'Add New Promotion' }} />
        );
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...props} options={data.countries} />
        </Layout>
    );
};

export default Core;
