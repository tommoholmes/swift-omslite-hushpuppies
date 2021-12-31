import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Core = (props) => {
    const { Content } = props;

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatus();
    const [getShipmentList, { data, loading, error }] = gqlService.getShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();

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
        acl_code: 'oms_lite_sales_shipment',
    });

    if (loadingOptionStatus || aclCheckLoading) {
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

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getShipmentList,
        confirmShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatus,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
