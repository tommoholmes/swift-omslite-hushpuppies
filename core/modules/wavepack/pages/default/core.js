import Layout from '@layout';
import gqlService from '@modules/wavepack/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Pack by Wave List',
    };
    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
