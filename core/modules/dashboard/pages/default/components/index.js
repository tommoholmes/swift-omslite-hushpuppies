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

    const chartData = [
        { month: 'January', value1: 2.525, value2: 6.127 },
        { month: 'March', value1: 3.018, value2: 5.310 },
        { month: 'May', value1: 3.682, value2: 4.440 },
        { month: 'July', value1: 4.440, value2: 3.682 },
        { month: 'September', value1: 5.310, value2: 3.018 },
        { month: 'November', value1: 6.127, value2: 2.525 },
    ];

    const data = [
        { argument: 1, value: 0 },
        { argument: 14, value: 0 },
        { argument: 15, value: 360000 },
        { argument: 16, value: 0 },
        { argument: 30, value: 0 },
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
            <div style={{
                margin: '15px 0px', padding: '16px 23px', background: '#FFFFFF', border: '1px solid #ECF0FB', borderRadius: 16,
            }}
            >
                <div style={{ fontSize: 24, color: '#BE1F93' }}>Sales Performance</div>
                <span>October 2020</span>
                <Chart
                    data={data}
                    chartType="line"
                    argumentField="argument"
                    seriesFields={[
                        { valueField: 'value', name: '', color: '#5719A0' },
                    ]}
                />
            </div>
            <div style={{
                margin: '15px 0px', padding: '16px 23px', background: '#FFFFFF', border: '1px solid #ECF0FB', borderRadius: 16,
            }}
            >
                <div style={{ fontSize: 24, color: '#BE1F93' }}>Sales Performance</div>
                <span>October 2020</span>
                <Chart
                    data={chartData}
                    chartType="line"
                    argumentField="month"
                    seriesFields={[
                        { valueField: 'value1', name: 'Total Order', color: '#efefef' },
                        { valueField: 'value2', name: 'Total Shipment', color: '#c9dde6' },
                    ]}
                />
            </div>
            <div style={{
                margin: '15px 0px', padding: '16px 23px', background: '#FFFFFF', border: '1px solid #ECF0FB', borderRadius: 16,
            }}
            >
                <div style={{ fontSize: 24, color: '#BE1F93' }}>Sales Performance</div>
                <span>October 2020</span>
                <Chart
                    data={chartData}
                    chartType="bar"
                    argumentField="month"
                    seriesFields={[
                        { valueField: 'value1', name: 'Total Order', color: '#efefef' },
                        { valueField: 'value2', name: 'Total Shipment', color: '#c9dde6' },
                    ]}
                />
            </div>
        </div>
    );
};

export default DashboardContent;
