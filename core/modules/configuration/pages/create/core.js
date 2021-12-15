import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configuration/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createConfigurationTada] = gqlService.createConfigurationTada();

    const handleSubmit = ({
        channel,
        username,
        password,
        apiKey,
        apiSecret,
        programId,
        catalogId,
    }) => {
        const variables = {
            channel_name: channel.channel_name,
            username,
            password,
            api_key: apiKey,
            api_secret: apiSecret,
            program_id: programId,
            catalog_id: catalogId,
        };
        window.backdropLoader(true);
        createConfigurationTada({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new TADA Configuration!',
                variant: 'success',
            });
            setTimeout(() => router.push('/tada/configuration'), 250);
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
            channel: '',
            username: '',
            password: '',
            apiKey: '',
            apiSecret: '',
            programId: '',
            catalogId: '',
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().nullable(),
            username: Yup.string().nullable(),
            password: Yup.string().nullable(),
            apiKey: Yup.string().nullable(),
            apiSecret: Yup.string().nullable(),
            programId: Yup.string().nullable(),
            catalogId: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_config',
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
