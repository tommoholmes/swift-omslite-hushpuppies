import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/stocktransfer/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getUploadStockTransferItems({
        id: router && router.query && Number(router.query.id),
    });

    const contentProps = {
        id: router && router.query && Number(router.query.id),
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
