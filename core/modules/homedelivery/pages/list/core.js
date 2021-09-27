import Layout from '@layout';
import gqlService from '@modules/homedelivery/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
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
                type: 'delivery',
                ...variables,
            },
        });
    };

    const contentProps = {
        getStoreShipmentList,
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
