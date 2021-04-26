import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreList, { data, loading }] = gqlService.getStoreList();

    const contentProps = {
        getStoreList,
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
