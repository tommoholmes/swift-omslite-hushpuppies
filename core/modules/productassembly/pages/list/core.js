import Layout from '@layout';
import gqlService from '@modules/productassembly/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductAssemblyList, { data, loading }] = gqlService.getProductAssemblyList();

    const contentProps = {
        getProductAssemblyList,
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
