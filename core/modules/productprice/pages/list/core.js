import Layout from '@layout';
import gqlService from '@modules/productprice/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [updateMarketplaceProductPriceToMp] = gqlService.updateMarketplaceProductPriceToMp();
    const [getMarketplaceProductPriceList, { data, loading }] = gqlService.getMarketplaceProductPriceList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_product_price',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getMarketplaceProductPriceList,
        data,
        loading,
        updateMarketplaceProductPriceToMp,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
