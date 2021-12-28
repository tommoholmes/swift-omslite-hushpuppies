import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/virtuallocationinventory/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const locationInventory = data.getVirtualLocationById;
    const [updateVirtualLocation] = gqlService.updateVirtualLocation();

    const handleSubmit = ({
        parentLocation, virtualLocation, percentage, priority,
    }) => {
        const variables = {
            id: locationInventory.vl_id,
            parent_location: parentLocation.loc_code,
            virtual_location: virtualLocation.loc_code,
            percentage: Number(percentage),
            priority: Number(priority),
        };
        window.backdropLoader(true);
        updateVirtualLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit Virtual Location!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/virtuallocationinventory'), 250);
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
            parentLocation: {
                loc_code: locationInventory.parent_label.loc_code,
                loc_name: locationInventory.parent_label.label,
            },
            virtualLocation: {
                loc_code: locationInventory.virtual_label.loc_code,
                loc_name: locationInventory.virtual_label.label,
            },
            percentage: locationInventory.percentage,
            priority: locationInventory.priority,
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

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getVirtualLocationById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_virtual_location',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/cataloginventory/virtuallocationinventory');
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

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
