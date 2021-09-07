import Layout from '@layout';
import gqlService from '@modules/location/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getLocationList, { data, loading }] = gqlService.getLocationList();
    const [multideleteLocation] = gqlService.multideleteLocation();

    const contentProps = {
        getLocationList,
        multideleteLocation,
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
