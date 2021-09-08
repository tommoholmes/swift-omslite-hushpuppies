import Layout from '@layout';
import gqlService from '@modules/curbpickup/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCurbPickupList, { data, loading }] = gqlService.getCurbPickupList();
    const [confirmPickShipment] = gqlService.confirmPickShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();

    const contentProps = {
        getCurbPickupList,
        confirmPickShipment,
        packShipment,
        pickedupShipment,
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
