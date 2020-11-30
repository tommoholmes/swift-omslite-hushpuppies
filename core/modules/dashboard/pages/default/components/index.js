/* eslint-disable arrow-body-style */
import ConfirmationDelete from 'core/modules/commons/ConfirmDialog';
import Button from '@common_button';
import Chart from 'core/modules/commons/Chart';

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

    const data = [
        { argument: 1, value: 0 },
        { argument: 14, value: 0 },
        { argument: 15, value: 360000 },
        { argument: 16, value: 0 },
        { argument: 30, value: 0 },
    ];

    const bardata = [
        { month: 'January', value: 2.525, value1: 6.127 },
        { month: 'March', value: 3.018, value1: 5.310 },
        { month: 'May', value: 3.682, value1: 4.440 },
        { month: 'July', value: 4.440, value1: 3.682 },
        { month: 'September', value: 5.310, value1: 3.018 },
        { month: 'November', value: 6.127, value1: 2.525 },
    ];

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
            <div style={{ margin: '15px 0px', padding: '16px 23px', background: '#FFFFFF', border: '1px solid #ECF0FB', borderRadius: 16 }}>
                <div style={{ fontSize: 24, color: '#BE1F93' }}>Sales Performance</div>
                <span>October 2020</span>
                <Chart
                    data={bardata}
                    chartType="line"
                />
            </div>
        </div>
    );
};

export default DashboardContent;
