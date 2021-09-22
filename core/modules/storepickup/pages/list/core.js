import Layout from '@layout';
import gqlService from '@modules/storepickup/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();

    const contentProps = {
        getStoreShipmentList,
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
