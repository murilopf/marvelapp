import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

interface ISnackbar {
  title: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

interface Props {
  open: boolean
  snackBar: ISnackbar
  resetSnackbar(): any
}

const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant='filled' {...props} />
)

const CSnackbar: React.FC<Props> = ({ snackBar, open, resetSnackbar }) => {
  const { title, severity } = snackBar

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    resetSnackbar()
  }

  return (
    <div data-testid='snackbar'>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          data-testid='alertSnackbar'
        >
          {title}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CSnackbar
