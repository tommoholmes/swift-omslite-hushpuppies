import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        dataCompany,
        dataLocation,
        dataGroup,
        Content,
    } = props;
    const router = useRouter();

    const [createAdminStore] = gqlService.createAdminStore();

    const handleSubmit = (input) => {
        const variables = { input };
        window.backdropLoader(true);
        createAdminStore({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create user!',
                variant: 'success',
            });
            setTimeout(() => router.push('/userdata/adminstore'), 250);
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
            firstname: '',
            lastname: '',
            email: '',
            customer_loc_code: [''],
            company: '',
            group: dataGroup.getCustomerGroupOptions.find((group, i) => i === 0),
            password: '',
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required('Required!'),
            lastname: Yup.string().required('Required!'),
            email: Yup.string().required('Required!'),
            password: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const {
                customer_loc_code, group, company, ...restValues
            } = values;
            const valueToSubmit = {
                ...restValues,
                customer_loc_code: customer_loc_code?.map((loc) => (
                    String(loc.value)
                )),
                group_id: Number(group.value),
                customer_company_code: company?.value ? String(company.value) : '',
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        dataCompany: dataCompany.getCompanyOptions,
        dataLocation: dataLocation.getLocationOptions,
        dataGroup: dataGroup.getCustomerGroupOptions,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const pageConfig = {
        title: 'Create User',
    };
    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationOptions();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    if (loadingCompany || loadingLocation || loadingGroup || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>Loading...</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        dataCompany,
        dataLocation,
        dataGroup,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
