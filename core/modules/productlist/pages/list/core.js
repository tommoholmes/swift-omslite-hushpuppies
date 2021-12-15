import Layout from '@layout';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductList, { data, loading }] = gqlService.getProductList();
    const [productFetchManual] = gqlService.productFetchManual();

    const handleFetchManual = () => {
        productFetchManual().then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.productFetchManual,
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getProductList,
        data,
        loading,
        handleFetchManual,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
