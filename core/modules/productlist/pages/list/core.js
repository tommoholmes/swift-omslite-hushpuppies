import Layout from '@layout';
import gqlService from '@modules/productlist/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductList, { data, loading }] = gqlService.getProductList();

    const contentProps = {
        getProductList,
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
