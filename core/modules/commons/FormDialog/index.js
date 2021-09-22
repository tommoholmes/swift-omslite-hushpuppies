import * as React from 'react';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@common_formdialog/style';

const FormDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const {
        labelButton = 'View',
        classButton = 'btnFormDialog',
        titleDialog,
        message,
    } = props;
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} className={classButton}>
                {labelButton}
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.wrapperDialog}>
                <DialogTitle>
                    {titleDialog}
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormDialog;
