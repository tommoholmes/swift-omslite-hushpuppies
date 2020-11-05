/* eslint-disable arrow-body-style */
import TextField from '@material-ui/core/TextField';

const Login = () => {
    return (
        <div className="login-container">
            <form>
                <div className="row center-xs start-sm">
                    <div className="col-xs-12 col-sm-12">
                        <TextField
                            name="username"
                            label="Email"
                            placeholder="john.doe@gmail.com"
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12">
                        <TextField
                            name="password"
                            label="Password"
                            placeholder="******"
                            type="password"
                        />
                    </div>
                </div>
            </form>
        </div>

    );
};

export default Login;
