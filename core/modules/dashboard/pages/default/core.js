import Layout from '@layout';
import gqlService from '@modules/dashboard/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const summaryDataRaw = data.getDashboardData;

    const summaryData = {
        order_new: summaryDataRaw.order_new,
        order_no_allocation: summaryDataRaw.order_no_allocation,
        order_failed: summaryDataRaw.order_failed,
        shipment_unconfirmed_total: summaryDataRaw.shipment_unconfirmed_total,
        shipment_unconfirmed_store_pickup: summaryDataRaw.shipment_unconfirmed_store_pickup,
        shipment_unconfirmed_home_delivery: summaryDataRaw.shipment_unconfirmed_home_delivery,
        shipment_unconfirmed_marketplace: summaryDataRaw.shipment_unconfirmed_marketplace,
        shipment_cannot_fulfill: summaryDataRaw.shipment_cannot_fulfill,
        return_new: summaryDataRaw.return_new,
    };

    const contentProps = {
        summaryData,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { loading, data } = gqlService.getDashboardData();

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
