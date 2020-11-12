import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const useStyles = makeStyles(() => ({
    container: {
        borderRadius: 7,
        background: colorPurple,
        color: '#FFFFFF',
        letterSpacing: 2,
        '&:hover': {
            background: colorPurple,
        },
    },
}));

export default useStyles;
