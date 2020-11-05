import { getToken } from '@modules/login/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [email, setEmail] = React.useState('endra@icube.us');
    const [password, setPassword] = React.useState('Password123');
    const [getCustomerToken] = getToken();
    const handleSubmit = () => {
        const variables = { username: email, password };
        console.log(variables);
        getCustomerToken({
            variables,
        }).then((res) => {
            console.log(res);
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
