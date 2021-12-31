import Layout from '@layout';
import gqlService from '@modules/curbpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Core = (props) => {
    const { Content } = props;

    const [getStoreShipmentList, { data, loading, error }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();
    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    }, [error]);

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_curbside_pickup',
    });

    if (loadingOptionStatus) {
        return (
            <Layout useBreadcrumbs={false}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Loading
                </div>
            </Layout>
        );
    }

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        packShipment,
        pickedupShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatusByType,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
