import Layout from '@layout';
import gqlService from '@modules/locationpriceupload/services/graphql';

const Core = (props) => {
    const { Content } = props;

    const [getPriceLocationList, { data, loading }] = gqlService.getPriceLocationList();

    const contentProps = {
        getPriceLocationList,
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
