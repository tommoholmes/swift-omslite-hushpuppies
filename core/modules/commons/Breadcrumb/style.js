import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 20,
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    breadcrumbItem: {
        paddingLeft: 0,
        paddingRight: '5px',
    },
    breadcrumbActive: {
        '&:hover': {
            color: '#be1f93',
            borderBottom: '1px solid #be1f93',
            marginBottom: '-1px',
        },
    },
    breadcrumbSeparator: {
        paddingLeft: '5px',
        '&:hover': {
            borderBottom: 'none',
        },
    },
}));

export default useStyles;
