import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '30px 0px 0px',
        padding: '16px 23px',
        background: '#FFFFFF',
        border: '1px solid #ECF0FB',
        borderRadius: 16,
    },
    titleComponent: {
        fontSize: 24,
        color: '#BE1F93',
    },
    columnLeft: {
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 15px)',
            float: 'left',
        },
    },
    columnRight: {
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 15px)',
            float: 'right',
        },
    },
    info: {
        margin: '30px -8px',
    },
    boxInfo: {
        borderRadius: 16,
        padding: 13,
        margin: '0 8px',
        background: '#FFF',
        color: '#8C98A2',
        [theme.breakpoints.down('xs')]: {
            margin: '15px 8px',
        },
        [theme.breakpoints.up('sm')]: {
            width: 'calc(20% - 16px)',
            display: 'inline-block',
        },
    },
    bgGradient: {
        color: '#FFF',
        background: 'linear-gradient(180deg, rgba(190,31,147,1) 0%, rgba(87,25,160,1) 72%)',
    },
    imgIcon: {
        textAlign: 'right',
    },
    total: {
        fontSize: 30,
        fontWeight: 700,
        color: '#5719A0',
    },
    colorInGradient: {
        color: '#FFF',
    },
    titleInfo: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'block',
        textOverflow: 'ellipsis',
    },
}));

export default useStyles;
