import Layout from '@layout';
import gqlService from '@modules/promotion/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getPromotionList, { data, loading }] = gqlService.getPromotionList();
    const [updateStatusPromotion] = gqlService.updateStatusPromotion();

    const contentProps = {
        getPromotionList,
        data,
        loading,
        updateStatusPromotion,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
