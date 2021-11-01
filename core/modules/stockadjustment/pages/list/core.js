import Layout from '@layout';
import gqlService from '@modules/stockadjustment/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [getStockAdjustmentList, { data, loading }] = gqlService.getStockAdjustmentList();

    const contentProps = {
        getStockAdjustmentList,
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
