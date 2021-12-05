import Layout from '@layout';
import gqlService from '@modules/productcategory/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [pullProductCategory, { data, loading }] = gqlService.pullProductCategory();

    const contentProps = {
        pullProductCategory,
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
