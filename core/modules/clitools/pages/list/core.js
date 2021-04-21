/* eslint-disable no-unused-vars */
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
    const [addQueueJob] = gqlService.addQueueJob();
    const [getQueueList, { data, loading }] = gqlService.getQueueList();

    const handleSubmit = ({
        id,
    }) => {
        const variables = {
            entity_id: id.entity_id,
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
        },
        validationSchema: Yup.object().shape({
            id: Yup.object().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const contentProps = {
        getQueueList,
        data,
        loading,
        formik,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
