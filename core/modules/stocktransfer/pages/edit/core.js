import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/stocktransfer/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const stockTransfer = data.getStockTransferById;

    const stockTransferDetail = {
        incrementID: stockTransfer.increment_id,
        items: stockTransfer.items,
    };

    const contentProps = {
        stockTransferDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getStockTransferById({
        id: router && router.query && Number(router.query.id),
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

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
