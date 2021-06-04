import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createVirtualLocation] = gqlService.createVirtualLocation();

    const handleSubmit = ({
        parentLocation,
        virtualLocation,
        percentage,
        priority,
    }) => {
        const variables = {
            parent_location: parentLocation.loc_code,
            virtual_location: virtualLocation.loc_code,
            percentage: Number(percentage),
            priority: Number(priority),
        };
        window.backdropLoader(true);
        createVirtualLocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new Virtual Location!',
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/virtuallocationinventory'), 250);
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
            parentLocation: null,
            virtualLocation: null,
            percentage: null,
            priority: null,
        },
        validationSchema: Yup.object().shape({
            parentLocation: Yup.string().required('Required!'),
            virtualLocation: Yup.string().required('Required!'),
            percentage: Yup.number().required('Required!'),
            priority: Yup.number().required('Required!'),
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
