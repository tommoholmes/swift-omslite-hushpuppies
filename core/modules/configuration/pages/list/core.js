import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getConfigurationTadaList, { data, loading }] = gqlService.getConfigurationTadaList();
    const [multideleteConfigurationTada] = gqlService.multideleteConfigurationTada();

    const contentProps = {
        getConfigurationTadaList,
        multideleteConfigurationTada,
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
