/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Table from '@common_table';
import Header from '@modules/irispayoutapproval/pages/list/components/Header';
import useStyles from '@modules/locationpriceupload/pages/list/components/style';
import TextField from '@common_textfield';
import dynamic from 'next/dynamic';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const VendorIrisPayoutApprovalContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVendorIrisPayoutApprovalList, vendorIrisPayoutApprove, vendorIrisPayoutReject } = props;
    const irisPayoutApprovalList = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.items) || [];
    const irisPayoutTotal = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'created_at', headerName: 'Created At', sortable: true, hideable: true },
        { field: 'updated_at', headerName: 'Updated At', hideable: true },
        { field: 'beneficiary_id ', headerName: 'Beneficiary Id', hideable: true },
        { field: 'no_reference', headerName: 'No Reference', hideable: true },
        { field: 'vendor_id', headerName: 'Vendor Id', hideable: true },
        { field: 'amount', headerName: 'Amount', hideable: true },
        { field: 'notes', headerName: 'Notes', hideable: true },
        { field: 'status', headerName: 'Status', hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'amount', name: 'amount_from', type: 'from', label: 'Amount From', initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Created At From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: 'Updated At From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'no_reference', name: 'no_reference', type: 'like', label: 'No Reference', initialValue: '' },
        { field: 'beneficiary_id', name: 'beneficiary_id', type: 'like', label: 'Beneficiary Id', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'amount', name: 'amount_to', type: 'to', label: 'Amount To', initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: 'Created At To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: 'Updated At To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'vendor_id', name: 'vendor_id', type: 'like', label: 'Vendor Id', initialValue: '' },
        { field: 'notes', name: 'notes', type: 'like', label: 'Notes', initialValue: '' },
        { field: 'status', name: 'status', type: 'like', label: 'Status', initialValue: '' },
    ];

    const rows = irisPayoutApprovalList.map((irisPayout) => ({
        ...irisPayout,
        id: irisPayout.entity_id,
    }));

    const [toastMessage, setToastMessage] = useState({
        open: false,
        variant: '',
        text: '',
        htmlMessage: '',
    });

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorIrisPayoutApprovalList}
                // deleteRows={vendorIrisPayoutReject}
                loading={loading}
                columns={columns}
                count={irisPayoutTotal}
                showCheckbox
                actions={[
                    {
                        label: 'Approve',
                        message: 'Are you sure you want to approve?',
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                                const res = await vendorIrisPayoutApprove({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutApprove && res.data.vendorIrisPayoutApprove.error) {
                                    throw new Error(res.data.vendorIrisPayoutApprove.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: 'Approve success!',
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                    {
                        label: 'Reject',
                        message: 'Are you sure you want to Reject?',
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                                const res = await vendorIrisPayoutReject({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutReject && res.data.vendorIrisPayoutReject.error) {
                                    throw new Error(res.data.vendorIrisPayoutReject.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: 'Reject success!',
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                ]}
            />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
                htmlMessage={toastMessage.htmlMessage}
                autoHideDuration={5000}
            />
        </>
    );
};

export default VendorIrisPayoutApprovalContent;
