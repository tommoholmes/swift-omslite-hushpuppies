import makeStyles from '@material-ui/core/styles/makeStyles';

const colorText = '#435179';
const colorTextGray = '#B1BCDB';
const borderGray = '#E5E9F1';
const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '12px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'unset',
            },
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                borderColor: colorText,
                color: colorText,
                textTransform: 'capitalize',
            },
        },
        '& .top-item.records-found': {
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                float: 'none',
            },
        },
        '& .boxColumn': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            '& .MuiAutocomplete-root': {
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important',
                },
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter .MuiTextField-root': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    btn: {
        borderRadius: '20px !important',
        background: 'unset !important',
        boxShadow: 'none !important',
        textTransform: 'capitalize !important',
        color: `${colorText} !important`,
        border: '1px solid !important',
        borderColor: `${colorText} !important`,
        '&:hover': {
            background: 'unset !important',
            boxShadow: 'none !important',
        },
        '&.filter': {
            borderColor: `${colorPurple} !important`,
            color: 'white !important',
            background: `${colorPurple} !important`,
        },
    },
    gridList: {
        display: 'grid',
    },
    titleList: {
        color: colorTextGray,
        fontSize: 10,
        margin: 0,
    },
    bodyList: {
        color: colorText,
        fontSize: 12,
        margin: 0,
    },
    loading: {
        display: 'flex',
        color: colorText,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
}));

export default useStyles;
