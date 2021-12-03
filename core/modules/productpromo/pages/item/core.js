import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/productpromo/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const router = useRouter();
    const [getMarketplaceProductPromoItemsList, { data, loading }] = gqlService.getMarketplaceProductPromoItemsList({
        parent_id: router && router.query && Number(router.query.id),
    });

    const contentProps = {
        getMarketplaceProductPromoItemsList,
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
