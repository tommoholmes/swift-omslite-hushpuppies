import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getChannelList, { data, loading }] = gqlService.getChannelList();
    const [deleteChannel] = gqlService.deleteChannel();

    const contentProps = {
        getChannelList,
        deleteChannel,
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
