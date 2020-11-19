/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import loginGqlService from '@modules/login/services/graphql';
import { removeIsLoginFlagging } from '@helper_auth';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles(() => ({
    badge: {
        right: 5,
        top: 3,
        padding: '0 4px',
        background: '#BE1F93',
    },
}))(Badge);

const RightToolbar = () => {
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes
        && getCustomerRes.data
        && getCustomerRes.data.customer;
    const [username, setUsername] = React.useState('');
    const handleSetUsername = (customer) => {
        const firstname = customer && customer.firstname;
        const lastname = customer && customer.lastname;
        setUsername(`${firstname} ${lastname}`);
    };

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUsername(Cookies.getJSON(custDataNameCookie));
        } else {
            getCustomer();
        }
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            Cookies.set(custDataNameCookie, getCustomerFromGql());
            handleSetUsername(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    const handleLogout = () => {
        removeCustomerToken().then(() => {
            removeIsLoginFlagging();
            Cookies.remove(custDataNameCookie);
            router.push('/login');
        }).catch(() => {

        });
    };

    return (
        <ul>
            <li>
                <IconButton style={{ padding: 0 }} aria-label="" color="inherit">
                    <img alt="" src="/assets/img/layout/moon.svg" />
                </IconButton>
            </li>
            <li>
                <IconButton style={{ padding: 0 }} aria-label="show 17 new notifications" color="inherit">
                    <StyledBadge badgeContent={17} color="secondary">
                        <img alt="" src="/assets/img/layout/notification.svg" />
                    </StyledBadge>
                </IconButton>
            </li>
            <li>
                <a href="#">
                    {username}
                    <KeyboardArrowDownIcon style={{ verticalAlign: 'middle', marginLeft: 5 }} />
                </a>
                <ul>
                    <li>
                        <a href="#" onClick={handleLogout}>
                            Sign Out
                        </a>
                    </li>
                </ul>
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        text-transform: uppercase;
                        font-family: Montserrat !important;
                        position: fixed;
                        right: 12px;
                    }
                    li {
                        display: inline-block;
                        padding: 5px 12px;
                        position: relative;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        right: 0;
                    }
                    ul ul li {
                        display: block;
                    }
                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: #536777;
                        text-decoration: none;
                        white-space: nowrap;
                        font-size: 14px;
                        text-transform: capitalize;
                    }
                    a:hover {
                        border-bottom: 1px dashed #fff;
                        color: #b9acac;
                    }
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
