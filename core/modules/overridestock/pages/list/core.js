import Layout from '@layout';
import gqlService from '@modules/overridestock/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getVirtualStockQuantityList, { data, loading }] = gqlService.getVirtualStockQuantityList();

    const contentProps = {
        getVirtualStockQuantityList,
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
