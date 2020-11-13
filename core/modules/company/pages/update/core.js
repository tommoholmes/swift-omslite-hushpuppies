/* eslint-disable no-unused-vars */
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const CreateCore = (props) => {
    const {
        CreateContent,
    } = props;

    const [createCompany] = gqlService.createCompany();

    return (
        <Layout>
            <CreateContent />
        </Layout>
    );
};

const EditCore = (props) => {
    const {
        EditContent,
    } = props;

    return (
        <Layout>
            <EditContent />
        </Layout>
    );
};

const Core = (props) => {
    const router = useRouter();
    if (router && router.query && router.query.id) {
        return <EditCore {...props} />;
    }
    return <CreateCore {...props} />;
};

export default Core;
