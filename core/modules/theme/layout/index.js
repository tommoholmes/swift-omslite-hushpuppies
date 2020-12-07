import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { useRouter } from 'next/router';
import Breadcrumb from '@common_breadcrumb';
import dynamic from 'next/dynamic';
import RightToolbar from './components/rightToolbar';
import useStyles from './style';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const { children, pageConfig } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(true);

    const [state, setState] = useState({
        backdropLoader: false,
        toastMessage: {
            open: false,
            variant: '',
            text: '',
        },
    });

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handelSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = handleLoader;
            window.toastMessage = handelSetToast;
        }
    }, []);

    const Header = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    className={clsx(classes.togleMenuButton)}
                >
                    {
                        open
                            ? <ChevronLeftIcon className={classes.togleMenuIcon} />
                            : <ChevronRightIcon className={classes.togleMenuIcon} />
                    }
                </IconButton>

                <Breadcrumb data={[
                    { url: '/', label: 'Home' },
                    { url: '/oms', label: 'OMS' },
                    { url: '/oms/channel', label: 'Channel' }]}
                />
                <RightToolbar />
            </Toolbar>
        </AppBar>
    );

    const Sidebar = () => {
        const [expandedMenu, setExpandedMenu] = React.useState();
        const menuList = [
            { key: 'dashboard', label: 'Dashboard', url: '/' },
            {
                key: 'oms',
                label: 'OMS',
                children: [
                    { key: 'channel', label: 'Channel', url: '/oms/channel' },
                    { key: 'company', label: 'Company', url: '/oms/company' },
                    { key: 'location', label: 'Location', url: '/oms/location' },
                    { key: 'source', label: 'Source', url: '/oms/source' },
                    { key: 'notification', label: 'Notification', url: '/oms/notification' },
                ],
            },
            {
                key: 'sales',
                label: 'Sales',
                children: [
                    { key: 'orderQueue', label: 'Order Queue' },
                    { key: 'shipment', label: 'Shipment' },
                ],
            },
            {
                key: 'catalogInventory',
                label: 'Catalog Inventory',
                children: [
                    { key: 'virtualstock', label: 'Virtual Stock', url: '/cataloginventory/virtualstock' },
                ],
            },
            {
                key: 'userData',
                label: 'User Data',
                children: [
                    { key: 'adminStore', label: 'Admin Store' },
                    { key: 'customerData', label: 'Customer Data' },
                ],
            },
        ];

        const handleClickParent = (menu) => {
            setExpandedMenu(menu);
            if (menu.url) router.push(menu.url);
        };
        const handleClickChild = (menu) => {
            if (menu.url) router.push(menu.url);
        };

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
                classes={{
                    paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
                }}
            >
                <div className={clsx(classes.toolbar, classes.swiftOmsLogo, open ? 'open' : 'close')}>
                    <img
                        alt=""
                        src={open ? '/assets/img/swiftoms_logo_expanded.png' : '/assets/img/swiftoms_logo_collapsed.png'}
                    />
                </div>
                <List className={clsx(classes.menuList, open ? 'open' : 'close')}>
                    {menuList.map((menu) => (
                        <div key={menu.key}>
                            <ListItem
                                button
                                className={clsx(classes.menuItem, open ? 'open' : 'close')}
                                onClick={() => handleClickParent(menu)}
                            >
                                <ListItemIcon>
                                    <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                            {menu && menu.children && menu.children.length && (
                                <Collapse in={expandedMenu && expandedMenu.key === menu.key} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.children.map((menuChild) => (
                                            <ListItem
                                                button
                                                key={menuChild.key}
                                                className={classes.menuChildItem}
                                                onClick={() => handleClickChild(menuChild)}
                                            >
                                                <ListItemText primary={menuChild.label} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
            </Drawer>
        );
    };

    const showHeader = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.header === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.header;
    };

    const showSidebar = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.sidebar === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.sidebar;
    };

    return (
        <div className={classes.root}>
            {showHeader() && Header()}
            {showSidebar() && Sidebar()}
            <main className={showHeader() ? classes.content : classes.contentNoHeader}>
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                <div className={showHeader() ? classes.toolbar : ''} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
