import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        fontFamily: font,
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        paddingBottom: 20,
        boxShadow: 'none',
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    btnEdit: {
        borderRadius: 20,
        height: 36,
        width: 80,
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 30px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderColor,
            border: 0,
            height: 1,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    divLabel: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10,
            paddingLeft: 0,
        },
        paddingRight: 30,
        paddingTop: 10,
        marginBottom: 10,
        fontWeight: 600,
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    divData: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10,
            paddingLeft: 0,
        },
        paddingRight: 30,
        paddingTop: 10,
        marginBottom: 10,
    },
    gridAttribute: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottom: '1px solid #CED2D8',
        '&.no-border': {
            border: 'none',
            marginBottom: 0,
        },
    },
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 16,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    gridInputTitle: {
        display: 'grid',
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        marginBottom: 20,
    },
    gridInput: {
        display: 'grid',
        marginBottom: 10,
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
    },
}));

export default useStyles;
