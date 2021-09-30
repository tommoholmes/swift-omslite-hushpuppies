import makeStyles from '@material-ui/core/styles/makeStyles';

const colorText = '#536777';
const colorBorder = '#435179';
const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
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
                borderColor: colorBorder,
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
        borderRadius: 20,
        background: 'unset',
        boxShadow: 'none',
        textTransform: 'capitalize',
        color: colorText,
        border: '1px solid',
        borderColor: colorBorder,
        '&:hover': {
            background: 'unset',
            boxShadow: 'none',
        },
        '&.filter': {
            borderColor: colorPurple,
            color: 'white',
            background: colorPurple,
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    mainTable: {
        overflowX: 'scroll',
    },

    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
    },

}));

export default useStyles;
