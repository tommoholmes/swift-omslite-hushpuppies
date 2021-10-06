import Layout from '@layout';
import gqlService from '@modules/orderqueue/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    // const [multideleteChannel] = gqlService.multideleteChannel();
    const [setReallocation] = gqlService.setReallocation();

    const contentProps = {
        getOrderQueueList,
        // multideleteChannel,
        setReallocation,
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
