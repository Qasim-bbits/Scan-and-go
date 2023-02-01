import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidenav from '../Screens/Admin/Common/Sidenav/Sidenav';

const MenuBar = () => (
  <Grid >
    <Grid>
      <Sidenav />
    </Grid>    
    <Grid item sx={{marginTop: '70px', mx: 3}}>
      <Outlet />
    </Grid>     
  </Grid>
);
export default MenuBar;