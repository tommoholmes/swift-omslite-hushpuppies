import Layout from '@layout';
import { getCompanyList as getCompanyListLazy } from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCompanyList, { data, loading }] = getCompanyListLazy();

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
