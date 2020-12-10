/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Sidebar from './components/sidebar';
import useStyles from './style';
import Header from './components/header';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const { children, pageConfig } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const [activeParentMenu, setActiveParentMenu] = React.useState();
    const [activeChildMenu, setActiveChildMenu] = React.useState();

    const [state, setState] = useState({
        backdropLoader: false,
        toastMessage: {
            open: false,
            variant: '',
            text: '',
        },
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
                    open={open}
                    setOpen={setOpen}
                />
            )}
            {showSidebar() && (
                <Sidebar
                    activeParentMenu={activeParentMenu}
                    setActiveParentMenu={setActiveParentMenu}
                    activeChildMenu={activeChildMenu}
                    open={open}
                    menuList={menuList}
                />
            )}
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
