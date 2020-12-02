/* eslint-disable arrow-body-style */
import clsx from 'clsx';
import Chart from 'core/modules/commons/Chart';
import BorderLinearProgress from 'core/modules/commons/ProgressBar';
import useStyles from './style';

const DashboardContent = () => {
    const styles = useStyles();

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
            <div className={styles.info}>
                <div className={clsx(styles.boxInfo, styles.bgGradient)}>
                    <div className={styles.imgIcon}>
                        <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/incoming-order.svg" />
                    </div>
                    <div className={clsx(styles.total, styles.colorInGradient)}>97</div>
                    <div className={styles.titleInfo}>Incoming Order</div>
                </div>
                <div className={styles.boxInfo}>
                    <div className={styles.imgIcon}>
                        <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/failed-order.svg" />
                    </div>
                    <div className={styles.total}>36</div>
                    <div className={styles.titleInfo}>Failed Order</div>
                </div>
                <div className={styles.boxInfo}>
                    <div className={styles.imgIcon}>
                        <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/completed-order.svg" />
                    </div>
                    <div className={styles.total}>297</div>
                    <div className={styles.titleInfo}>Completed Order</div>
                </div>
                <div className={styles.boxInfo}>
                    <div className={styles.imgIcon}>
                        <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/lifetime-sales.svg" />
                    </div>
                    <div className={styles.total}>1119427</div>
                    <div className={styles.titleInfo}>Lifetime Sales</div>
                </div>
                <div className={styles.boxInfo}>
                    <div className={styles.imgIcon}>
                        <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/total-product.svg" />
                    </div>
                    <div className={styles.total}>947</div>
                    <div className={styles.titleInfo}>Total Product</div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.titleComponent}>Sales Performance</div>
                <span>October 2020</span>
                <Chart
                    data={data}
                    chartType="line"
                    argumentField="argument"
                    seriesFields={[
                        { valueField: 'value', name: 'Argument', color: '#5719A0' },
                    ]}
                />
            </div>
            <div className={styles.container}>
                <div className={styles.titleComponent}>Number of Orders</div>
                <span>October 2020</span>
                <Chart
                    data={data}
                    chartType="line"
                    argumentField="argument"
                    seriesFields={[
                        { valueField: 'value', name: 'Argument', color: '#5719A0' },
                    ]}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.columnLeft}>
                    <div className={styles.container}>
                        <div className={styles.titleComponent}>Geographical Area of Sales</div>
                        <span>October 2020</span>
                        <BorderLinearProgress variant="determinate" value={20} title="Bantul" total="254" />
                        <BorderLinearProgress variant="determinate" value={60} title="Denpasar" total="454" />
                        <BorderLinearProgress variant="determinate" value={45} title="Jakarta Barat" total="300" />
                        <BorderLinearProgress variant="determinate" value={80} title="Jakarta Selatan" total="624" />
                        <BorderLinearProgress variant="determinate" value={30} title="Surabaya" total="273" />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.titleComponent}>Best Performing Location</div>
                        <span>Sales Amount &amp; Orders 2020</span>
                        <BorderLinearProgress variant="determinate" value={20} title="Bantul" total="254" />
                        <BorderLinearProgress variant="determinate" value={60} title="Denpasar" total="454" />
                        <BorderLinearProgress variant="determinate" value={45} title="Jakarta Barat" total="300" />
                        <BorderLinearProgress variant="determinate" value={80} title="Jakarta Selatan" total="624" />
                        <BorderLinearProgress variant="determinate" value={30} title="Surabaya" total="273" />
                    </div>
                </div>
                <div className={styles.columnRight}>
                    <div className={styles.container}>
                        <div className={styles.titleComponent}>Sales Channel Order</div>
                        <span>October 2020</span>
                        <BorderLinearProgress variant="determinate" value={43} title="TADA Swift" total="102" />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.titleComponent}>Order VS Shipment</div>
                        <span>2020</span>
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
            </div>
        </div>
    );
};

export default DashboardContent;
