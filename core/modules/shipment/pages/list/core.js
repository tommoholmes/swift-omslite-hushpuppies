import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getShipmentList, { data, loading }] = gqlService.getShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();

    const contentProps = {
        getShipmentList,
        confirmShipment,
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
