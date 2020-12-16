/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Breadcrumb from '@common_breadcrumb';
import Hidden from '@material-ui/core/Hidden';
import Sidebar from './components/sidebar';
import useStyles from './style';
import Header from './components/header';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const { children, pageConfig } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [activeParentMenu, setActiveParentMenu] = React.useState();
    const [activeChildMenu, setActiveChildMenu] = React.useState();
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });

    const menuList = [
        { key: 'dashboard', label: 'Dashboard', url: '/' },
        {
            key: 'oms',
            label: 'OMS',
            children: [
                { key: 'channel', label: 'Channel', url: '/oms/channel' },
                { key: 'company', label: 'Company', url: '/oms/company' },
                { key: 'location', label: 'Location', url: '/oms/location' },
                { key: 'prioritylocation', label: 'Priority Location', url: '/oms/prioritylocation' },
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
    const mappedMenuList = menuList.reduce((accumulator, parent) => {
        const parentBreadcrumb = { url: parent.url || '', label: parent.label };
        const mappedParent = {
            key: parent.key,
            url: parent.url || '',
            breadcrumb: [parentBreadcrumb],
        };
        accumulator.push(mappedParent);
        if (parent && parent.children && parent.children.length) {
            const mappedChildren = parent.children.map((child) => {
                const childBreadcrumb = [parentBreadcrumb, { url: child.url || '', label: child.label }];
                return {
                    key: child.key,
                    url: child.url || '',
                    parentKey: parent.key,
                    breadcrumb: childBreadcrumb,
                };
            });
            accumulator = [...accumulator, ...mappedChildren];
        }
        return accumulator;
    }, []);

    const getBreadcrumbData = () => {
        const activeMenu = mappedMenuList.find((e) => e.url === router.pathname);
        const activeMenuBreadcrumb = (activeMenu && activeMenu.breadcrumb) || [];
        return [{ url: '/', label: 'Home' }, ...activeMenuBreadcrumb];
    };

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = setBackdropLoader;
            window.toastMessage = setToastMessage;
            if (window.innerWidth >= 768) setOpen(true);
        }
    }, []);

    useEffect(() => {
        const activeMenu = mappedMenuList.find((e) => e.url === (router && router.pathname));
        if (activeMenu && activeMenu.parentKey) {
            setActiveChildMenu(activeMenu);
            setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenu.parentKey));
        } else {
            setActiveParentMenu(activeMenu);
        }
    }, [router]);

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
            {showHeader() && (
                <Header
                    mappedMenuList={mappedMenuList}
                    breadcrumbData={getBreadcrumbData()}
                    open={open}
                    setOpen={setOpen}
                />
            )}
            {showSidebar() && (
                <Sidebar
                    activeParentMenu={activeParentMenu}
                    setActiveParentMenu={setActiveParentMenu}
                    activeChildMenu={activeChildMenu}
                    setActiveChildMenu={setActiveChildMenu}
                    open={open}
                    setOpen={setOpen}
                    menuList={menuList}
                />
            )}
            <main className={showHeader() ? classes.content : classes.contentNoHeader}>
                <Loading open={backdropLoader} />
                <Message
                    open={toastMessage.open}
                    variant={toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={toastMessage.text}
                />
                {/* necessary for content to be below app bar */}
                <div className={showHeader() ? classes.toolbar : ''} />
                {showHeader() && (
                    <Hidden smUp implementation="css">
                        <Breadcrumb data={getBreadcrumbData()} />
                    </Hidden>
                )}
                {children}
            </main>
        </div>
    );
};

export default Layout;
