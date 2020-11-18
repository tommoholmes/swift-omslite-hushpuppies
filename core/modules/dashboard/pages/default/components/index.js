/* eslint-disable arrow-body-style */
import ConfirmationDelete from 'core/modules/commons/ConfirmDialog';
import Button from '@common_button';

const DashboardContent = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        console.log('I agree!');
        setOpen(false);
    };

    return (
        <div>
            Dashboard Content
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <ConfirmationDelete
                open={open}
                onCancel={handleClose}
                onConfirm={handleAgree}
            />
        </div>
    );
};

export default DashboardContent;
