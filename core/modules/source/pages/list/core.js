import Layout from '@layout';
import gqlService from '@modules/source/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getSourceList, { data, loading }] = gqlService.getSourceList();

    const contentProps = {
        getSourceList,
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
