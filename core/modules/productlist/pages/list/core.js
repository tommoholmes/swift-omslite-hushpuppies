import Layout from '@layout';
import gqlService from '@modules/productlist/services/graphql';

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
