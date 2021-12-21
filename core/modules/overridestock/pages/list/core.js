import Layout from '@layout';
import gqlService from '@modules/overridestock/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import React from 'react';

const Core = (props) => {
    const { Content } = props;

    const [getVirtualStockQuantityList, { data, loading }] = gqlService.getVirtualStockQuantityList();

    const [multideleteVirtualStockQuantity] = gqlService.multideleteVirtualStockQuantity();
    const [deleteAllVirtualStock] = gqlService.deleteAllVirtualStock();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_override_stock',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getVirtualStockQuantityList,
        data,
        loading,
        multideleteVirtualStockQuantity,
        deleteAllVirtualStock,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
