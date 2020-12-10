import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getVirtualStockList, { data, loading }] = gqlService.getVirtualStockList();
    const [multideleteVirtualStock] = gqlService.multideleteVirtualStock();

    const contentProps = {
        getVirtualStockList,
        multideleteVirtualStock,
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
