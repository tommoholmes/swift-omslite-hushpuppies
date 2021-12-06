import Layout from '@layout';
import gqlService from '@modules/productpromo/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getMarketplaceProductPromoList, { data, loading }] = gqlService.getMarketplaceProductPromoList();
    const [updateMarketplaceProductPromoToMp] = gqlService.updateMarketplaceProductPromoToMp();

    const contentProps = {
        getMarketplaceProductPromoList,
        data,
        loading,
        updateMarketplaceProductPromoToMp,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
