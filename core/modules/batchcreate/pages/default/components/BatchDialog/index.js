import * as React from 'react';
// import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const BatchDialog = (props) => {
    const { open, handleClose } = props;

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Batch by Picker</DialogTitle>
                <DialogContent>content</DialogContent>
            </Dialog>
        </>
    );
};

export default BatchDialog;
