import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        getProductAttributes,
    } = props;
    const router = useRouter();
    const [updateProduct] = gqlService.updateProduct();
    const productDetail = data.getProductAttributes;
    const [attribute_set_id, set_attribute_set_id] = React.useState(productDetail.attribute_set_id);

    const onChangeAttribute = (e) => {
        const { value } = e.target;
        set_attribute_set_id(value);
        getProductAttributes({
            variables: {
                id: router && router.query && Number(router.query.id),
                attribute_set_id: Number(value),
            },
        });
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < productDetail.groups.length; i++) {
            const group = productDetail.groups[i];
            group.attributes.filter((att) => att.frontend_input !== 'media_image').map((attribute) => {
                if (attribute.is_required) {
                    valid.push([attribute.attribute_code, Yup.string().required('This field is Required!')]);
                }
                if (attribute.frontend_input === 'multiselect' && attribute.attribute_value?.length) {
                    const values = [];
                    attribute.attribute_value.split(',').forEach((item) => {
                        values.push(attribute.attribute_options.find((o) => o.value === item));
                    });
                    return init.push([attribute.attribute_code, values]);
                }
                if (attribute.frontend_input === 'boolean') {
                    const values = attribute.attribute_value === '1';
                    return init.push([attribute.attribute_code, values]);
                }
                return (
                    init.push([attribute.attribute_code, attribute.attribute_value])
                );
            });
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const handleSubmit = (value) => {
        const variables = {
            ...value,
        };
        window.backdropLoader(true);
        updateProduct({
            variables,
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
                id: router && router.query && Number(router.query.id),
                input: Object.keys(restValues).map((key) => {
                    let attribute_value = restValues[key] || '';
                    if (typeof restValues[key] === 'object') {
                        attribute_value = restValues[key]?.map((val) => (val.value)).join(',') || '';
                    } else if (typeof restValues[key] === 'boolean') {
                        attribute_value = restValues[key] ? '1' : '0';
                    }
                    return ({
                        attribute_code: key,
                        attribute_value,
                    });
                }),
            };
            valueToSubmit.input = [{ attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) }, ...valueToSubmit.input];
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image;
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode } = files[0];
        const input = formik.values.input_image;
        input.push(baseCode);
        formik.setFieldValue('input_image', input);
    };

    const contentProps = {
        formik,
        productDetail,
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Product Detail #${router?.query?.id}`,
    };

    const [getProductAttributes, productAttributes] = gqlService.getProductAttributes();
    const { loading, data, called } = productAttributes;

    React.useEffect(() => {
        getProductAttributes({
            variables: { id: router && router.query && Number(router.query.id) },
        });
    }, []);

    if (loading || !called) {
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

    if (called && !data) {
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

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} getProductAttributes={getProductAttributes} {...props} />
        </Layout>
    );
};

export default Core;
