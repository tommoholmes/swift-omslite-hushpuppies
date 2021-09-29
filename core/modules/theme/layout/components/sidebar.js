/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '@modules/theme/layout/helpers';

const useStyles = makeStyles((theme) => ({
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
    togleMenuButton: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: '16px',
        right: '16px',
    },
    togleMenuIcon: {
        fontSize: 27,
        color: '#bE1f93',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
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
    divMenu: {
        color: '#B1BCDB',
        '& .itemText span': {
            fontWeight: 700,
            fontSize: 15,
        },
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
            background: '#ECF0FB',
            color: '#BE1F93',
        },
        '&.active': {
            background: '#ECF0FB',
            color: '#BE1F93',
            '& .itemIcon img': {
                filter: 'invert(24%) sepia(64%) saturate(3067%) hue-rotate(296deg) brightness(68%) contrast(98%)',
            },
        },
        '& .itemIcon': {
            minWidth: 50,
        },
    },
    menuChildItem: {
        paddingLeft: 70,
        '&.active span': {
            color: '#BE1F93',
            fontWeight: 'bold',
        },
        '&:hover span': {
            color: '#BE1F93',
            fontWeight: 'bold',
        },
        '&:hover': {
            background: 'transparent',
        },
    },
}));

const Sidebar = ({
    activeParentMenu,
    setActiveParentMenu,
    activeChildMenu,
    setActiveChildMenu,
    open,
    setOpen,
    menuList,
    aclDetail,
}) => {
    const router = useRouter();
    const classes = useStyles();
    const handleClickParent = (menu) => {
        if (menu.key === (activeParentMenu && activeParentMenu.key)) {
            setActiveParentMenu(null);
        } else {
            setActiveParentMenu(menu);
            if (menu.url) router.push(menu.url);
        }
    };
    const handleClickChild = (menu) => {
        setActiveChildMenu(menu);
        if (menu.url) router.push(menu.url);
    };

    const SidebarContent = () => (
        <>
            <div className={clsx(classes.toolbar, classes.swiftOmsLogo, open ? 'open' : 'close')}>
                <img
                    alt=""
                    src={open ? '/assets/img/swiftoms_logo_expanded.png' : '/assets/img/swiftoms_logo_collapsed.png'}
                />
            </div>
            <Hidden smUp>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(false)}
                    className={clsx(classes.togleMenuButton)}
                >
                    <ChevronLeftIcon className={classes.togleMenuIcon} />
                </IconButton>
            </Hidden>
            <List className={clsx(classes.menuList, open ? 'open' : 'close')}>
                {menuList && menuList.map((menu) => (
                    <>
                        { (menu.key === 'dashboard') && (
                            <div className={classes.divMenu} key={menu.key}>
                                <ListItem
                                    button
                                    className={clsx(
                                        classes.menuItem,
                                        open ? 'open' : 'close',
                                        menu.key === (activeParentMenu && activeParentMenu.key) && 'active',
                                    )}
                                    onClick={() => handleClickParent(menu)}
                                >
                                    <ListItemIcon className="itemIcon">
                                        <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                                    </ListItemIcon>
                                    <ListItemText className="itemText" primary={menu.label} />
                                </ListItem>
                            </div>
                        )}
                    </>
                ))}
                {menuList && menuList.map((menu) => (
                    <>
                        { (aclDetail[0] && aclDetail[0].acl_code.includes(menu.aclCode)) && (
                            <div className={classes.divMenu} key={menu.key}>
                                <ListItem
                                    button
                                    className={clsx(
                                        classes.menuItem,
                                        open ? 'open' : 'close',
                                        menu.key === (activeParentMenu && activeParentMenu.key) && 'active',
                                    )}
                                    onClick={() => handleClickParent(menu)}
                                >
                                    <ListItemIcon className="itemIcon">
                                        <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                                    </ListItemIcon>
                                    <ListItemText className="itemText" primary={menu.label} />
                                </ListItem>
                                {menu && menu.children && menu.children.length && (
                                    <Collapse in={activeParentMenu && activeParentMenu.key === menu.key} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {menu.children.map((menuChild) => (
                                                <>
                                                    { ((aclDetail[0] && aclDetail[0].acl_code.includes(menuChild.aclCode)) || (menu.key === 'vendor')) && (
                                                        <div>
                                                            <a href={`${menuChild.url}`}>
                                                                <ListItem
                                                                    button
                                                                    key={menuChild.key}
                                                                    className={clsx(
                                                                        classes.menuChildItem,
                                                                        menuChild.key === (activeChildMenu && activeChildMenu.key) && 'active',
                                                                    )}
                                                                    onClick={() => handleClickChild(menuChild)}
                                                                >
                                                                    <ListItemText className="itemText" primary={menuChild.label} />
                                                                </ListItem>
                                                            </a>
                                                        </div>
                                                    )}
                                                </>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </div>
                        )}
                    </>
                ))}
            </List>
        </>
    );

    const SidebarMobile = () => (
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
            classes={{
                paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
            }}
            ModalProps={{ keepMounted: true }}
        >
            {SidebarContent()}
        </Drawer>
    );

    const SidebarDesktop = () => (
        <Drawer
            variant="permanent"
            open={open}
            className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
            classes={{
                paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
            }}
        >
            {SidebarContent()}
        </Drawer>
    );

    return (
        <>
            <Hidden smUp>
                {SidebarMobile()}
            </Hidden>
            <Hidden xsDown>
                {SidebarDesktop()}
            </Hidden>
        </>
    );
};

export default Sidebar;
