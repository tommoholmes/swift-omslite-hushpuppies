import Layout from '@layout';
import gqlService from '@modules/logistixprovider/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [getLogistixProviderList, { data, loading }] = gqlService.getLogistixProviderList();
    const [deleteLogistixProvider] = gqlService.deleteLogistixProvider();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_logistix_provider',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getLogistixProviderList,
        data,
        loading,
        deleteLogistixProvider,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
