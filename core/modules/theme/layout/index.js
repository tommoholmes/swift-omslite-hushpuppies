import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import useStyles from './style';

const Layout = (props) => {
    const { children } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

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
                <Typography variant="h6" noWrap>
                    Home / Dashboard
                </Typography>
                <div style={{ position: 'fixed', right: 0 }}>
                    <IconButton aria-label="" color="inherit">
                        <Brightness2OutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsNoneIcon />
                        </Badge>
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            background: 'transparent',
                            textTransform: 'none',
                            boxShadow: 'none',
                            color: '#8C98A2',
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Username
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );

    const Sidebar = () => {
        const [expandedMenu, setExpandedMenu] = React.useState();
        const menuList = [
            { key: 'dashboard', label: 'Dashboard' },
            {
                key: 'oms',
                label: 'OMS',
                children: [
                    { key: 'channel', label: 'Channel' },
                    { key: 'company', label: 'Company' },
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
            { key: 'catalogInventory', label: 'Catalog Inventory' },
            {
                key: 'userData',
                label: 'User Data',
                children: [
                    { key: 'adminStore', label: 'Admin Store' },
                    { key: 'customerData', label: 'Customer Data' },
                ],
            },
        ];
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
                                onClick={() => setExpandedMenu(menu.key)}
                            >
                                <ListItemIcon>
                                    <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                            {menu && menu.children && menu.children.length && (
                                <Collapse in={expandedMenu === menu.key} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.children.map((menuChild) => (
                                            <ListItem button key={menuChild.key} className={classes.menuChildItem}>
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

    return (
        <div className={classes.root}>
            {Header()}
            {Sidebar()}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
