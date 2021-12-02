import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/forgotpassword/pages/default/components/style';

const Login = (props) => {
    const classes = useStyles();
    const { formik } = props;

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img alt="" src="/assets/img/swiftoms_logo_expanded.png" />
                </div>
                <div className={classes.loginContent}>
                    <Typography variant="h6" gutterBottom className={classes.textTitle}>
                        Forgot your password ?
                    </Typography>

                    <form onSubmit={(e) => formik.handleSubmit(e)}>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <p>Please enter your email address below to receive a password reset link.</p>
                                <TextField
                                    name="email"
                                    placeholder="Email"
                                    value={formik.email}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-email.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={(formik.touched.email && formik.errors.email) || ''}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button type="submit" variant="contained" className={classes.btnLogin}>
                                    <span className={classes.btnLoginText}>Reset My Password</span>
                                </Button>
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
