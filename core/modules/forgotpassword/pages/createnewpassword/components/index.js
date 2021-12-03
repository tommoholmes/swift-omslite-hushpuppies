import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/forgotpassword/pages/createnewpassword/components/style';

const CreateNewPassword = (props) => {
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
                        Set a New Password
                    </Typography>

                    <form onSubmit={(e) => formik.handleSubmit(e)}>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    type="password"
                                    name="password"
                                    placeholder="Your a new password"
                                    value={formik.password}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-lock.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={(formik.touched.password && formik.errors.password) || ''}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm your a new password"
                                    value={formik.password_confirmation}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-lock.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                                    helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || ''}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button type="submit" variant="contained" className={classes.btnLogin}>
                                    <span className={classes.btnLoginText}>Set a New Password</span>
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

export default CreateNewPassword;
