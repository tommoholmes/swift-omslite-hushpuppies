import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [createPriorityLocation] = gqlService.createPriorityLocation();

    const handleSubmit = ({
        channelCode,
        city,
        locationCode,
        priority,
    }) => {
        const variables = {
            channel_code: channelCode.channel_code,
            city: city.label,
            loc_code: locationCode.loc_code,
            priority,
        };
        createPriorityLocation({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success create new channel');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            channelCode: null,
            city: null,
            locationCode: null,
            priority: '',
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
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
