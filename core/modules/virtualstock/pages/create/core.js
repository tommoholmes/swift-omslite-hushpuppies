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
    const [createVirtualStock] = gqlService.createVirtualStock();

    const handleSubmit = ({
        name,
        notes,
        location,
    }) => {
        const variables = {
            vs_name: name,
            notes,
            location: location.map((e) => ({ loc_id: e.loc_id })),
        };
        window.backdropLoader(true);
        createVirtualStock({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new VirtualStock',
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/virtualstock'), 250);
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
            name: '',
            notes: '',
            location: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            notes: Yup.string().nullable(),
            location: Yup.array().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
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
