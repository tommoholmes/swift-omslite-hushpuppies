import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCompanyList, { data, loading }] = gqlService.getCompanyList();
    const [deleteCompany] = gqlService.deleteCompany();

    const contentProps = {
        getCompanyList,
        deleteCompany,
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
