import Layout from '@layout';
import gqlService from '@modules/history/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getHistoryUpdateStockList, { data, loading }] = gqlService.getHistoryUpdateStockList();

    const contentProps = {
        getHistoryUpdateStockList,
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
