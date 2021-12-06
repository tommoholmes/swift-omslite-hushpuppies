import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getMarketplaceCredentials({
        store_detail_id: router && router.query && Number(router.query.store_id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
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
