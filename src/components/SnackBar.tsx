import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface SnackBar {
  title: string;
  severity: "success" | "error" | "warning" | "info"
}

interface Props {
  open: boolean;
  snackBar: SnackBar,
  resetSnackBar(): any
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar: React.FC<Props> = ({ snackBar, open, resetSnackBar }) => {

  const { title, severity } = snackBar

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    resetSnackBar()
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar
