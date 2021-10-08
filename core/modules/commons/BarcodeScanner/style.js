import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    scan: {
        '@media (max-width: 767px )': {
            height: window.innerHeight / 2,
            width: window.innerWidth,
        },
        display: 'flex',
        justifyContent: 'center',
        '& #scanner-container': {
            position: 'relative',
        },
        '& .drawingBuffer': {
            position: 'absolute',
            left: 0,
            top: 0,
        },
        '& video': {
            '@media (max-width: 767px )': {
                height: window.innerHeight / 2,
            },
        },
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 0,
    },
    closeIcon: {
        color: 'white',
        width: 36,
        height: 36,
    },
    matchIcon: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        left: 0,
        marginTop: '-50px',
    },
    icon: {
        backgroundColor: 'white',
        border: '5px solid white',
        borderRadius: 99,
        width: 80,
        height: 80,
        '&.cancel': {
            color: '#DA1414',
        },
        '&.check': {
            color: '#5EC929',
        },
    },
}));

export default useStyles;
