import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

function ProjectDialog({ open = false, handleClose, handAccept }) {

  const [name, setName] = useState('')

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nombre del proyecto de BPMN y Mockups</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder='Escriba el nombre'
          fullWidth
          onChange={e => setName(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button disabled={name.trim() == ''} onClick={() => handAccept(name)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectDialog