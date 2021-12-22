import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managepromotion/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [saveVendorPromotion] = gqlService.saveVendorPromotion();

    const handleSubmit = ({
        name,
        description,
        fromDate,
        toDate,
        simpleAction,
        discountAmount,
        discountStep,
        maxY,
        couponCode,
    }) => {
        const variables = {
            name,
            description,
            from_date: fromDate,
            to_date: toDate,
            simple_action: simpleAction.id,
            discount_amount: discountAmount,
            discount_step: discountStep,
            max_y: maxY,
            coupon_code: couponCode,
        };
        window.backdropLoader(true);
        saveVendorPromotion({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new promotion',
                variant: 'success',
            });
            setTimeout(() => router.push('/vendorportal/managepromotion'), 250);
        })
            .catch((e) => {
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
            description: '',
            fromDate: '',
            toDate: '',
            simpleAction: '',
            discountAmount: '',
            discountStep: '',
            maxY: '',
            couponCode: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required!'),
            fromDate: Yup.string().required('Required!'),
            toDate: Yup.string().required('Required!'),
            simpleAction: Yup.object().required('Required!'),
            discountAmount: Yup.string().required('Required!'),
            couponCode: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_promotion',
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
