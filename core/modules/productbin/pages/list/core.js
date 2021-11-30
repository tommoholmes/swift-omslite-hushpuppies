import Layout from '@layout';
import gqlService from '@modules/productbin/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getProductBinList, { data, loading }] = gqlService.getProductBinList();

    const contentProps = {
        getProductBinList,
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
