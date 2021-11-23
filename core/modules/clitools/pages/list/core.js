/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/clitools/services/graphql';

const ContentWrapper = (props) => {
    const {
        getQueueList,
        data,
        loading,
        dataOptions,
        Content,
    } = props;

    const [addQueueJob] = gqlService.addQueueJob();

    const handleSubmit = ({
        id,
        additional,
    }) => {
        const variables = {
            entity_id: id.entity_id,
            additional,
        };
        window.backdropLoader(true);
        addQueueJob({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success add command!',
                variant: 'success',
            });
            window.location.reload();
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
            id: null,
            additional: '',
        },
        validationSchema: Yup.object().shape({
            id: Yup.object().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        getQueueList,
        data,
        loading,
        formik,
        dataOptions,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const [getQueueList, { data, loading }] = gqlService.getQueueList();
    const { loading: loadingOptions, data: dataOptions } = gqlService.getJobStatusOptions();

    if (loadingOptions) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    const contentProps = {
        getQueueList,
        data,
        loading,
        dataOptions: dataOptions.getJobStatusOptions,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
