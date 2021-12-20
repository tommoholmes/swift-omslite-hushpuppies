import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managepromotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { optionsRuleAction } from '@modules/managepromotion/helpers';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const promotion = data.getVendorPromotionById;
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
            rule_id: promotion.rule_id,
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
            name: promotion.name,
            description: promotion.description || '',
            fromDate: promotion.from_date,
            toDate: promotion.to_date,
            simpleAction: optionsRuleAction.find((e) => e.id === promotion.simple_action),
            discountAmount: promotion.discount_amount,
            discountStep: promotion.discount_step || '',
            maxY: promotion.max_y || '',
            couponCode: promotion.coupon_code,
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

    const contentProps = {
        formik,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getVendorPromotionById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_promotion',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        return <Layout>Data not found!</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
