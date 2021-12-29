import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        data, dataCompany, dataLocation, dataGroup, Content,
    } = props;
    const router = useRouter();
    const admin = data.getAdminStoreById;
    const [updateAdminStore] = gqlService.updateAdminStore();

    const handleSubmit = (input) => {
        const variables = { id: admin.entity_id, input };
        window.backdropLoader(true);
        updateAdminStore({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit user!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/userdata/adminstore'), 250);
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
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            customer_loc_code: admin.customer_loc_code?.length
                ? admin.customer_loc_code.map((code) => dataLocation.getLocationOptions.find((loc) => loc.value === code))
                : [],
            company: admin.customer_company_code
                ? dataCompany.getCompanyOptions.find((loc) => Number(loc.value) === Number(admin.customer_company_code))
                : '',
            group: dataGroup.getCustomerGroupOptions.find((group) => Number(group.value) === Number(admin.group_id)),
            password: '',
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required('Required!'),
            lastname: Yup.string().required('Required!'),
            email: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const {
                customer_loc_code, group, company, ...restValues
            } = values;
            const valueToSubmit = {
                ...restValues,
                customer_loc_code: customer_loc_code?.map((loc) => String(loc.value)),
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

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Edit User #${router?.query?.id}`,
    };

    const { loading, data } = gqlService.getAdminStoreById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationOptions();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    if (loading || loadingCompany || loadingLocation || loadingGroup || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/userdata/adminstore');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
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
