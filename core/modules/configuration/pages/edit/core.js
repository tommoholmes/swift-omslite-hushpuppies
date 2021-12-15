import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configuration/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const configurationTada = data.getConfigurationTadaById;
    const [updateConfigurationTada] = gqlService.updateConfigurationTada();

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
            id: configurationTada.id,
            channel_name: channel.channel_name,
            username,
            password,
            api_key: apiKey,
            api_secret: apiSecret,
            program_id: programId,
            catalog_id: catalogId,
        };
        window.backdropLoader(true);
        updateConfigurationTada({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Configuration TADA!',
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
            channel: {
                channel_name: configurationTada.channel_name,
            },
            username: configurationTada.username || '',
            password: configurationTada.password || '',
            apiKey: configurationTada.api_key || '',
            apiSecret: configurationTada.api_secret || '',
            programId: configurationTada.program_id || '',
            catalogId: configurationTada.catalog_id || '',
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().required('Required!'),
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

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getConfigurationTadaById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_config',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
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
