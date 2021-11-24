import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/login/pages/default/components/style';

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
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img alt="" src="/assets/img/swiftoms_logo_expanded.png" />
                </div>
                <div className={classes.loginContent}>
                    <Typography variant="h6" gutterBottom className={classes.textTitle}>
                        Sign in to your account
                    </Typography>
                    <form>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={classes.textInput}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-email.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={classes.textInput}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-lock.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.btnLogin}
                                >
                                    <span className={classes.btnLoginText}>Login</span>
                                </Button>
                                <Typography variant="h6" className={classes.btnTextForgot}>
                                    Forgot your password?
                                </Typography>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={classes.containRight}>
                <img alt="" src="/assets/img/swift-bg-login.png" className={classes.rightImg} />
            </div>

        </div>

    );
};

export default Login;
