import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/vendoririspayout/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createVendorIrisPayout] = gqlService.createVendorIrisPayout();

    const handleSubmit = ({
        beneficiaryId, amount, notes,
    }) => {
        const variables = {
            beneficiary_id: Number(beneficiaryId.entity_id),
            amount,
            notes,
        };
        window.backdropLoader(true);
        createVendorIrisPayout({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.createVendorIrisPayout.message,
                variant: 'success',
            });
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
            beneficiaryId: '',
            amount: '',
            notes: '',
        },
        validationSchema: Yup.object().shape({
            beneficiaryId: Yup.object().required('Required'),
            amount: Yup.string().required('Required'),
            notes: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const pageConfig = {
        title: 'Create Payout',
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_iris',
    });

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
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
