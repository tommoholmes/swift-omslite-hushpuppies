import Layout from '@layout';
import gqlService from '@modules/productcategory/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductCategoryList, { data, loading }] = gqlService.getProductCategoryList();
    const [multidisableProductCategory] = gqlService.multidisableProductCategory();
    const [pullProductCategory, { data: dataPull }] = gqlService.pullProductCategory();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_product_categories',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const handlePull = () => {
        window.backdropLoader(true);
        pullProductCategory()
            .then(() => {
                window.backdropLoader(false);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const contentProps = {
        getProductCategoryList,
        multidisableProductCategory,
        handlePull,
        dataPull,
        data,
        loading,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
