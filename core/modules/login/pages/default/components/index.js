import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './style';

const Login = (props) => {
    const classes = useStyles();
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
    } = props;

    return (
        <div className={clsx(classes.loginContainer)}>
            <h3>Sign in to your account</h3>
            <form>
                <div className="row center-xs start-sm">
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                        <TextField
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
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
