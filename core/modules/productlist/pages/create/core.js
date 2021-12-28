import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content,
        attributeOptions,
        attributeToMap,
        getNewProductAttributes,
    } = props;
    const router = useRouter();
    const [createProduct] = gqlService.createProduct();
    const [attribute_set_id, set_attribute_set_id] = React.useState(attributeToMap.attribute_set_id);

    const onChangeAttribute = (e) => {
        const { value } = e.target;
        set_attribute_set_id(value);
        getNewProductAttributes({
            variables: {
                attribute_set_id: Number(value),
            },
        });
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < attributeToMap.groups.length; i++) {
            const group = attributeToMap.groups[i];
            group.attributes.filter((att) => att.frontend_input !== 'image').map((attribute) => {
                if (attribute.is_required) {
                    valid.push([attribute.attribute_code, Yup.string().required('This field is Required!')]);
                }
                if (attribute.frontend_input === 'multiselect') {
                    return init.push([attribute.attribute_code, []]);
                }
                if (attribute.frontend_input === 'boolean') {
                    return init.push([attribute.attribute_code, false]);
                }
                return (
                    init.push([attribute.attribute_code, ''])
                );
            });
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        createProduct({
            variables: { ...value },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Update Product!',
                variant: 'success',
            });
            setTimeout(() => router.push('/product/productlist'), 250);
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
            ...initValue().init,
            input_image: [],
        },
        validationSchema: Yup.object().shape({
            ...initValue().valid,
        }),
        onSubmit: (values) => {
            const { input_image, ...restValues } = values;
            const valueToSubmit = {
                input: Object.keys(restValues).map((key) => {
                    let attribute_value = restValues[key] || '';
                    if (restValues[key] && restValues[key] !== '') {
                        if (typeof restValues[key] === 'object') {
                            attribute_value = restValues[key]?.map((val) => (val.value)).join(',') || '';
                        } else if (typeof restValues[key] === 'boolean') {
                            attribute_value = restValues[key] ? '1' : '0';
                        }
                        return ({
                            attribute_code: key,
                            attribute_value,
                        });
                    }
                    return false;
                }).filter((val) => !!val && val?.attribute_value !== ''),
            };
            valueToSubmit.input = [{ attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) }, ...valueToSubmit.input];
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image.map((input) => {
                    const { name, size, ...restInput } = input;
                    return restInput;
                });
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode, file } = files[0];
        const input = formik.values.input_image;
        input.push({
            binary: baseCode,
            types: [],
            position: 0,
            name: file.name,
            size: `${(file.size / 1000)} KB`,
        });
        formik.setFieldValue('input_image', input);
    };

    const contentProps = {
        formik,
        attributeToMap,
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
        attributeOptions,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: 'Create Product',
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });
    const { loading, data } = gqlService.getProductAttributeSetOptions();
    const [getNewProductAttributes, getNewProductAttributesRes] = gqlService.getNewProductAttributes();

    React.useEffect(() => {
        getNewProductAttributes({
            variables: { attribute_set_id: 4 },
        });
    }, []);

    if (loading || aclCheckLoading || getNewProductAttributesRes.loading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading...
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data || !getNewProductAttributesRes.data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/product/productlist');
        }, 1000);
        return (
            <Layout pageConfig={pageConfig}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    const contentProps = {
        attributeOptions: data.getProductAttributeSetOptions,
        attributeToMap: getNewProductAttributesRes.data.getNewProductAttributes,
        getNewProductAttributes,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
