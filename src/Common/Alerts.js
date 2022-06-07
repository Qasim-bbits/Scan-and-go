import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackAlert(props) {
  const {
    showAlert,
    severity,
    alertMessage,
    closeAlert,
  } = props
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={closeAlert}
        sx={{whiteSpace: 'pre-wrap', maxHeight:"100%", overflow: 'auto', top:'0 !important'}}
      >
        <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%', marginTop: '24px' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}