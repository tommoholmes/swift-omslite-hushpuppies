import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/company/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const company = data.getCompanyById;
    const [updateCompany] = gqlService.updateCompany();

    const handleSubmit = ({
        code, name, logistix_credentials_flag, netsuite_id,
    }) => {
        const variables = {
            id: company.company_id,
            company_code: code,
            company_name: name,
            logistix_credentials_flag,
            netsuite_id: Number(netsuite_id) || 0,
        };
        window.backdropLoader(true);
        updateCompany({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit company!',
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
            code: company.company_code,
            name: company.company_name,
            logistix_credentials_flag: company.logistix_credentials_flag,
            netsuite_id: company.netsuite_id,
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

    const contentProps = {
        formik,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCompanyById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_company',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/oms/company');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
