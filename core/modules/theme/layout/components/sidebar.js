import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
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
        '&.active': {
            background: '#BE1F93',
            color: '#fff',
        },
    },
    menuChildItem: {
        paddingLeft: 76,
        '&.active span': {
            color: '#BE1F93',
            fontWeight: 'bold',
        },
        '&:hover span': {
            color: '#BE1F93',
            fontWeight: 'bold',
        },
    },
}));

const Sidebar = ({
    activeParentMenu,
    setActiveParentMenu,
    activeChildMenu,
    setActiveChildMenu,
    open,
    menuList,
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
                            className={clsx(
                                classes.menuItem,
                                open ? 'open' : 'close',
                                menu.key === (activeParentMenu && activeParentMenu.key) && 'active',
                            )}
                            onClick={() => handleClickParent(menu)}
                        >
                            <ListItemIcon>
                                <img alt="" src={`/assets/img/layout/${menu.key}.svg`} />
                            </ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                        {menu && menu.children && menu.children.length && (
                            <Collapse in={activeParentMenu && activeParentMenu.key === menu.key} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {menu.children.map((menuChild) => (
                                        <ListItem
                                            button
                                            key={menuChild.key}
                                            className={clsx(
                                                classes.menuChildItem,
                                                menuChild.key === (activeChildMenu && activeChildMenu.key) && 'active',
                                            )}
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

export default Sidebar;
