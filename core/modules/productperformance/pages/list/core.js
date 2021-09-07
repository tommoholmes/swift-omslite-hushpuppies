import Layout from '@layout';
import gqlService from '@modules/productperformance/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCompanyList, { data, loading }] = gqlService.getCompanyList();

    const contentProps = {
        getCompanyList,
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
