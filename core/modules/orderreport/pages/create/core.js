import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [createCompany] = gqlService.createCompany();

    const handleSubmit = ({
        code,
        name,
    }) => {
        const variables = {
            company_code: code,
            company_name: name,
        };
        window.backdropLoader(true);
        createCompany({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new Order Report!',
                variant: 'success',
            });
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
            code: '',
            name: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
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
