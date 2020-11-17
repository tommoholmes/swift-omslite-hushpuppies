/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from './style';

const CompanyCreateContent = (props) => {
    const {
        code,
        setCode,
        name,
        setName,
        handleSubmit,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.title}>Create Company</h2>
            <Paper className={classes.container}>
                <div className={classes.formField}>
                    <TextField
                        variant="outlined"
                        name="code"
                        label="Company Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className={classes.formField}>
                    <TextField
                        variant="outlined"
                        name="name"
                        label="Company Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={classes.formField}>
                    <Button
                        onClick={() => router.push('/oms/company')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CompanyCreateContent;
