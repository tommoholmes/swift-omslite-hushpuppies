import Layout from '@layout';
import gqlService from '@modules/stocksummary/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const [getStockSummaryList, { data, loading }] = gqlService.getStockSummaryList();

    const contentProps = {
        getStockSummaryList,
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
