import Layout from '@layout';
import gqlService from '@modules/creditmemos/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCreditMemoList, { data, loading }] = gqlService.getCreditMemoList();

    const contentProps = {
        getCreditMemoList,
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
