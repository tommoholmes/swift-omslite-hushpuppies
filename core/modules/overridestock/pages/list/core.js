import Layout from '@layout';
import gqlService from '@modules/overridestock/services/graphql';
import React from 'react';

const Core = (props) => {
    const { Content } = props;

    const [getVirtualStockQuantityList, { data, loading }] = gqlService.getVirtualStockQuantityList();

    const [multideleteVirtualStockQuantity] = gqlService.multideleteVirtualStockQuantity();

    const contentProps = {
        getVirtualStockQuantityList,
        data,
        loading,
        multideleteVirtualStockQuantity,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
