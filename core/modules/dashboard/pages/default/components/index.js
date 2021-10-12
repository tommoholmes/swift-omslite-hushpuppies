/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint max-len: ["error", { "code": 200 }] */
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/default/components/style';
import loginGqlService from '@modules/login/services/graphql';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { useRouter } from 'next/router';

const DashboardContent = (props) => {
    const {
        summaryData,
        channelListData,
    } = props;
    const styles = useStyles();
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes
        && getCustomerRes.data
        && getCustomerRes.data.customer;
    const [username, setUsername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [customer_loc_code, setCustomerLocCode] = React.useState('');
    const handleSetUserInfo = (customer) => {
        const firstnameTemp = customer && customer.firstname;
        const lastnameTemp = customer && customer.lastname;
        const emailTemp = customer && customer.email;
        const customerLocCodeTemp = customer && customer.customer_loc_code;
        setUsername(`${firstnameTemp} ${lastnameTemp}`);
        setFirstname(`${firstnameTemp}`);
        setEmail(`${emailTemp}`);
        setCustomerLocCode(`${customerLocCodeTemp}`);
    };
    const limitString = (string, limit) => {
        return string.substring(0, limit);
    };
    const router = useRouter();

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUserInfo(Cookies.getJSON(custDataNameCookie));
        } else {
            getCustomer();
        }
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            Cookies.set(custDataNameCookie, getCustomerFromGql());
            handleSetUserInfo(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    const iconFilter = (framework, channel_code) => {
        if (framework === 'M1' || framework === 'M2') {
            return '/assets/img/dashboard/channel_official.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('bklp')) {
            return '/assets/img/dashboard/channel_bukalapak.svg';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('blib')) {
            return '/assets/img/dashboard/channel_blibli.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('jdid')) {
            return '/assets/img/dashboard/channel_jd.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('lzda')) {
            return '/assets/img/dashboard/channel_lazada.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('shpe')) {
            return '/assets/img/dashboard/channel_shopee.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('srcl')) {
            return '/assets/img/dashboard/channel_sirclo.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('tkpd')) {
            return '/assets/img/dashboard/channel_tokopedia.png';
        } if (framework === 'Marketplace' && channel_code.toLowerCase().includes('zlra')) {
            return '/assets/img/dashboard/channel_zalora.png';
        }
        return null;
    };

    return (
        <div className={clsx(styles.contentGrid)}>
            <div>
                <div className={clsx(styles.info, styles.welcomeUser)}>
                    <div className="title">
                        <span>
                            Hello
                            {' '}
                            {firstname}
                            ,
                            <br />
                            welcome to your dashboard!
                        </span>
                    </div>
                    <div className={styles.userWrapper}>
                        <div className={styles.user}>
                            <div className={styles.containerUser}>
                                <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/people.svg" />
                                <div className="user-text">
                                    <span className={styles.textName}>{username}</span>
                                    <br />
                                    <span>Store Manager</span>
                                    <br />
                                    <span>{email}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <span className={styles.textBold}>Location Code</span>
                            <br />
                            <span>
                                {limitString(customer_loc_code, 64)}
                                ...
                            </span>
                        </div>
                        <div className={styles.user}>
                            <span className={styles.textBold}>Channel Code</span>
                            <br />
                            <span>SWI,SWIPOS,Jubelio,TKPD,SHPE,LZDA</span>
                        </div>
                        <div className={styles.user}>
                            <a href="#" onClick={() => router.push('/useredit')}>Edit</a>
                        </div>
                    </div>

                </div>
                <div className={styles.info}>
                    <div className={styles.boxInfo}>
                        <h3 className={clsx('colorBlue', styles.noMargin)}>Order</h3>
                        <div className={styles.infoDetail}>
                            <span>
                                You have
                                <br />
                                <b>
                                    {summaryData.order_new}
                                    {' '}
                                    new order
                                </b>
                                {' '}
                                to confirm
                            </span>
                            <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_order.svg" />
                        </div>
                        <div className={styles.infoStatusWrapper}>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorBlue', styles.noMargin)}>{summaryData.order_no_allocation}</h2>
                                <span>No Allocation Order</span>
                            </div>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorBlue', styles.noMargin)}>{summaryData.order_failed}</h2>
                                <span>Failed Order</span>
                            </div>
                        </div>
                        <a className="link" href="#" onClick={() => router.push('/pickpack/batchlist')}>Manage Order</a>
                    </div>
                    <div className={styles.boxInfo}>
                        <h3 className={clsx('colorGreen', styles.noMargin)}>Shipment</h3>
                        <div className={styles.infoDetail}>
                            <span>
                                You have
                                <br />
                                <b>
                                    {' '}
                                    {summaryData.shipment_unconfirmed_total}
                                    {' '}
                                    orders to fullfill
                                </b>
                                {' '}
                                and
                                <br />
                                <b>
                                    {' '}
                                    {summaryData.shipment_cannot_fulfill}
                                    {' '}
                                    orders cannot fullfill
                                </b>
                            </span>
                            <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_shipment.svg" />
                        </div>
                        <div className={styles.infoStatusWrapper}>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_store_pickup}</h2>
                                <span>Store Pickup</span>
                            </div>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_home_delivery}</h2>
                                <span>Home Delivery</span>
                            </div>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_marketplace}</h2>
                                <span>Marketplace</span>
                            </div>
                        </div>
                        <a className="link" href="#" onClick={() => router.push('/sales/shipment')}>Manage Shipment</a>
                    </div>
                    <div className={styles.boxInfo}>
                        <h3 className={clsx('colorOrange', styles.noMargin)}>Return</h3>
                        <div className={styles.infoDetail}>
                            <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_return.svg" />
                        </div>
                        <div className={styles.infoStatusWrapper}>
                            <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                <h2 className={clsx('colorOrange', styles.noMargin)}>{summaryData.return_new}</h2>
                                <span>Request to Proceed</span>
                            </div>
                        </div>
                        <a className="link" href="#" onClick={() => router.push(' /sales/managerma')}>Manage Return</a>
                    </div>

                    <div className={styles.salesChannelTableWrapper}>
                        <h2>Sales Channel</h2>
                        <div className={styles.container}>
                            <table>
                                <thead>
                                    <tr>
                                        <td />
                                        <td>CHANNEL</td>
                                        <td>STORE NAME</td>
                                        <td>CODE</td>
                                        <td>VIRTUAL STOCK</td>
                                        <td>LOCATION</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {channelListData.map((e) => (
                                        <>
                                            <tr>
                                                <td className="channelIcon"><img className={styles.imageIcon} alt="" src={iconFilter(e.framework, e.channel_code)} /></td>
                                                <td>{e.channel_name}</td>
                                                <td>{e.channel_name}</td>
                                                <td>{e.channel_code}</td>
                                                {e.virtual_stock_list.length > 3
                                                    && (
                                                        <td>
                                                            {e.virtual_stock_list[0]}
                                                            {' '}
                                                            {e.virtual_stock_list[1]}
                                                            {' '}
                                                            {e.virtual_stock_list[2]}
                                                            ,
                                                            {' '}
                                                            <a className="link" href="#" onClick={() => router.push('/cataloginventory/virtualstock')}><u>see more...</u></a>
                                                        </td>
                                                    )}
                                                {e.virtual_stock_list.length <= 3
                                                    && (
                                                        <td>
                                                            {e.virtual_stock_list[0]}
                                                            {' '}
                                                            {e.virtual_stock_list[1]}
                                                            {' '}
                                                            {e.virtual_stock_list[2]}
                                                        </td>
                                                    )}

                                                {e.location_list.length > 3
                                                    && (
                                                        <td>
                                                            {e.location_list[0]}
                                                            {' '}
                                                            {e.location_list[1]}
                                                            {' '}
                                                            {e.location_list[2]}
                                                            ,
                                                            {' '}
                                                            <a className="link" href="#" onClick={() => router.push('/oms/location')}><u>see more...</u></a>
                                                        </td>
                                                    )}
                                                {e.location_list.length <= 3
                                                    && (
                                                        <td>
                                                            {e.location_list[0]}
                                                            {' '}
                                                            {e.location_list[1]}
                                                            {' '}
                                                            {e.location_list[2]}
                                                        </td>
                                                    )}
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
