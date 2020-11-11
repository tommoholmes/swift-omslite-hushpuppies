import Layout from '@layout';
import { getCompanyList } from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const pageSize = 3;
    const currentPage = 1;
    const { data, loading } = getCompanyList({ pageSize, currentPage });

    if (loading) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    const contentProps = {
        data,
        pageSize,
        currentPage,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
