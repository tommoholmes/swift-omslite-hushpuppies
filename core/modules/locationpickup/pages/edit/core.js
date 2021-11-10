import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/locationpickup/services/graphql';
import { optionsActive } from '@modules/locationpickup/helpers';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const [saveLocationPickup] = gqlService.saveLocationPickup();

    const handleSubmit = async (values) => {
        const variables = { ...values, loc_id: values.loc.loc_id, status: values.status.name };
        delete variables.loc;
        window.backdropLoader(true);
        try {
            await saveLocationPickup({
                variables: {
                    input: variables,
                },
            });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Locationpickup',
                variant: 'success',
            });
            setTimeout(() => router.push('/oms/locationpickup'), 250);
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            pickup_id: data.pickup_id ?? 0,
            loc: data.loc_id ? { loc_id: data.loc_id, loc_name: data.loc_name } : null,
            pickup_charge: data.pickup_charge ?? '',
            pickup_description: data.pickup_description ?? '',
            pickup_fulfillment_time: data.pickup_fulfillment_time ?? '',
            pickup_name: data.pickup_name ?? '',
            pickup_phone: data.pickup_phone ?? '',
            pickup_type: data.pickup_type ?? '',
            rtp_email_template: data.rtp_email_template ?? '',
            status: optionsActive.find((elm) => data.status === elm.name) ?? optionsActive[1],
        },
        validationSchema: Yup.object().shape({
            loc: Yup.object().typeError('required!').required('required!'),
            pickup_name: Yup.string().required('required!'),
            status: Yup.object().typeError('required!').required('required!'),
        }),
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getLocationPickupById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        return <Layout>Data not found!</Layout>;
    }

    return (
        <Layout>
            <ContentWrapper data={data.getLocationPickupById} {...props} />
        </Layout>
    );
};

export default Core;
