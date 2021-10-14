import Layout from '@layout';
import gqlService from '@modules/wavepack/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
    };

    return (
        <Layout useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
