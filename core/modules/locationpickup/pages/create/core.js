import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/locationpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
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
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location_pickup',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper {...props} />
        </Layout>
    );
};

export default Core;
