import Layout from '@layout';
import gqlService from '@modules/productpromo/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getMarketplaceProductPromoList, { data, loading }] = gqlService.getMarketplaceProductPromoList();

    const contentProps = {
        getMarketplaceProductPromoList,
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
