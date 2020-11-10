import Layout from '@layout';
import { getCompanyList } from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const { data, loading } = getCompanyList({ pageSize: 5, currentPage: 1 });

    if (loading) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Content data={data} />
        </Layout>
    );
};

export default Core;
