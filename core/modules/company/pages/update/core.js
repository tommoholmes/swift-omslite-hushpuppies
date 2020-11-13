import Layout from '@layout';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        CreateContent,
        EditContent,
    } = props;
    const router = useRouter();

    const renderContent = () => {
        if (router && router.query && router.query.id) {
            return <EditContent />;
        }
        return <CreateContent />;
    };

    return (
        <Layout>
            {renderContent()}
        </Layout>
    );
};

export default Core;
