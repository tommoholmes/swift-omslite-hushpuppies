import Layout from '@layout';
import gqlService from '@modules/productprice/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [updateMarketplaceProductPriceToMp] = gqlService.updateMarketplaceProductPriceToMp();
    const [getMarketplaceProductPriceList, { data, loading }] = gqlService.getMarketplaceProductPriceList();

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
