import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationpickpack/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content, refetch } = props;
    const configurationPickPack = data.getPickPackConfigurations;
    const [savePickPackConfigurations] = gqlService.savePickPackConfigurations();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        savePickPackConfigurations({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit Configuration Pick Pack!',
                    variant: 'success',
                });
                refetch();
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

    const initValue = () => {
        const newObj = Object.keys(configurationPickPack)
            .filter((key) => key !== '__typename')
            .map((key) => {
                const { __typename, ...restValue } = configurationPickPack[key];
                return [key, { ...restValue }];
            });
        return Object.fromEntries(newObj);
    };

    const formik = useFormik({
        initialValues: {
            ...initValue(),
        },
        validationSchema: Yup.object().shape({}),
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
    const pageConfig = {
        title: 'Pick Pack Configuration',
    };
    const { loading, data, refetch } = gqlService.getPickPackConfigurations();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_pack_configuration',
    });

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout pageConfig={pageConfig}>
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
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
