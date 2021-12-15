import Layout from '@layout';
import gqlService from '@modules/orderqueue/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Order Queue',
    };

    const router = useRouter();
    const [varExport, setVarExport] = React.useState({});
    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    const [setReallocation] = gqlService.setReallocation();
    const [exportOrderToCsv] = gqlService.exportOrderToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success export orders',
                variant: 'success',
            });
            router.push(res.exportOrderToCsv);
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
        exportOrderToCsv({
            variables: {
                ...varExport,
            },
        });
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_order_queue',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getOrderQueueList,
        setReallocation,
        data,
        loading,
        exportOrderToCsv,
        handleExport,
        varExport,
        setVarExport,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
