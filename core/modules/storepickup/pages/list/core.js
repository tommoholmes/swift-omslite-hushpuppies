import Layout from '@layout';
import gqlService from '@modules/storepickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();
    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_pickup_dashboard',
    });

    if (loadingOptionStatus || aclCheckLoading) {
        return (
            <Layout useBreadcrumbs={false}>
                <div style={{
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
        getStoreShipmentList,
        confirmShipment,
        pickShipment,
        packShipment,
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
