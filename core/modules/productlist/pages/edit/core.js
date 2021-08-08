import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsStatus } from '@modules/productlist/helpers';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const product = data.getProductById;
    const [updateProduct] = gqlService.updateProduct();

    let dateFromSplit;
    let dateFromSplitNew;
    let dateToSplit;
    let dateToSplitNew;

    if (!product.special_from_date) {
        dateFromSplitNew = product.special_from_date;
    }
    if (product.special_from_date) {
        dateFromSplit = product.special_from_date;
        [dateFromSplitNew] = dateFromSplit.split(' ');
    }
    if (!product.special_to_date) {
        dateToSplitNew = product.special_to_date;
    }
    if (product.special_to_date) {
        dateToSplit = product.special_to_date;
        [dateToSplitNew] = dateToSplit.split(' ');
    }

    const handleSubmit = ({
        status,
        price,
        specialPrice,
        dateFrom,
        dateTo,
    }) => {
        const variables = {
            id: product.id,
            status: status.id,
            price: Number(price),
            special_price: Number(specialPrice),
            special_price_from: dateFrom,
            special_price_to: dateTo,
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
            setTimeout(() => router.push('/cataloginventory/productlist'), 250);
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
            status: optionsStatus.find((e) => e.name === product.product_status.label),
            attribute: product.attribute_set_name,
            name: product.name,
            sku: product.sku,
            price: product.price_range.maximum_price.regular_price.value,
            specialPrice: product.special_price,
            dateFrom: dateFromSplitNew,
            dateTo: dateToSplitNew,
            weight: product.weight || 0,
            visibility: product.visibility,
            description: product.description.html,
        },
        validationSchema: Yup.object().shape({
            price: Yup.number().nullable(),
            specialPrice: Yup.number().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const stockList = {
        sourcing: product.sourcing,
    };

    const contentProps = {
        formik,
        stockList,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getProductById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
