/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/marketplacebrand/pages/view/components/style';
import ErrorIcon from '@material-ui/icons/Error';

const AdminStoreEditContent = (props) => {
    const {
        formik,
        mpData,
        dataLocation,
        mpActive,
        setMpActive,
        handleDisconnect,
        handleReconnect,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const jdidUrl = 'https://channel.sirclo-integrations.com.dmmy.me/jdid?secret=eyJicmFuZF9pZCI6NDAyLCJkYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoifQ';
    const buttonCondition = (status) => {
        const button = {
            text: '',
            viewDetail: false,
            style: '',
        };
        switch (Number(status)) {
        case 0:
            button.text = 'Register';
            button.style = 'purple';
            break;
        case 1:
            button.text = 'Disconnect';
            button.viewDetail = true;
            button.style = 'orange';
            break;
        case 2:
            button.text = 'Connect Oauth';
            button.style = 'gray';
            break;
        default:
            button.text = 'Reconnect';
            button.viewDetail = true;
            button.style = 'blue';
            break;
        }
        return button;
    };

    const onChangeMp = (mp) => {
        let url = '';
        switch (Number(mp.status)) {
        case 0:
            formik.handleReset();
            setMpActive(mp);
            break;
        case 1:
            handleDisconnect(mp);
            break;
        case 2:
            url = mp.config.find((o) => (o.type === 'url'))?.value;
            if (url.length) {
                router.push(url);
            }
            break;
        default:
            handleReconnect(mp);
            break;
        }
    };

    const formComponents = () => mpActive.credentials.fields?.map((field) => (
        <div className={classes.formField}>
            <div className={classes.divLabel}>
                <span className={clsx(classes.label, classes.labelRequired)}>{field.description}</span>
            </div>
            <TextField
                className={classes.fieldRoot}
                variant="outlined"
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                error={!!(formik.errors[field.name])}
                helperText={(formik.errors[field.name]) || ''}
                InputProps={{
                    className: classes.fieldInput,
                }}
                required
            />
        </div>
    ));

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/configurations/marketplacebrand')}
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
            <h2 className={classes.titleTop}>View Brand</h2>
            <Paper className={classes.container}>
                {mpData?.marketplaces?.length
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>Connect to marketplace</h5>
                            <div className={classes.gridMp}>
                                {mpData.marketplaces.map((mp) => (
                                    <div className={classes.mp}>
                                        <div className={classes.mpImageContainer}>
                                            <img
                                                className={classes.mpImage}
                                                src={mp.image_url}
                                                alt={mp.marketplace_name}
                                                onError={(event) => event.target.style.display = 'none'}
                                            />
                                        </div>
                                        <br />
                                        {buttonCondition(mp.status).text
                                            && (
                                                <Button
                                                    className={
                                                        clsx(
                                                            classes.mpBtn,
                                                            mpActive.marketplace_name === mp.marketplace_name
                                                                ? 'gray' : buttonCondition(mp.status).style,
                                                        )
                                                    }
                                                    variant="contained"
                                                    onClick={() => onChangeMp(mp)}
                                                >
                                                    {buttonCondition(mp.status).text}
                                                </Button>
                                            )}
                                        {buttonCondition(mp.status).viewDetail
                                            && (
                                                <>
                                                    <br />
                                                    <div style={{ height: 10 }} />
                                                    <a
                                                        href={`
                                                        /configurations/marketplacebrand/view/${router?.query?.id}/mpdetail/${mp.store_detail_id}
                                                        `}
                                                        style={{ color: '#BE1F93' }}
                                                    >
                                                        View Detail
                                                    </a>
                                                </>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    : null}
                <br />
                {mpActive?.marketplace_name
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>{mpActive.marketplace_name}</h5>
                            {mpActive.marketplace_code === 'JDID' ? (
                                <div className={classes.warning}>
                                    <ErrorIcon />
                                    <div style={{ paddingLeft: 5 }}>
                                        Make sure you have registered the following url callbacks:
                                        {' '}
                                        <span style={{ fontWeight: 550 }}>
                                            {jdidUrl}
                                        </span>
                                        {' '}
                                        on your JD.id console. You can read more details
                                        {' '}
                                        <a href="https://help.sirclo.com/integrasi-dengan-jd-id-1" target="_blank" rel="noreferrer">Here</a>
                                    </div>
                                </div>
                            ) : null}
                            {mpActive.marketplace_code === 'TKPD' ? (
                                <div className={classes.warning}>
                                    <ErrorIcon />
                                    <div style={{ paddingLeft: 5 }}>
                                        If you are using your own FSID, please make sure to whitelist Sirclo IP Address.
                                    </div>
                                </div>
                            ) : null}
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>Location</span>
                                </div>
                                <Autocomplete
                                    multiple
                                    className={classes.autocompleteRoot}
                                    name="location"
                                    value={formik.values.location}
                                    onChange={(e) => formik.setFieldValue('location', e)}
                                    primaryKey="loc_id"
                                    labelKey="loc_name"
                                    options={dataLocation}
                                    error={!!(formik.touched.location && formik.errors.location)}
                                    helperText={(formik.touched.location && formik.errors.location) || ''}
                                    fullWidth
                                />
                            </div>
                            {formComponents()}
                            <div className={classes.formFieldButton}>
                                <Button
                                    className={classes.btn}
                                    onClick={formik.handleSubmit}
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    )
                    : null}
            </Paper>
        </>
    );
};

export default AdminStoreEditContent;
