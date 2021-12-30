import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import useStyles from '@modules/registervendor/pages/default/components/style';
import Link from 'next/link';
import GetScore from '@helper_passwordstrength';

const colorWeak = '#FF4B47';
const colorMedium = '#FFA500';
const colorStrong = '#87D6A8';
const colorVeryStrong = '#00C853';

const Login = (props) => {
    const classes = useStyles();
    const {
        formik, getCountries, getCountriesRes, getRegion, getRegionRes,
        getCityKecByRegionCode, getCityKecByRegionCodeRes,
    } = props;

    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');

    const getColor = (status) => {
        switch (status) {
        case 'Weak':
            return colorWeak;
        case 'Medium':
            return colorMedium;
        case 'Strong':
            return colorStrong;
        case 'Very Strong':
            return colorVeryStrong;
        default:
            return colorWeak;
        }
    };

    const getSize = (status) => {
        switch (status) {
        case 'Weak':
            return '25%';
        case 'Medium':
            return '50%';
        case 'Strong':
            return '75%';
        case 'Very Strong':
            return '100%';
        default:
            return '25%';
        }
    };

    const onClickSubmit = () => {
        if (passwordError === '') {
            formik.handleSubmit();
        }
    };

    useEffect(() => {
        if (formik.values.password) {
            const passwordScore = GetScore(formik.values.password, 8, 3);
            setPasswordError(`${passwordScore.message ? `${passwordScore.message} or password too common` : ''}`);
            setPasswordErrorStatus(passwordScore.status);
        }
    }, [formik.values.password]);

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img alt="" src="/assets/img/swiftoms_logo_expanded.png" />
                </div>
                <Typography variant="h6" gutterBottom className={classes.textTitle}>
                    Request New Vendor
                </Typography>
                <div className={classes.loginContent}>
                    <form>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="first_name" className={classes.label}>
                                    FIRST NAME
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="first_name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.first_name && formik.errors.first_name)}
                                    helperText={(formik.touched.first_name && formik.errors.first_name) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="last_name" className={classes.label}>
                                    LAST NAME
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="last_name"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.last_name && formik.errors.last_name)}
                                    helperText={(formik.touched.last_name && formik.errors.last_name) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="email" className={classes.label}>
                                    EMAIL
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={(formik.touched.email && formik.errors.email) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="password" className={classes.label}>
                                    PASSWORD
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={passwordError !== '' || !!(formik.touched.password && formik.errors.password)}
                                    helperText={(formik.touched.password && formik.errors.password) || passwordError}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                                {passwordErrorStatus !== '' && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '10px 0px',
                                            width: '100%',
                                        }}
                                    >
                                        <div style={{
                                            height: 36, borderRadius: 20, width: '75%', backgroundColor: '#ECF0FB',
                                        }}
                                        >
                                            <div
                                                style={{
                                                    height: 36,
                                                    width: getSize(passwordErrorStatus),
                                                    backgroundColor: getColor(passwordErrorStatus),
                                                    transition: 'background-color .2s, visisility .1s',
                                                    borderRadius: 20,
                                                }}
                                            />

                                        </div>
                                        <div style={{ padding: '0px 5px', color: getColor(passwordErrorStatus), fontSize: '0.75rem' }}>
                                            {passwordErrorStatus}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="password_confirmation" className={classes.label}>
                                    CONFIRM PASSWORD
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                                    helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_street" className={classes.label}>
                                    ADDRESS
                                </InputLabel>
                                <TextField
                                    id="company_street"
                                    name="company_street"
                                    value={formik.values.company_street}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_country_id" className={classes.label}>
                                    COUNTRY
                                </InputLabel>
                                <Autocomplete
                                    id="company_country_id"
                                    name="company_country_id"
                                    mode="lazy"
                                    getOptions={getCountries}
                                    value={formik.values.company_country_id}
                                    onChange={(e) => {
                                        formik.setFieldValue('company_country_id', e);
                                        formik.setFieldValue('company_region', '');
                                        formik.setFieldValue('company_city', '');
                                    }}
                                    options={(getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries)
                                        || []}
                                    loading={getCountriesRes.loading}
                                    primaryKey="id"
                                    labelKey="full_name_english"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            value={formik.values.company_country_id}
                                            className={classes.textInput}
                                            {...params}
                                        />
                                    )}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_region" className={classes.label}>
                                    PROVINCE
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.company_country_id}
                                    id="company_region"
                                    name="company_region"
                                    mode="lazy"
                                    getOptions={getRegion}
                                    getOptionsVariables={{ variables: { id: formik.values.company_country_id?.id } }}
                                    value={formik.values.company_region}
                                    onChange={(e) => {
                                        formik.setFieldValue('company_region', e);
                                        formik.setFieldValue('company_city', '');
                                    }}
                                    options={(getRegionRes && getRegionRes.data
                                        && getRegionRes.data.country && getRegionRes.data.country.available_regions)
                                        || []}
                                    loading={getRegionRes.loading}
                                    primaryKey="id"
                                    labelKey="name"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            value={formik.values.company_region}
                                            className={classes.textInput}
                                            {...params}
                                        />
                                    )}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_city" className={classes.label}>
                                    CITY
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.company_region}
                                    id="company_city"
                                    name="company_city"
                                    mode="lazy"
                                    getOptions={getCityKecByRegionCode}
                                    getOptionsVariables={{ variables: { region_code: formik.values.company_region?.code } }}
                                    value={formik.values.company_city}
                                    onChange={(e) => {
                                        formik.setFieldValue('company_city', e);
                                    }}
                                    options={(getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data
                                        && getCityKecByRegionCodeRes.data.getCityKecByRegionCode)
                                        || []}
                                    loading={getCityKecByRegionCodeRes.loading}
                                    primaryKey="value"
                                    labelKey="label"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            value={formik.values.company_region}
                                            className={classes.textInput}
                                            {...params}
                                        />
                                    )}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="no_telephone" className={classes.label}>
                                    TELEPHONE
                                </InputLabel>
                                <TextField
                                    id="no_telephone"
                                    name="no_telephone"
                                    value={formik.values.no_telephone}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_code" className={classes.label}>
                                    COMPANY CODE
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="company_code"
                                    name="company_code"
                                    value={formik.values.company_code}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.company_code && formik.errors.company_code)}
                                    helperText={(formik.touched.company_code && formik.errors.company_code) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="company_name" className={classes.label}>
                                    COMPANY
                                    {' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <TextField
                                    id="company_name"
                                    name="company_name"
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.company_name && formik.errors.company_name)}
                                    helperText={(formik.touched.company_name && formik.errors.company_name) || ''}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter' && passwordError === '') {
                                            formik.handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button onClick={onClickSubmit} variant="contained" className={classes.btnLogin}>
                                    <span className={classes.btnLoginText}>SUBMIT REQUEST</span>
                                </Button>
                                <Typography variant="h6" className={classes.btnTextForgot}>
                                    <Link href="/login">
                                        <a>Back to Login Page</a>
                                    </Link>
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
