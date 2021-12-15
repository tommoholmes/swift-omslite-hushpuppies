import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
// import gqlService from '@modules/location/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    // const [getLocationList] = gqlService.getLocationList();

    // const handleSubmit = ({
    //     code,
    //     name,
    // }) => {
    //     const variables = {
    //         loc_code : code,
    //         loc_name : name,
    //     };
    //     window.backdropLoader(true);
    //     getLocationList({
    //         variables,
    //     }).then(() => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: 'Success Export Source',
    //             variant: 'success',
    //         });
    //         setTimeout(() => router.push('/oms/source'), 250);
    //     }).catch((e) => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: e.message,
    //             variant: 'error',
    //         });
    //     });
    // };

    const formik = useFormik({
        initialValues: {
            code: '',
            name: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
        }),
        // onSubmit: (values) => {
        //     handleSubmit(values);
        // },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_config_integrations',
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
