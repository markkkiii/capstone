import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = styled(AppBar)({
  backgroundColor: 'white',
  height: '45px', // Set the desired height of the navbar
});

const ProfileAvatar = styled(Avatar)({
  backgroundColor: 'black',
  height: '30px', // Set the desired height of the profile avatar
  width: '30px', // Set the desired width of the profile avatar
  fontSize: '20px', // Set the desired font size of the profile avatar
  cursor: 'pointer', // Add cursor pointer for hover effect
  top: '-9px',
});

interface NavigationBarProps {
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    onLogout();
  };

  return (
    <Navbar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>        </Typography>
        <div>
          <ProfileAvatar onClick={handleProfileClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </Navbar>
  );
};

export default NavigationBar;
