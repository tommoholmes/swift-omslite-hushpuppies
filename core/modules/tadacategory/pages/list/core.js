import Layout from '@layout';
import gqlService from '@modules/tadacategory/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCategoryTadaList, { data, loading }] = gqlService.getCategoryTadaList();

    const contentProps = {
        getCategoryTadaList,
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
