import Layout from '@layout';
import gqlService from '@modules/dashboard/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;

    const summaryData = {
        order_new: data.summaryData.order_new,
        order_no_allocation: data.summaryData.order_no_allocation,
        order_failed: data.summaryData.order_failed,
        shipment_unconfirmed_total: data.summaryData.shipment_unconfirmed_total,
        shipment_unconfirmed_store_pickup: data.summaryData.shipment_unconfirmed_store_pickup,
        shipment_unconfirmed_home_delivery: data.summaryData.shipment_unconfirmed_home_delivery,
        shipment_unconfirmed_marketplace: data.summaryData.shipment_unconfirmed_marketplace,
        shipment_cannot_fulfill: data.summaryData.shipment_cannot_fulfill,
        return_new: data.summaryData.return_new,
    };

    const channelListData = data.channelListData.items;

    const contentProps = {
        summaryData,
        channelListData,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { loading: loadingSummaryData, data: summaryData } = gqlService.getDashboardData();
    const { loading: loadingChannelListData, data: channelListData } = gqlService.getChannelList();

    if (loadingSummaryData || loadingChannelListData) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!summaryData && !channelListData) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    const data = {
        summaryData: summaryData.getDashboardData,
        channelListData: channelListData.getChannelList,
    };

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
