import { makeStyles } from '@material-ui/core/styles';

const miniDrawerWidth = 73;
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    contentNoHeader: {
        flexGrow: 1,
        padding: 0,
    },
}));

export default useStyles;
