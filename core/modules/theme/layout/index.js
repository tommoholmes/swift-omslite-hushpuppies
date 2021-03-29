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
                { key: 'notification', label: 'Notification', url: '/oms/notification' },
            ],
        },
        {
            key: 'sales',
            label: 'Sales',
            children: [
                { key: 'orderQueue', label: 'Order Queue', url: '/sales/orderqueue' },
                { key: 'shipment', label: 'Shipment', url: '/sales/shipment' },
                { key: 'orderreallocation', label: 'Order Reallocation', url: '/sales/orderreallocation' },
                { key: 'creditmemos', label: 'Credit Memos', url: '/sales/creditmemos' },
                { key: 'managerma', label: 'Manage RMA', url: '/sales/managerma' },
                { key: 'rmastatuses', label: 'RMA Statuses', url: '/sales/rmastatuses' },
            ],
        },
        {
            key: 'catalogInventory',
            label: 'Catalog Inventory',
            children: [
                { key: 'productList', label: 'Product List', url: '/cataloginventory/productlist' },
                { key: 'source', label: 'Source', url: '/cataloginventory/source' },
                { key: 'virtualLocationInventory', label: 'Virtual Location Inventory', url: '/cataloginventory/virtuallocationinventory' },
                { key: 'virtualStock', label: 'Virtual Stock', url: '/cataloginventory/virtualstock' },
                { key: 'virtualStockQuantity', label: 'Virtual Stock Quantity', url: '/cataloginventory/virtualstockquantity' },
                { key: 'stockTransfer', label: 'Stock Transfer', url: '/cataloginventory/stocktransfer' },
                { key: 'locationPriceUpload', label: 'Location Price Upload', url: '/cataloginventory/locationpriceupload' },
                { key: 'updateStockByFileHistory', label: 'Update Stock by File History', url: '/cataloginventory/updatestockbyfilehistory' },
            ],
        },
        {
            key: 'userData',
            label: 'User Data',
            children: [
                { key: 'adminStore', label: 'Admin Store', url: '/userdata/adminstore' },
            ],
        },
        {
            key: 'marketplace',
            label: 'Marketplace',
            children: [
                { key: 'marketPlace', label: 'Marketplace', url: '/marketplace/marketplace' },
                { key: 'store', label: 'Store', url: '/marketplace/store' },
                { key: 'warehouse', label: 'Warehouse', url: '/marketplace/warehouse' },
                { key: 'productCategory', label: 'Product Category', url: '/marketplace/productcategory' },
                { key: 'attributeSetmapping', label: 'Attribute Set Mapping', url: '/marketplace/attributesetmapping' },
                { key: 'productAttributeMapping', label: 'Product Attribute Mapping', url: '/marketplace/productattributemapping' },
                { key: 'productStatus', label: 'Product Status', url: '/marketplace/productstatus' },
                { key: 'updateStockHistory', label: 'Update Stock History', url: '/marketplace/updatestockhistory' },
            ],
        },
        {
            key: 'tada',
            label: 'TADA',
            children: [
                { key: 'tadaCategory', label: 'Tada Category', url: '/tada/tadacategory' },
                { key: 'configuration', label: 'Configuration', url: '/tada/configuration' },
                { key: 'shippingCompany', label: 'Shipping Company', url: '/tada/shippingcompany' },
            ],
        },
        {
            key: 'vendorPortal',
            label: 'Vendor Portal',
            children: [
                { key: 'requestVendor', label: 'Request Vendor', url: '/vendorportal/requestvendor' },
                { key: 'managevendor', label: 'Manage Vendor', url: '/vendorportal/managevendor' },
                { key: 'productUploadMaster', label: 'Product Upload Master', url: '/vendorportal/productuploadmaster' },
                { key: 'productApproval', label: 'Product Approval', url: '/vendorportal/productapproval' },
            ],
        },
        {
            key: 'reports',
            label: 'Reports',
            children: [
                { key: 'orderReport', label: 'Order Report', url: '/reports/orderreport' },
                { key: 'salesOrder', label: 'Sales Order', url: '/reports/salesorder' },
                { key: 'salesOverview', label: 'Sales Overview', url: '/reports/salesoverview' },
                { key: 'productPerformance', label: 'Product Performance', url: '/reports/productperformance' },
                { key: 'salesByPaymentType', label: 'Sales By Payment Type', url: '/reports/salesbypaymenttype' },
                { key: 'salesByShippingType', label: 'Sales by Shipping Type', url: '/reports/salesbyshippingtype' },
                { key: 'top10BestPerformingSkus', label: 'Top 10 Best Performing SKUs', url: '/reports/bestperformingskus' },
            ],
        },
        {
            key: 'configurations',
            label: 'Configurations',
            children: [
                { key: 'integrations', label: 'Integrations', url: '/configurations/integrations' },
                { key: 'shipments', label: 'Shipments', url: '/configurations/shipments' },
            ],
        },
        {
            key: 'tools',
            label: 'Tools',
            children: [
                { key: 'clitools', label: 'CLI Tools', url: '/tools/clitools' },
                { key: 'history', label: 'History', url: '/tools/history' },
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
