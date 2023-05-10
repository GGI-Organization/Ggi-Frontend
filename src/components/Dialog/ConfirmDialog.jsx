import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ConfirmDialog = (props) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    props.cancel()
  };

  const handleAccept = () => {
    props.accept()
  };


  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        {/* {"Eliminar Cliente"} */}
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* ¿Esta seguro que desea eliminar al cliente? */}
          {props.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleAccept} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog