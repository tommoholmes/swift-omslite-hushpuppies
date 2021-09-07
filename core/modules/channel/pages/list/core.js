import Layout from '@layout';
import gqlService from '@modules/channel/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getChannelList, { data, loading }] = gqlService.getChannelList();
    const [multideleteChannel] = gqlService.multideleteChannel();

    const contentProps = {
        getChannelList,
        multideleteChannel,
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
