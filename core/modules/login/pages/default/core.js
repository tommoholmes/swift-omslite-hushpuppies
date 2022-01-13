/* eslint-disable prefer-destructuring */
import { getToken, getStoreConfig } from '@modules/login/services/graphql';
import { expiredToken } from '@config';
import { setLogin } from '@helper_auth';
import { useRouter } from 'next/router';
import Layout from '@layout';

const Core = (props) => {
    const {
        Content, storeLogo,
    } = props;
    const router = useRouter();
    const pageConfig = {
        header: false,
        sidebar: false,
    };
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [getCustomerToken] = getToken();
    const handleSubmit = () => {
        const variables = { email, password };
        window.backdropLoader(true);
        getCustomerToken({
            variables,
        }).then((res) => {
            const token = res.data.internalGenerateCustomerToken.token;
            if (token) {
                setLogin(1, expiredToken);
                router.push('/');
            }
        }).catch((e) => {
            // console.log(e);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[0],
            });
        });
    };

    const { loading: loadingConfig, data: dataConfig } = getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    });

    const contentProps = {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        loadingConfig,
        dataConfig: dataConfig && dataConfig.getStoreConfig && dataConfig.getStoreConfig === '1',
        storeLogo,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
