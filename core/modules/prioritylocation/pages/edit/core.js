import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/prioritylocation/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const priorityLocation = data.getPriorityLocationById;
    const [updatePriorityLocation] = gqlService.updatePriorityLocation();

    const handleSubmit = ({
        channelCode, city, locationCode, priority,
    }) => {
        const variables = {
            id: priorityLocation.id,
            channel_code: channelCode.channel_code,
            city: city.city,
            loc_code: locationCode.loc_code,
            priority: Number(priority),
        };
        window.backdropLoader(true);
        updatePriorityLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit priotiy location!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/prioritylocation'), 250);
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
            channelCode: priorityLocation.channel_code,
            city: priorityLocation.city,
            locationCode: priorityLocation.loc_code,
            priority: priorityLocation.priority || null,
        },
        validationSchema: Yup.object().shape({
            channelCode: Yup.object().nullable(),
            city: Yup.object().nullable(),
            locationCode: Yup.object().nullable(),
            priority: Yup.number().nullable(),
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
    const { loading, data } = gqlService.getPriorityLocationById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_priority_location_by_city',
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
            router.push('/oms/prioritylocation');
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
