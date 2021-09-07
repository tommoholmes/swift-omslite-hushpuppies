import Layout from '@layout';
import gqlService from '@modules/prioritylocation/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getPriorityLocationList, { data, loading }] = gqlService.getPriorityLocationList();
    const [multideletePriorityLocation] = gqlService.multideletePriorityLocation();

    const contentProps = {
        getPriorityLocationList,
        multideletePriorityLocation,
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
