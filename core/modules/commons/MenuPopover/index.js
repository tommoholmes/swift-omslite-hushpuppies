import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuPopover = (props) => {
    const {
        openButton,
        menuItems,
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOpenButton}>
                {openButton.label}
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
