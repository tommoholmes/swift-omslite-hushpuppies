import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 0,
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },

        marginBottom: 20,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    breadcrumbItem: {
        paddingLeft: 0,
        paddingRight: '5px',
    }
}));

export default useStyles;
