import Layout from '@layout';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Pick by Wave List',
    };

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getPickByWaveStatus();
    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_list',
    });

    if (loadingOptionStatus || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
        optionsStatus: optionsStatus.getPickByWaveStatus,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
