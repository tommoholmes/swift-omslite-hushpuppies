import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const miniDrawerWidth = 73;
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        background: '#fff',
        color: '#8C98A2',
        boxShadow: 'none',
        marginLeft: miniDrawerWidth,
        width: `calc(100% - ${miniDrawerWidth + 1}px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    togleMenuButton: {
        marginRight: -6,
        width: 24,
        height: 24,
        transform: 'translateX(-24px)',
    },
    togleMenuIcon: {
        color: '#bE1f93',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    swiftOmsLogo: {
        padding: 12,
        '&.open': { justifyContent: 'flex-start' },
        '&.close': { justifyContent: 'center' },
        '& img': { height: 45 },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuList: {
        padding: 0,
        '&.open': { paddingRight: 16 },
    },
    menuItem: {
        marginTop: 8,
        paddingLeft: 20,
        '&.open': { borderRadius: '0 26px 26px 0' },
        '&:hover': {
            background: '#BE1F93',
            color: '#fff',
        },
    },
    menuChildItem: {
        paddingLeft: 24,
    },
}));

const Layout = (props) => {
    const { children } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
                    {/* <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
                    <IconButton
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        Username
                        <ChevronLeftIcon />
                    </IconButton>
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
