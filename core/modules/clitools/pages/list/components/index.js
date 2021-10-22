/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Paper from '@material-ui/core/Paper';
import clitoolsGqlService from '@modules/clitools/services/graphql';
import Header from '@modules/clitools/pages/list/components/Header';
import useStyles from '@modules/clitools/pages/list/components/style';

const clitoolsListContent = (props) => {
    const { data, loading, getQueueList, formik } = props;
    const queueList = (data && data.getQueueList && data.getQueueList.items) || [];
    const queueTotal = (data && data.getQueueList && data.getQueueList.total_count) || 0;
    const classes = useStyles();
    const [getIcubeCommandLineList, getIcubeCommandLineListRes] = clitoolsGqlService.getIcubeCommandLineList();

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true },
        { field: 'title', headerName: 'Title' },
        { field: 'status', headerName: 'Status', hideable: true },
        { field: 'created_at', headerName: 'Created At', hideable: true },
        { field: 'execute_at', headerName: 'Execute At', hideable: true },
        { field: 'finish_at', headerName: 'Finished At', hideable: true },
        { field: 'command', headerName: 'Command', hideable: true },
    ];

    const rows = queueList.map((queue) => ({
        ...queue,
        id: queue.id,
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
                            mode="lazy"
                            value={formik.values.id}
                            onChange={(e) => formik.setFieldValue('id', e)}
                            loading={getIcubeCommandLineListRes.loading}
                            options={
                                getIcubeCommandLineListRes
                                && getIcubeCommandLineListRes.data
                                && getIcubeCommandLineListRes.data.getIcubeCommandLineList
                            }
                            getOptions={getIcubeCommandLineList}
                            primaryKey="entity_id"
                            labelKey="title"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Additional Command</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="additional"
                            value={formik.values.additional}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.additional && formik.errors.additional)}
                            helperText={(formik.touched.additional && formik.errors.additional) || ''}
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
                getRows={getQueueList}
                loading={loading}
                columns={columns}
                count={queueTotal}
                hideActions
            />
        </>
    );
};

export default clitoolsListContent;
