import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getMarketplaceCredentials({
        store_detail_id: router && router.query && Number(router.query.store_id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/configurations/marketplacebrand');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data: data.getMarketplaceCredentials,
    };

    return (
        <Layout>
            <Content {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
