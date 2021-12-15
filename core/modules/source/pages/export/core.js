import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/source/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const pageConfig = {
        title: 'Export Source',
    };

    const [downloadSource] = gqlService.downloadSource();

    const handleSubmit = ({
        location,
    }) => {
        const variables = {
            location_id: location.loc_id,
        };
        window.backdropLoader(true);
        downloadSource({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Successssas Export Source',
                variant: 'success',
            });
            router.push(res.data.downloadSource);
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
            location: 0,
        },
        validationSchema: Yup.object().shape({
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_source',
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
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
