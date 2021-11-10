import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/updatestockbyfilehistory/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [getUpdateStockByFileHistoryList, getUpdateStockByFileHistoryListRes] = gqlService.getUpdateStockByFileHistoryList();

    const formik = useFormik({
        initialValues: {
            type: null,
        },
        validationSchema: Yup.object().shape({
            type: Yup.object().required('Required!'),
        }),
        onSubmit: (values) => {
            getUpdateStockByFileHistoryList({
                variables: {
                    type: values.type.type,
                },
            });
        },
    });

    const contentProps = {
        formik,
        getUpdateStockByFileHistoryListRes,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
