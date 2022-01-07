import Layout from '@layout';
import gqlService from '@modules/regionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getChannelRegionList, { data, loading }] = gqlService.getChannelRegionList();
    const [deleteChannelRegions] = gqlService.deleteChannelRegions();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getChannelRegionList,
        deleteChannelRegions,
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
