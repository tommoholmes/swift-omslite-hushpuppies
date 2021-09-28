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
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [bulkShipment] = gqlService.bulkShipment();
    const [getActivity] = gqlService.getActivity({
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                setTimeout(() => {
                    getActivity();
                }, 5000);
            }
        },
        onError: () => {
            getActivity();
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
        window.backdropLoader(true);
        bulkShipment({
            variables,
        });
        setTimeout(() => {
            getActivity();
            window.backdropLoader(false);
        }, 2000);
    };

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
        firstLoad,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
