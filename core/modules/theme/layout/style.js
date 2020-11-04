import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;
