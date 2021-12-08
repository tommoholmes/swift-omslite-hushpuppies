/* eslint-disable no-use-before-define */
import Layout from '@layout';
import gqlService from '@modules/batchcreate/services/graphql';
import batchGqlService from '@modules/batchlist/services/graphql';
import Router from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [createPickByBatchManually] = gqlService.createPickByBatchManually();
    const [startPickByBatchPicklist] = batchGqlService.startPickByBatchPicklist();

    const startPicking = (shipmentId) => {
        const shipment_id = shipmentId.map((item) => item.entity_id);
        window.backdropLoader(true);
        createPickByBatchManually({
            variables: {
                type: 'shipment',
                shipment_id,
            },
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success auto generate!',
                variant: 'success',
            });
            handleStartPickByBatch(res.data.createPickByBatch.pick_by_batch.picklist[0].entity_id);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleStartPickByBatch = (id) => {
        const variables = {
            id,
        };
        window.backdropLoader(true);
        startPickByBatchPicklist({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'PickList in Progress',
                variant: 'success',
            });
            setTimeout(() => Router.push(`/pickpack/batchlist/edit/picklist/${id}`), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const contentProps = {
        getStoreShipmentList,
        data,
        loading,
        startPicking,
    };

    const pageConfig = {
        title: 'Create Pick by Batch - Manual Order',
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
