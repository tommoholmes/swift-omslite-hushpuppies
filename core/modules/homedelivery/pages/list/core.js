import Layout from '@layout';
import gqlService from '@modules/homedelivery/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [varExport, setVarExport] = React.useState({});

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();
    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [bookCourier] = gqlService.bookCourier();
    const [exportStoreShipmentToCsv] = gqlService.exportStoreShipmentToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.exportStoreShipmentToCsv);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_delivery_dashboard',
    });

    if (loadingOptionStatus) {
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

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        pickShipment,
        packShipment,
        bookCourier,
        data,
        loading,
        exportStoreShipmentToCsv,
        varExport,
        setVarExport,
        optionsStatus: optionsStatus.getShipmentStatusByType,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
