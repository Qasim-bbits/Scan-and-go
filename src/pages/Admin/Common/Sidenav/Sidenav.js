import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box, 
  Button,
  ListItemButton,
  Typography,
  Drawer, 
  CssBaseline, 
  AppBar as MuiAppBar, 
  Toolbar, 
  List, 
  Divider, 
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
} from '@mui/icons-material';
import adminRoutes from '../../../../routePaths/adminRoutes';

const drawerWidth = 150;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{color: 'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {adminRoutes.map(x=>{
            console.log(x)
            return(
              <ListItemButton>
                <Link to={{pathname: x.path}} style={{ textDecoration: 'none', display: 'flex' }}>
                  <ListItemIcon sx={{minWidth: '40px', color: 'white'}}>
                    {x.icon}
                  </ListItemIcon>
                  <ListItemText sx={{color: 'white'}} disableTypography >
                    {x.value}
                  </ListItemText>
                </Link>
              </ListItemButton>
            )
          })}
        </List>
      </Drawer>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: '#d1cccc' }}>
        <Toolbar>
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            <Button
              sx={{ my: 2, color: 'gray', display: 'block' }}
            >
              Home
            </Button>
            <Button
              sx={{ my: 2, color: 'gray', display: 'block' }}
            >
              Products
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
