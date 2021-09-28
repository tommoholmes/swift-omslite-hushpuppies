import Layout from '@layout';
import gqlService from '@modules/storepickup/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        pickShipment,
        packShipment,
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
