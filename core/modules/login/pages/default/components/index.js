import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
    } = props;

    return (
        <div className="login-container">
            <form>
                <div className="row center-xs start-sm">
                    <div className="col-xs-12 col-sm-12">
                        <TextField
                            name="email"
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12">
                        <TextField
                            name="password"
                            label="Password"
                            placeholder="******"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default Login;
