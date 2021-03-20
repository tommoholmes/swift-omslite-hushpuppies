import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getShippingCompanyList, { data, loading }] = gqlService.getShippingCompanyList();
    const [multideleteShippingCompany] = gqlService.multideleteShippingCompany();

    const contentProps = {
        getShippingCompanyList,
        multideleteShippingCompany,
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
