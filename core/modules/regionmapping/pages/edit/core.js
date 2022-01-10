import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@modules/regionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const { Content, data, options } = props;
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

    const countrySelected = options.find((country) => (
        country?.available_regions?.find((region) => region.code === data.code)));

    const formik = useFormik({
        initialValues: {
            region_raw: data.region_raw,
            countries: countrySelected,
            region: countrySelected?.available_regions?.find((region) => region.code === data.code),
        },
        validationSchema: Yup.object().shape({
            region_raw: Yup.string().required('This field is Required!'),
            region: Yup.object().shape({
                code: Yup.string().required('This field is Required!'),
            }),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                id: Number(data.id),
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
        title: 'Edit New Region Mapping',
    };
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
    });
    const { loading, data, error } = gqlService.getChannelRegionById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingOptions, data: dataOptions } = gqlService.getCountries();

    if (loading || aclCheckLoading || loadingOptions) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return (
            <Layout pageConfig={{ title: 'Add New Promotion' }} />
        );
    }
    if (!data || error) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = router.query.tab_status ? `/order/${router.query.tab_status}` : '/order/allorder';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data: data.getChannelRegionById,
        options: dataOptions.countries,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
