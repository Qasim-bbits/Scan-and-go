import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme} from "@mui/material/styles";
import logodashboard from "../../../../assets/images/Logos/logo.svg";
import Search from "../../../../components/Searchfield";
import adminRoutes from "../../../../Routes/adminRoutes";

import {
  Box,
  ListItemButton,
  Typography,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  Login,
} from "@mui/icons-material";
import {router} from "../../../../Routes/routhPaths";

const drawerWidth = 150;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const isAdmin = JSON.parse(sessionStorage.getItem('userLogged'));

  useEffect(()=>{
    let logged = JSON.parse(sessionStorage.getItem("userLogged"));
    if(logged !== null){
      setUser(logged.result);
    };
  },[])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () =>{
    sessionStorage.removeItem("userLogged");
    setAnchorEl(null);
    navigate(router.login)
  }

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
        <Toolbar sx={{ backgroundColor: "#2c3680" }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{color: '#fff'}} />
          </IconButton>
          <Typography
            className="admin-text"
            color="primary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#F0F2F5" }}
          >
            Welcome
          </Typography>
          {/* <Search /> */}

          <div>
            <IconButton
              sx={{color: '#fff'}}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{navigate(router.profile)}}>Profile</MenuItem>
              <MenuItem onClick={logout}>
                {(isAdmin?.result?.role == 'admin') ? "Logout" : "Login"}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#F0F2F5 !important",
            width:
              window.innerWidth > 700 ? "30% !important" : "100% !important",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src={logodashboard}
            alt="logo"
            height="80px"
            width="250px"
            style={{ margin: "5px auto" }}
          />
          <IconButton onClick={handleDrawerClose} sx={{ color: "#2C3680" }}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          sx={{ margin: "0px 30px" }}
        >
          {isAdmin?.result?.role != 'admin' && <ListItemButton>
            <Link
              to={{ pathname: router.login }}
              style={{ textDecoration: "none", display: "flex" }}
              onClick={handleDrawerClose}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "#2c3680" }}>
                <Login/>
              </ListItemIcon>
              <ListItemText sx={{ color: "#2c3680" }} disableTypography>
                Signup / Login
              </ListItemText>
            </Link>
          </ListItemButton>}
          {isAdmin?.result?.role == 'admin' && adminRoutes.map((x) => {
            return (
              <ListItemButton>
                <Link
                  to={{ pathname: x.path }}
                  style={{ textDecoration: "none", display: "flex" }}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon sx={{ minWidth: "40px", color: "#2c3680" }}>
                    {x.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#2c3680" }} disableTypography>
                    {x.value}
                  </ListItemText>
                </Link>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      {/* <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#fff" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            <Button sx={{ my: 2, color: "gray", display: "block" }}>
              Home
            </Button>
            <Button sx={{ my: 2, color: "gray", display: "block" }}>
              Products
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}
    </Box>
  );
}
