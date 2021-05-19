import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getRmaStatusList, { data, loading }] = gqlService.getRmaStatusList();

    const contentProps = {
        getRmaStatusList,
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
