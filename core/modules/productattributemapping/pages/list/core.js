import Layout from '@layout';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductAttributeList, { data, loading }] = gqlService.getProductAttributeList();
    const [multideleteProductAttribute] = gqlService.multideleteProductAttribute();

    const contentProps = {
        getProductAttributeList,
        multideleteProductAttribute,
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
