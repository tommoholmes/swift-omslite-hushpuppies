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
    const router = useRouter();
    const priorityLocation = data.getPriorityLocationById;
    const [updatePriorityLocation] = gqlService.updatePriorityLocation();

    const handleSubmit = ({
        channelCode,
        city,
        locationCode,
        priority,

    }) => {
        const variables = {
            id: priorityLocation.id,
            channel_code: channelCode.channel_code,
            city: city.city,
            loc_code: locationCode.loc_code,
            priority,
        };
        window.backdropLoader(true);
        updatePriorityLocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit priotiy location!',
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
            channelCode: priorityLocation.channel_code,
            city: priorityLocation.city,
            locationCode: priorityLocation.loc_code,
            priority: priorityLocation.priority || '',
        },
        validationSchema: Yup.object().shape({
            channelCode: Yup.object().nullable(),
            city: Yup.object().nullable(),
            locationCode: Yup.object().nullable(),
            priority: Yup.string().nullable(),
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
    const { loading, data } = gqlService.getPriorityLocationById({
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
