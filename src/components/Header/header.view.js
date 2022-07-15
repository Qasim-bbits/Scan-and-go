import styled from '@emotion/styled';
import {AppBar, Button, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[3]
}));

export const HeaderView = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 20,
            px: 4,
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              position: 'none',
              display: {
                xs: 'inline-flex',
                lg: 'none'
              },
              color: '#fff',
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{color: '#fff', marginLeft: '85%'}}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
