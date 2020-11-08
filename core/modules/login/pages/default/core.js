/* eslint-disable prefer-destructuring */
import { getToken } from '@modules/login/services/graphql';
import { expiredToken } from '@config';
import { setLogin } from '@helper_auth';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [email, setEmail] = React.useState('endra@icube.us');
    const [password, setPassword] = React.useState('Password123');
    const [getCustomerToken] = getToken();
    const handleSubmit = () => {
        const variables = { email, password };
        getCustomerToken({
            variables,
        }).then((res) => {
            const token = res.data.internalGenerateCustomerToken.token;
            if (token) {
                setLogin(1, expiredToken);
                router.push('/');
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const contentProps = {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
