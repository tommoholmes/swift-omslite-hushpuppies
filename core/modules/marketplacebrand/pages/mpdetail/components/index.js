/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/marketplacebrand/pages/mpdetail/components/style';

const AdminStoreCreateContent = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/configurations/marketplacebrand/view/${router?.query?.id}`)}
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
            <h2 className={classes.titleTop}>Manage Marketplace</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {data.map((field) => (
                        <div className={classes.formField} key={field.id}>
                            <div className={classes.divLabel}>
                                <span className={clsx(classes.label, classes.labelRequired)}>{field.type.split('_').join(' ')}</span>
                            </div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name={field.type}
                                value={field.value}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
};

export default AdminStoreCreateContent;
