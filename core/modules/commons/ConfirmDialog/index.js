import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import propTypes from 'prop-types';

const ConfirmationDialog = ({
    open = false, handleYes, handleCancel, dialogTitle, dialogMessage,
}) => (
    <Dialog
        open={open}
        // onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {dialogMessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleYes} color="primary">
                OK
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    handleYes: propTypes.func.isRequired,
    handleCancel: propTypes.func.isRequired,
    dialogTitle: propTypes.string,
    dialogMessage: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    dialogTitle: 'Title',
    dialogMessage: 'Are you Sure ?',
};

export default ConfirmationDialog;
