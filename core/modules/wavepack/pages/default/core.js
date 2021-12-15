import Layout from '@layout';
import gqlService from '@modules/wavepack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Pack by Wave List',
    };
    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_packlist',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
