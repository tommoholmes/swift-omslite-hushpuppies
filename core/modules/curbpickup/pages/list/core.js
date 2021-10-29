import Layout from '@layout';
import gqlService from '@modules/curbpickup/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();
    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();

    if (loadingOptionStatus) {
        return (
            <Layout useBreadcrumbs={false}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading
                </div>
            </Layout>
        );
    }

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        packShipment,
        pickedupShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatusByType,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
