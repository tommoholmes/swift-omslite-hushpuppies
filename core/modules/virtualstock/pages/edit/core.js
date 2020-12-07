import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const virtualStock = data.getVirtualStockById;
    const [updateVirtualStock] = gqlService.updateVirtualStock();

    const handleSubmit = ({
        name,
        notes,
        location,
    }) => {
        const variables = {
            id: virtualStock.vs_id,
            vs_name: name,
            notes,
            location: location.map((e) => ({ loc_id: e.loc_id })),
        };
        updateVirtualStock({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit VirtualStock');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            name: virtualStock.vs_name || '',
            notes: virtualStock.notes || '',
            location: virtualStock.location || [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            notes: Yup.string().nullable(),
            location: Yup.array().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getVirtualStockById({
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
