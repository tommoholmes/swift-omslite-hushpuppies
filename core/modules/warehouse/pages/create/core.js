import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createWarehouse] = gqlService.createWarehouse();

    const handleSubmit = ({
        channel,
        marketplace,
        location,
    }) => {
        const variables = {
            channel_code: channel.channel_code,
            marketplace_warehouse_id: marketplace,
            loc_id: location.loc_id,
        };
        window.backdropLoader(true);
        createWarehouse({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new Warehouse!',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketplace/warehouse'), 250);
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
            channel: null,
            marketplace: '',
            location: null,
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().nullable(),
            marketplace: Yup.string().nullable(),
            location: Yup.object().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
