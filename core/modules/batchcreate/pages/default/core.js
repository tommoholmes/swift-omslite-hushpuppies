import Layout from '@layout';

const Core = (props) => {
    const { Content } = props;

    const autoGenerate = () => {
        window.backdropLoader(true);
    };

    const contentProps = {
        autoGenerate,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
