/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/homedelivery/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [activityState, setActivityState] = React.useState();
    const [bulkShipment] = gqlService.bulkShipment();
    const [getActivity, responseActivity] = gqlService.getActivity({
        onCompleted: (res) => {
            setActivityState(res.getActivity);
        },
    });
    React.useEffect(() => {
        getActivity();
    }, []);
    const handleSubmit = ({
        binary,
    }) => {
        const variables = {
            binary,
        };
        // window.backdropLoader(true);
        bulkShipment({
            variables,
        }).then(() => {
            // window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Bulk Shipment',
                variant: 'success',
            });
            // setTimeout(() => router.push('/shipment/homedelivery'), 250);
        }).catch((e) => {
            // window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    if (activityState?.run_status === 'running') {
        setTimeout(() => {
            getActivity();
        }, 5000);
    }

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode.slice(idx + 7));
    };

    const contentProps = {
        formik,
        handleDropFile,
        activityState,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
