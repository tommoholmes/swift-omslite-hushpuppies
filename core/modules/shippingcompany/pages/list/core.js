import Layout from '@layout';
import gqlService from '@modules/shippingcompany/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content } = props;

    const [getTadaShippingCompanyList, { data, loading }] = gqlService.getTadaShippingCompanyList();
    const [multideleteShippingCompany] = gqlService.multideleteShippingCompany();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_shipping_company',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
