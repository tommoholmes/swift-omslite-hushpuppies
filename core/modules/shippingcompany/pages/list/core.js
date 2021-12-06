import Layout from '@layout';
import gqlService from '@modules/shippingcompany/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getTadaShippingCompanyList, { data, loading }] = gqlService.getTadaShippingCompanyList();
    const [multideleteShippingCompany] = gqlService.multideleteShippingCompany();

    const contentProps = {
        getTadaShippingCompanyList,
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
