import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Hidden from '@material-ui/core/Hidden';
import { useRouter } from 'next/router';
import Breadcrumb from '@common_breadcrumb';
import { makeStyles } from '@material-ui/core/styles';
import RightToolbar from './rightToolbar';
import { miniDrawerWidth, drawerWidth } from '../helpers';

const useStyles = makeStyles((theme) => ({
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
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            width: '100%',
        },
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
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            transform: 'translateX(12px)',
        },
    },
    togleMenuIcon: {
        color: '#bE1f93',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
        [theme.breakpoints.down('xs')]: {
            fontSize: 32,
        },
    },
}));

const Header = ({
    mappedMenuList,
    open,
    setOpen,
}) => {
    const router = useRouter();
    const classes = useStyles();
    const getBreadcrumb = () => {
        const activeMenu = mappedMenuList.find((e) => e.url === router.pathname);
        return (activeMenu && activeMenu.breadcrumb) || [];
    };

    const HeaderMobile = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar)}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    className={clsx(classes.togleMenuButton)}
                >
                    <ChevronRightIcon className={classes.togleMenuIcon} />
                </IconButton>
                <RightToolbar />
            </Toolbar>
        </AppBar>
    );

    const HeaderDesktop = () => (
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

                <Breadcrumb data={[{ url: '/', label: 'Home' }, ...getBreadcrumb()]} />
                <RightToolbar />
            </Toolbar>
        </AppBar>
    );

    return (
        <>
            <Hidden smUp implementation="css">
                {HeaderMobile()}
            </Hidden>
            <Hidden xsDown implementation="css">
                {HeaderDesktop()}
            </Hidden>
        </>
    );
};

export default Header;
