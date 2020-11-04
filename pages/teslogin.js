/* eslint-disable no-console */

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getToken } from '@modules/login/services/graphql';
import { withApollo } from '@lib_apollo';

function Page() {
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

    return (
        <div style={{ margin: 64 }}>
            <TextField id="emai" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            <br />
            <br />
            <TextField id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" />
            <br />
            <br />
            <Button onClick={handleSubmit} variant="contained">Login</Button>
        </div>
    );
}

export default withApollo()(Page);
