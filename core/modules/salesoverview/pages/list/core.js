import Layout from '@layout';
import gqlService from '@modules/salesoverview/services/graphql';

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