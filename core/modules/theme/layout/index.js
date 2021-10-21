/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import Breadcrumb from '@common_breadcrumb';
import Hidden from '@material-ui/core/Hidden';
import Sidebar from '@modules/theme/layout/components/sidebar';
import useStyles from '@modules/theme/layout/style';
import Header from '@modules/theme/layout/components/header';
import gqlService from '@modules/theme/services/graphql';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const { children, pageConfig, useBreadcrumbs = true } = props;
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

    const dataAcl = [];
    const varianAcl = () => {
        const { loading, data } = gqlService.customerAccessControlList();
        if (loading) {
            return (
                <>Loading...</>
            );
        }

        if (!data) {
            return (
                <>Data not found!</>
            );
        }
        dataAcl.push(
            data.customerAccessControlList,
        );
    };

    const menuList = [
        { key: 'dashboard', label: 'Dashboard', url: '/' },
        {
            aclCode: 'oms_lite_header_sales',
            key: 'order',
            label: 'Order',
            children: [
                {
                    aclCode: 'oms_lite_sales_order_queue', key: 'orderqueue', label: 'All Orders', url: '/sales/orderqueue',
                },
                // { aclCode: 'orderreallocation', label: 'Order Reallocation', url: '/sales/orderreallocation' },
            ],
        },
        {
            aclCode: 'header_pick_pack',
            key: 'pickpack',
            label: 'Pick and Pack',
            children: [
                {
                    aclCode: 'pick_by_wave_list', key: 'wavelist', label: 'Pick List', url: '/pickpack/wavelist',
                },
                {
                    aclCode: 'pick_by_wave_create', key: 'wavecreate', label: 'Create Pick by Wave', url: '/pickpack/wavecreate',
                },
                {
                    aclCode: 'pick_by_wave_packlist', key: 'wavepack', label: 'Pack List', url: '/pickpack/wavepack',
                },
                {
                    aclCode: 'pick_by_batch_list', key: 'batchlist', label: 'Batch List', url: '/pickpack/batchlist',
                },
                {
                    aclCode: 'pick_by_batch_create', key: 'batchcreate', label: 'Create Pick By Batch', url: '/pickpack/batchcreate',
                },
                {
                    aclCode: 'pick_by_batch_packlist', key: 'batchpack', label: 'Pack List', url: '/pickpack/batchpack',
                },
            ],
        },
        {
            aclCode: 'header_shipment',
            key: 'shipment',
            label: 'Shipment',
            children: [
                {
                    aclCode: 'oms_lite_sales_shipment', key: 'allshipment', label: 'All Shipment', url: '/sales/shipment',
                },
                {
                    aclCode: 'shipment_pickup_dashboard', key: 'storepickup', label: 'Store Pickup', url: '/shipment/storepickup',
                },
                {
                    aclCode: 'shipment_curbside_pickup', key: 'curbpickup', label: 'Curb Pickup', url: '/shipment/curbpickup',
                },
                {
                    aclCode: 'shipment_delivery_dashboard', key: 'homedelivery', label: 'Home Delivery', url: '/shipment/homedelivery',
                },
                {
                    aclCode: 'shipment_marketplace_dashboard', key: 'shipmentmarketplace', label: 'Marketplace', url: '/shipment/shipmentmarketplace',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_sales',
            key: 'salesreturn',
            label: 'Return',
            children: [
                {
                    aclCode: 'oms_lite_credit_memos', key: 'creditmemos', label: 'Credit Memos', url: '/sales/creditmemos',
                },
                {
                    aclCode: 'oms_lite_rma_manage', key: 'managerma', label: 'Manage RMA', url: '/sales/managerma',
                },
                {
                    aclCode: 'oms_lite_rma_statuses', key: 'rmastatuses', label: 'RMA Statuses', url: '/sales/rmastatuses',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_catalog_inventory',
            key: 'inventory',
            label: 'Inventory',
            children: [
                {
                    aclCode: 'oms_lite_product_list', key: 'productlist', label: 'Products', url: '/cataloginventory/productlist',
                },
                {
                    aclCode: 'oms_lite_source', key: 'source', label: 'Manage Source', url: '/cataloginventory/source',
                },
                {
                    aclCode: 'oms_lite_override_stock', key: 'overridestock', label: 'Override Stock', url: '/cataloginventory/overridestock',
                },
                {
                    aclCode: 'oms_lite_stock_transfer', key: 'stocktransfer', label: 'Stock Transfer', url: '/cataloginventory/stocktransfer',
                },
                {
                    aclCode: 'oms_lite_location_price_upload', key: 'locationpriceupload', label: 'Price by Location', url: '/cataloginventory/locationpriceupload/import',
                },
                {
                    aclCode: 'oms_lite_tools_history', key: 'toolshistory', label: 'Update Stock History', url: '/tools/history',
                },
                {
                    aclCode: 'oms_lite_stock_history', key: 'updatestockbyfilehistory', label: 'Update Stock by File History', url: '/cataloginventory/updatestockbyfilehistory',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_oms',
            key: 'oms',
            label: 'OMS',
            children: [
                {
                    aclCode: 'oms_lite_company', key: 'company', label: 'Company', url: '/oms/company',
                },
                {
                    aclCode: 'oms_lite_channel', key: 'channel', label: 'Channel', url: '/oms/channel',
                },
                {
                    aclCode: 'oms_lite_virtual_stock', key: 'virtualstock', label: 'Virtual Stock', url: '/cataloginventory/virtualstock',
                },
                {
                    aclCode: 'oms_lite_location', key: 'location', label: 'Location', url: '/oms/location',
                },
                {
                    aclCode: 'oms_lite_location_pickup', key: 'locationpickup', label: 'Location Pickup', url: '/oms/locationpickup',
                },
                {
                    aclCode: 'oms_lite_virtual_location', key: 'virtuallocationinventory', label: 'Virtual Location', url: '/cataloginventory/virtuallocationinventory',
                },
                {
                    aclCode: 'oms_lite_priority_location_by_city', key: 'prioritylocation', label: 'Priority Location', url: '/oms/prioritylocation',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_marketplace',
            key: 'marketplace',
            label: 'Marketplace',
            children: [
                {
                    aclCode: 'oms_lite_marketplace', key: 'marketplaces', label: 'Marketplace', url: '/marketplace/marketplace',
                },
                {
                    aclCode: 'oms_lite_marketplace_store', key: 'store', label: 'Store', url: '/marketplace/store',
                },
                {
                    aclCode: 'oms_lite_marketplace_warehouse', key: 'warehouse', label: 'Warehouse', url: '/marketplace/warehouse',
                },
                {
                    aclCode: 'oms_lite_marketplace_product_categories', key: 'productcategory', label: 'Product Category', url: '/marketplace/productcategory',
                },
                {
                    aclCode: 'oms_lite_marketplace_attribute_set_mapping', key: 'attributesetmapping', label: 'Attribute Set Mapping', url: '/marketplace/attributesetmapping',
                },
                {
                    aclCode: 'oms_lite_mapping_product_attribute', key: 'productattributemapping', label: 'Product Attribute Mapping', url: '/marketplace/productattributemapping',
                },
                {
                    aclCode: 'oms_lite_marketplace_product_status', key: 'productstatus', label: 'Product Status', url: '/marketplace/productstatus',
                },
                {
                    aclCode: 'oms_lite_marketplace_update_stock_history', key: 'updatestockhistory', label: 'Update Stock History', url: '/marketplace/updatestockhistory',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_vendor_portal',
            key: 'vendor',
            label: 'Vendor',
            children: [
                {
                    aclCode: 'requestVendor', key: 'requestvendor', label: 'Request Vendor', url: '/vendorportal/requestvendor',
                },
                {
                    aclCode: 'manageVendor', key: 'managevendor', label: 'Manage Vendor', url: '/vendorportal/managevendor',
                },
                {
                    aclCode: 'categoryUpload', key: 'categoryupload', label: 'Category Upload', url: '/vendorportal/categoryupload',
                },
                {
                    aclCode: 'productUploadMaster', key: 'productuploadmaster', label: 'Product Upload Master', url: '/vendorportal/productuploadmaster',
                },
                {
                    aclCode: 'productApproval', key: 'productapproval', label: 'Product Approval', url: '/vendorportal/productapproval',
                },
                {
                    aclCode: 'irisPayoutApproval', key: 'irispayoutapproval', label: 'Iris Payout Approval', url: '/vendorportal/irispayoutapproval',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_tada',
            key: 'tada',
            label: 'TADA',
            children: [
                {
                    aclCode: 'oms_lite_tada_category', key: 'tadacategory', label: 'Tada Category', url: '/tada/tadacategory',
                },
                {
                    aclCode: 'oms_lite_tada_config', key: 'configuration', label: 'Configuration', url: '/tada/configuration',
                },
                {
                    aclCode: 'oms_lite_tada_shipping_company', key: 'shippingcompany', label: 'Shipping Company', url: '/tada/shippingcompany',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_reports',
            key: 'reports',
            label: 'Report',
            children: [
                {
                    aclCode: 'oms_lite_reports_sales_order', key: 'salesorder', label: 'Sales Order', url: '/reports/salesorder',
                },
                {
                    aclCode: 'oms_lite_reports_sales_overview', key: 'salesoverview', label: 'Sales Overview', url: '/reports/salesoverview',
                },
                {
                    aclCode: 'oms_lite_reports_product_performance', key: 'productperformance', label: 'Product Performance', url: '/reports/productperformance',
                },
                {
                    aclCode: 'oms_lite_reports_sales_by_payment', key: 'salesbypaymenttype', label: 'Sales By Payment Type', url: '/reports/salesbypaymenttype',
                },
                {
                    aclCode: 'oms_lite_reports_sales_by_shipping', key: 'salesbyshippingtype', label: 'Sales by Shipping Type', url: '/reports/salesbyshippingtype',
                },
                {
                    aclCode: 'oms_lite_reports_best_sku', key: 'bestperformingskus', label: 'Top 10 Best Performing SKUs', url: '/reports/bestperformingskus',
                },
                // { aclCode: 'orderReport', label: 'Order Report', url: '/reports/orderreport' },
            ],
        },
        {
            aclCode: 'oms_lite_header_configurations',
            key: 'configurations',
            label: 'Configurations',
            children: [
                {
                    aclCode: 'oms_lite_config_integrations', key: 'integrations', label: 'Integrations', url: '/configurations/integrations',
                },
                {
                    aclCode: 'oms_lite_config_shipments', key: 'shipments', label: 'Shipments', url: '/configurations/shipments',
                },
                {
                    aclCode: 'oms_lite_logistix_provider', key: 'logistixprovider', label: 'Logistix Provider', url: '/configurations/logistixprovider',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_tools',
            key: 'tools',
            label: 'Tools',
            children: [
                {
                    aclCode: 'oms_lite_tools_cli', key: 'clitools', label: 'CLI Tools', url: '/tools/clitools',
                },
                {
                    aclCode: 'oms_lite_notification', key: 'notification', label: 'Notification', url: '/oms/notification',
                },
            ],
        },
        {
            aclCode: 'oms_lite_header_user_data',
            key: 'userData',
            label: 'User',
            children: [
                {
                    aclCode: 'oms_lite_admin_store', key: 'adminstore', label: 'All Users', url: '/userdata/adminstore',
                },
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

    const removeLastPathOnUrl = (url) => {
        const output = url.split('/').slice(0, 3).join('/');
        return output;
    };

    useEffect(() => {
        const activeMenuFirstChild = mappedMenuList.find((e) => e.url === (router && router.pathname));

        if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
            if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
                setActiveChildMenu(activeMenuFirstChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuFirstChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuFirstChild);
            }
        } else {
            let activeMenuSecondChild = null;

            for (let i = 0; i < mappedMenuList.length; i += 1) {
                if (mappedMenuList[i].url.includes(removeLastPathOnUrl((router && router.pathname)))) {
                    activeMenuSecondChild = mappedMenuList[i];
                    break;
                }
            }

            if (activeMenuSecondChild && activeMenuSecondChild.parentKey) {
                setActiveChildMenu(activeMenuSecondChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuSecondChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuSecondChild);
            }
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
                <>
                    <Sidebar
                        activeParentMenu={activeParentMenu}
                        setActiveParentMenu={setActiveParentMenu}
                        activeChildMenu={activeChildMenu}
                        setActiveChildMenu={setActiveChildMenu}
                        open={open}
                        setOpen={setOpen}
                        menuList={menuList}
                        aclDetail={dataAcl}
                    >
                        {varianAcl()}
                    </Sidebar>
                </>
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
                {showHeader() && useBreadcrumbs && (
                    <Hidden smUp implementation="css">
                        {/* <Breadcrumb data={getBreadcrumbData()} /> */}
                        <div style={{ height: 25 }} />
                    </Hidden>
                )}
                {children}
            </main>
        </div>
    );
};

export default Layout;
