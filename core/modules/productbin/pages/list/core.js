import Layout from '@layout';
import gqlService from '@modules/productbin/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getProductBinList, { data, loading }] = gqlService.getProductBinList();
    const [massDeleteProductBin] = gqlService.massDeleteProductBin();

    const contentProps = {
        getProductBinList,
        massDeleteProductBin,
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
