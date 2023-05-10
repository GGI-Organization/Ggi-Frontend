import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

const NewTaskDialog = ({ open, handleClose, addTask }) => {

  const [task, setTask] = useState('')

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} >
        <DialogTitle>Agregar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label=""
            type="task"
            fullWidth
            onChange={(e) => setTask(e.target.value)}
            value={task}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setTask('')
            handleClose()
          }}>
            <Typography>Cancelar</Typography>
          </Button>
          <Button onClick={() => {
            addTask(task)
            setTask('')
            }}>
            <Typography>Agergar</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewTaskDialog