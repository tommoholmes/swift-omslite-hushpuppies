import React from 'react';
import Button from '@common_button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    btn: {
        background: '#B1BCDB',
        boxShadow: 'none',
        '&:hover': {
            background: '#B1BCDB',
            boxShadow: 'none',
        },
    },
    btnPurple: {
        background: '#BE1F93',
        boxShadow: 'none',
        '&:hover': {
            background: '#BE1F93',
            boxShadow: 'none',
        },
    },
}));

const MenuPopover = (props) => {
    const {
        openButton,
        menuItems,
        icon,
        iconPosition = 'start',
        color = 'gray',
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const styles = useStyles();

    const handleClickOpenButton = (event) => {
        setAnchorEl(event.currentTarget);
        if (openButton && openButton.onClick) openButton.onClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (onClick) => {
        handleClose();
        if (onClick) onClick();
    };

    return (
        <div>
            <Button
                variant="contained"
                buttonType="primary-rounded"
                className={color === 'gray' ? styles.btn : styles.btnPurple}
                onClick={handleClickOpenButton}
            >
                {iconPosition === 'start'
                    ? (
                        <>
                            {openButton.label}
                            {icon}
                        </>
                    )
                    : (
                        <>
                            {icon}
                            {openButton.label}
                        </>
                    )}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((menuItem, i) => (
                    <MenuItem key={i} onClick={() => handleClickMenuItem(menuItem.onClick)}>
                        {menuItem.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuPopover;
