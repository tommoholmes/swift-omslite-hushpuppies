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
            <h2>Dashboard Content</h2>
            <div>
                <Button onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Button buttonType="primary" onClick={handleClickOpen} style={{ marginLeft: 5 }}>
                    buttonType: container
                </Button>
                <Button buttonType="primary-rounded" onClick={handleClickOpen} style={{ marginLeft: 5 }}>
                    buttonType: primary
                </Button>
                <Button buttonType="outlined" onClick={handleClickOpen} style={{ marginLeft: 5 }}>
                    buttonType: outlined
                </Button>
                <Button buttonType="outlined-rounded" onClick={handleClickOpen} style={{ marginLeft: 5 }}>
                    buttonType: outlined
                </Button>
                <Button buttonType="buttonText" onClick={handleClickOpen}>
                    buttonType: buttonText
                </Button>
                <Button buttonType="link" onClick={handleClickOpen}>
                    buttonType: link
                </Button>
            </div>
            <ConfirmationDelete
                open={open}
                onCancel={handleClose}
                onConfirm={handleAgree}
            />
        </div>
    );
};

export default DashboardContent;
