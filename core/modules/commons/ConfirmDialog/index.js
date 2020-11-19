import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import propTypes from 'prop-types';

const ConfirmationDialog = (props) => {
    const {
        open = false, 
        onConfirm,
        onCancel,
        title,
        message,
    } = props;
    return (
        <Dialog
            open={open}
            // onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">
                    OK
                </Button>
                <Button onClick={onCancel} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    onConfirm: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired,
    title: propTypes.string,
    message: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    title: 'Confirmation',
    message: 'Are you Sure?',
};

export default ConfirmationDialog;