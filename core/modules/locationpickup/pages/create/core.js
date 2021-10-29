import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/locationpickup/services/graphql';
import { optionsActive } from '@modules/locationpickup/helpers';

const ContentWrapper = (props) => {
    const { Content } = props;
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
            loc: null,
            pickup_charge: '',
            pickup_description: '',
            pickup_fulfillment_time: '',
            pickup_name: '',
            pickup_phone: '',
            pickup_type: '',
            rtp_email_template: '',
            status: optionsActive[1],
        },
        validationSchema: Yup.object().shape({
            loc: Yup.object().required('required!'),
            pickup_name: Yup.string().required('required!'),
            pickup_phone: Yup.string().required('required!'),
            pickup_type: Yup.string().required('required!'),
            pickup_description: Yup.string().required('required!'),
            pickup_charge: Yup.string().required('required!'),
            status: Yup.object().required('required!'),
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

const Core = (props) => (
    <Layout>
        <ContentWrapper {...props} />
    </Layout>
);

export default Core;
