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
            city: city.label,
            location: locationCode.location,
            priority,
        };
        updatePriorityLocation({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit PriorityLocation');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            channelCode: {
                channel_code: priorityLocation.channel_code,
                channel_name: priorityLocation.channel_name,
            },
            city: {
                label: priorityLocation.city,
            },
            locationCode: priorityLocation.locationCode,
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
            // console.log(values);
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
