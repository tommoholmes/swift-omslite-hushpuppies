/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/logistixprovider/pages/edit/components/style';

const LogistixProviderContent = (props) => {
    const {
        logistixDetail,
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/configurations/logistixprovider')}
                variant="contained"
                style={{ marginRight: 10 }}
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
            <h2 className={classes.titleTop}>
                {`Logistix Provider #${logistixDetail.entity_id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>Channel Shipping Method</th>
                                <th className={classes.th} />
                                <th className={classes.th}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="channel_shipping_method"
                                        value={formik.values.channel_shipping_method}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.channel_shipping_method && formik.errors.channel_shipping_method)}
                                        helperText={(formik.touched.channel_shipping_method && formik.errors.channel_shipping_method) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </th>
                            </tr>

                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>Provider</th>
                                <th className={classes.th} />
                                <th className={classes.th}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="provider"
                                        value={formik.values.provider}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.provider && formik.errors.provider)}
                                        helperText={(formik.touched.provider && formik.errors.provider) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </th>
                            </tr>

                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>Service</th>
                                <th className={classes.th} />
                                <th className={classes.th}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="service"
                                        value={formik.values.service}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.service && formik.errors.service)}
                                        helperText={(formik.touched.service && formik.errors.service) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        type="submit"
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default LogistixProviderContent;
