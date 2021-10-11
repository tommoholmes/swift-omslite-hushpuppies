import Layout from '@layout';
import gqlService from '@modules/batchlist/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getPickByBatchList, { data, loading }] = gqlService.getPickByBatchList();

    const contentProps = {
        getPickByBatchList,
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
