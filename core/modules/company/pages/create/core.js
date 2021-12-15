import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/company/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [createCompany] = gqlService.createCompany();

    const handleSubmit = ({
        code, name, logistix_credentials_flag, netsuite_id,
    }) => {
        const variables = {
            company_code: code, company_name: name, logistix_credentials_flag, netsuite_id: Number(netsuite_id) || null,
        };
        createCompany({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success create new company!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/company'), 250);
            })
            .catch((e) => {
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
            logistix_credentials_flag: '',
            netsuite_id: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            logistix_credentials_flag: Yup.string().nullable(),
            netsuite_id: Yup.number().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_company',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
