/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/forgotpassword/pages/default/components/style';
import Head from 'next/head';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import gqlService from '@modules/forgotpassword/services/graphql';

const ForgotPassword = (props) => {
    const { data, loading } = gqlService.getStoreConfigCaptchaSiteKey();
    const classes = useStyles();
    const { formik } = props;
    const handleCaptchaOnChange = (val) => {
        formik.setFieldValue('g_recaptcha_response', val);
    };

    return (
        <>
            <Head>
                <title>Set a New Password</title>
            </Head>
            <div className={clsx(classes.loginContainer)}>
                <div className={classes.containLeft}>
                    <div className={classes.headerLogin}>
                        <img alt="" src="/assets/img/swiftoms_logo_expanded.png" />
                    </div>
                    {loading ? (
                        <div className={classes.loginContent}>loading...</div>
                    ) : data && data.getStoreConfig ? (
                        <div className={classes.loginContent}>
                            <Typography variant="h6" gutterBottom className={classes.textTitle}>
                                Forgot your password ?
                            </Typography>
                            <Typography variant="h6" gutterBottom className={classes.btnTextForgot}>
                                Please enter your email address below to receive a password reset link.
                            </Typography>
                            <form onSubmit={(e) => formik.handleSubmit(e)}>
                                <div className="row center-xs start-sm">
                                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
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
                                        <ReCAPTCHA sitekey={data.getStoreConfig} onChange={handleCaptchaOnChange} />
                                        <p
                                            style={{
                                                color: 'red',
                                                margin: 0,
                                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {formik.touched.g_recaptcha_response && formik.errors.g_recaptcha_response}
                                        </p>
                                    </div>
                                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                        <Button type="submit" variant="contained" className={classes.btnLogin}>
                                            <span className={classes.btnLoginText}>Reset My Password</span>
                                        </Button>
                                        <Typography variant="h6" className={classes.btnTextForgot}>
                                            <Link href="/login">
                                                <a>Back to login page</a>
                                            </Link>
                                        </Typography>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className={classes.loginContent}>Captcha key not define</div>
                    )}
                </div>
                <div className={classes.containRight}>
                    <img alt="" src="/assets/img/swift-bg-login.png" className={classes.rightImg} />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
