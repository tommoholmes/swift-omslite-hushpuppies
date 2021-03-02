/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { optionsCommand } from '@modules/clitools/helpers';
import Header from './Header';
import useStyles from './style';

const clitoolsListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany, formik } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;
    const classes = useStyles();
    const router = useRouter();

    const columns = [
        { field: 'company_id', headerName: 'ID', sortable: true },
        { field: 'company_code', headerName: 'Title' },
        { field: 'company_code', headerName: 'Status', hideable: true },
        { field: 'company_code', headerName: 'Created At', hideable: true },
        { field: 'company_code', headerName: 'Execute At', hideable: true },
        { field: 'company_code', headerName: 'Finished At', hideable: true },
        { field: 'company_code', headerName: 'Command', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
    }));

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>Manually Run Command</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Command Name</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.name}
                            onChange={(e) => formik.setFieldValue('name', e)}
                            options={optionsCommand}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Additional Command</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Add Command
                    </Button>
                </div>
            </Paper>
            <Table
                rows={rows}
                getRows={getCompanyList}
                deleteRows={multideleteCompany}
                loading={loading}
                columns={columns}
                count={companyTotal}
                showCheckbox
            />
        </>
    );
};

export default clitoolsListContent;
