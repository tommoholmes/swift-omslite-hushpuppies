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
            fontWeight: 600,
            borderBottom: '1px solid #000',
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
