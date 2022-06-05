import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackAlert(prop) {

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} 
        open={prop.alert} 
        autoHideDuration={6000} 
        onClose={prop.closeAlert}
      >
        <Alert onClose={prop.closeAlert} severity={prop.severity} sx={{ width: '100%' }}>
          {prop.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}