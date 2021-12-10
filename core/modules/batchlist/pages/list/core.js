import Layout from '@layout';
import gqlService from '@modules/batchlist/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Pick by Batch List',
    };

    const [getPickByBatchList, { data, loading }] = gqlService.getPickByBatchList();

    const contentProps = {
        getPickByBatchList,
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
