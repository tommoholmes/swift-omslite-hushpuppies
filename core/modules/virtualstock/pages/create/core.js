import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
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
        createVirtualStock({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success create new VirtualStock');
            // need show succes message
        }).catch((e) => {
            alert(e);
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
