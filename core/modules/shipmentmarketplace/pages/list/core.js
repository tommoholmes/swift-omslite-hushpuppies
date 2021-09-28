import Layout from '@layout';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmMarketplaceShipment] = gqlService.confirmMarketplaceShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [exportStoreShipmentToCsv] = gqlService.exportStoreShipmentToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success export Shipments',
                variant: 'success',
            });
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

    const handleExport = (variables) => {
        window.backdropLoader(true);
        exportStoreShipmentToCsv({
            variables: {
                type: 'marketplace',
                ...variables,
            },
        });
    };

    const contentProps = {
        getStoreShipmentList,
        confirmMarketplaceShipment,
        pickShipment,
        packShipment,
        data,
        loading,
        exportStoreShipmentToCsv,
        handleExport,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
