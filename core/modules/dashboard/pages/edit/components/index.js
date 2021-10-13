/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/edit/components/style';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import TextField from '@common_textfield';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import GetScore from '@helper_passwordstrength';
import { useRouter } from 'next/router';

const EditUserFormContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [changeEmail, setChangeEmail] = useState(true);
    const [changePassword, setChangePassword] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState('No Password');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailField = (event) => {
        setChangeEmail(event.target.checked);
        formik.setFieldValue('changeEmail', !formik.values.changeEmail);
    };

    const handlePasswordField = (event) => {
        setChangePassword(event.target.checked);
        formik.setFieldValue('changePassword', !formik.values.changePassword);
    };

    const handleNewPassword = (event) => {
        setPasswordError('');

        const score = GetScore(event.target.value);

        setPasswordStrength(score.status);
        if (score.status === 'No Password' || score.status === 'Weak') {
            setPasswordError(score.message);
        }
    };

    return (
        <div>
            <Button
                className={clsx(classes.btnBack, 'buttonBack')}
                onClick={() => router.push('/')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>Edit My Account</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.nameGrid}>
                        <div className={classes.nameGridCol}>
                            <TextField
                                autoFocus
                                className={classes.fieldInput}
                                name="firstname"
                                label="FIRSTNAME"
                                placeholder="Firstname"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.firstname && formik.errors.firstname)}
                                helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                            />
                        </div>
                        <div className={classes.nameGridCol}>
                            <TextField
                                className={classes.fieldInput}
                                name="lastname"
                                label="LASTNAME"
                                placeholder="Lastname"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.lastname && formik.errors.lastname)}
                                helperText={(formik.touched.lastname && formik.errors.lastname) || ''}
                            />
                        </div>
                    </div>

                    <TextField
                        className={clsx(classes.fieldInput, 'fieldInputSpace')}
                        name="customer_loc_code"
                        label="LOCATION CODE"
                        placeholder="LOC1,LOC2,LOC3,LOC4,LOC5,LOC6,LOG7,..."
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        value={formik.values.customer_loc_code}

                    />

                    <TextField
                        className={clsx(classes.fieldInput, 'fieldInputSpace')}
                        name="customer_channel_code"
                        label="CHANNEL CODE"
                        placeholder="SWI,SWIPOS,JUBELIO,TKPE,SHPE,..."
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />

                    <FormControl component="fieldset" className={clsx(classes.formControl, 'formControlSpace')}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox className={clsx(classes.checkboxToggle)} checked={changeEmail} onChange={handleEmailField} name="changeEmail" />}
                                label="Change Email"
                            />

                            <FormControlLabel
                                control={<Checkbox className={clsx(classes.checkboxToggle)} checked={changePassword} onChange={handlePasswordField} name="changePassword" />}
                                label="Change Password"
                            />

                        </FormGroup>
                    </FormControl>

                    {changeEmail === true
                        && (
                            <TextField
                                className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                name="email"
                                label="EMAIL"
                                placeholder="name@example.com"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.email && formik.errors.email)}
                                helperText={(formik.touched.email && formik.errors.email) || ''}
                            />
                        )}

                    {(changeEmail === true || changePassword === true)
                        && (
                            <TextField
                                className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                name="currentPassword"
                                label="CURRENT PASWORD"
                                type="password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
                                helperText={(formik.touched.currentPassword && formik.errors.currentPassword) || ''}
                            />
                        )}

                    {changePassword === true
                        && (
                            <>
                                <TextField
                                    className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                    name="newPassword"
                                    label="NEW PASWORD"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.newPassword}
                                    onChange={(e) => { formik.handleChange(e); handleNewPassword(e); }}
                                    error={!!(formik.touched.newPassword && formik.errors.newPassword) || !!passwordError}
                                    helperText={(formik.touched.newPassword && formik.errors.newPassword) || passwordError || ''}
                                />

                                <Chip className={clsx(classes.passwordIndicator)} label={`Password Strength: ${passwordStrength}`} />

                                <TextField
                                    className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                    name="confirmPassword"
                                    label="CONFIRM NEW PASWORD"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                    helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                                />
                            </>
                        )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default EditUserFormContent;
