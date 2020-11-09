/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import { removeToken } from '@modules/login/services/graphql';
import { removeIsLoginFlagging } from '@helper_auth';
import { useRouter } from 'next/router';

const RightToolbar = () => {
    const router = useRouter();
    const [removeCustomerToken] = removeToken();
    const handleLogout = () => {
        removeCustomerToken().then(() => {
            removeIsLoginFlagging();
            router.push('/login');
        }).catch(() => {

        });
    };

    return (
        <ul>
            <li>
                <IconButton aria-label="" color="inherit">
                    <Brightness2OutlinedIcon />
                </IconButton>
            </li>
            <li>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
            </li>
            <li>
                <a href="javascript:void(0);">
                    Username
                    <KeyboardArrowDownIcon style={{ verticalAlign: 'middle' }} />
                </a>
                <ul>
                    <li>
                        <a href="javascript:void(0);" onClick={handleLogout}>
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
                        padding: 5px 10px;
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
                        color: #000;
                        text-decoration: none;
                        white-space: nowrap;
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
