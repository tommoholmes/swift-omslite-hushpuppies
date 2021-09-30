import Layout from '@layout';
import gqlService from '@modules/warehouse/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getWarehouseList, { data, loading }] = gqlService.getWarehouseList();
    const [multideleteWarehouse] = gqlService.multideleteWarehouse();

    const contentProps = {
        getWarehouseList,
        multideleteWarehouse,
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