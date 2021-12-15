import Layout from '@layout';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getAdminStoreList, { data, loading }] = gqlService.getAdminStoreList();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    if (loadingGroup || aclCheckLoading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getAdminStoreList,
        data,
        loading,
        groupOptions: dataGroup?.getCustomerGroupOptions,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
