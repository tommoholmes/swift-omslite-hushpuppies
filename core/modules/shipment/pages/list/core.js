import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatus();
    const [getShipmentList, { data, loading }] = gqlService.getShipmentList();
    const [confirmShipment] = gqlService.confirmShipment();

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
        getShipmentList,
        confirmShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatus,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
