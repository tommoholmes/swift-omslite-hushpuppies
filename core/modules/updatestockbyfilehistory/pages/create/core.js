import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/updatestockbyfilehistory/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

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

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_stock_history',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
