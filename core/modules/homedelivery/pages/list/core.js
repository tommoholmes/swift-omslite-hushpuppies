import Layout from '@layout';
import gqlService from '@modules/homedelivery/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [varExport, setVarExport] = React.useState({});

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [bookCourier] = gqlService.bookCourier();
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

    const handleExport = () => {
        window.backdropLoader(true);
        exportStoreShipmentToCsv({
            variables: {
                type: 'delivery',
                ...varExport,
            },
        });
    };

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        pickShipment,
        packShipment,
        bookCourier,
        data,
        loading,
        exportStoreShipmentToCsv,
        handleExport,
        varExport,
        setVarExport,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
