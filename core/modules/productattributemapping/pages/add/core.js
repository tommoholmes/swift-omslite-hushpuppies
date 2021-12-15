import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productattributemapping/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        dataMarketplace,
        dataMapAttribute,
        Content,
    } = props;
    const router = useRouter();
    const [getCategory, getCategoryRes] = gqlService.getMpProductAttributeMappingMpCategories();
    const [getAttribute, getAttributeRes] = gqlService.getMarketplaceProductAttributeList();
    const [getAttributeTotal, getAttributeTotalRes] = gqlService.getMarketplaceProductAttributeList();
    const [getAttributeSetting, getAttributeSettingRes] = gqlService.getMpProductVariantAttributeSetting();
    const [saveMapping] = gqlService.saveMarketplaceProductAttributeMapping();

    const handleSubmit = (input) => {
        const variables = { input };
        window.backdropLoader(true);
        saveMapping({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success add new mapping!',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketplace/productattributemapping/'), 250);
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
        initialValues: {},
        validationSchema: Yup.object().shape({}),
        onSubmit: (values) => {
            const { entity_id, attribute_id } = values;
            const valuesToSubmit = {
                attribute_id: Number(attribute_id.value),
                entity_id: Number(entity_id.entity_id),
            };
            handleSubmit(valuesToSubmit);
        },
    });

    React.useEffect(() => {
        if (formik.values.marketplace_code) {
            getCategory({
                variables: {
                    marketplace_code: formik.values.marketplace_code,
                },
            });
            getAttributeSetting({
                variables: {
                    marketplace_code: formik.values.marketplace_code,
                },
            });
        }
    }, [formik.values.marketplace_code]);

    React.useEffect(() => {
        if (formik.values.category_id) {
            getAttribute({
                variables: {
                    filter: {
                        marketplace_code: {
                            eq: formik.values.marketplace_code,
                        },
                        category_id: {
                            eq: String(formik.values.category_id?.entity_id),
                        },
                    },
                },
            });
            getAttributeTotal({
                variables: {
                    filter: {
                        marketplace_code: {
                            eq: formik.values.marketplace_code,
                        },
                        category_id: {
                            eq: String(formik.values.category_id?.entity_id),
                        },
                        attribute_id: {
                            notnull: 'true',
                        },
                        is_variant_attribute: {
                            eq: '1',
                        },
                    },
                    pageSize: 0,
                },
            });
        }
    }, [formik.values.category_id]);

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
        dataMarketplace,
        dataMapAttribute,
        getCategoryRes,
        getAttributeRes,
        getAttributeTotalRes,
        getAttributeSettingRes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const pageConfig = {
        title: 'Add New Mapping',
    };
    const { loading: loadingMarketplace, data: dataMarketplace } = gqlService.getMpProductAttributeMappingMpOptions();
    const { loading: loadingMapAttribute, data: dataMapAttribute } = gqlService.getProductEavAttributeOptions();

    if (loadingMarketplace || loadingMapAttribute) {
        return (
            <Layout pageConfig={pageConfig}>Loading...</Layout>
        );
    }

    const contentProps = {
        dataMarketplace: dataMarketplace.getMpProductAttributeMappingMpOptions,
        dataMapAttribute: dataMapAttribute.getProductEavAttributeOptions,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
