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
    const [createPriorityLocation] = gqlService.createPriorityLocation();

    const handleSubmit = ({
        channelCode,
        city,
        locationCode,
        priority,
    }) => {
        const variables = {
            channel_code: channelCode.channel_code,
            city: city.city,
            loc_code: locationCode.loc_code,
            priority: Number(priority),
        };
        window.backdropLoader(true);
        createPriorityLocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new priority location!',
                variant: 'success',
            });
            setTimeout(() => router.push('/oms/prioritylocation'), 250);
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
            channelCode: null,
            city: null,
            locationCode: null,
            priority: null,
        },
        validationSchema: Yup.object().shape({
            channelCode: Yup.object().nullable(),
            city: Yup.object().nullable(),
            locationCode: Yup.object().nullable(),
            priority: Yup.number().nullable(),
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
