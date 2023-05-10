import { Box, Dialog, DialogContent } from '@mui/material'
import React from 'react'
import Lottie from "lottie-react";
import loading from '../../assets/lottie/loading.json'

function LoadingDialog({ open = false }) {
  return (
    <Dialog PaperProps={{sx: {backgroundColor: 'transparent', boxShadow: 'none'}}} open={open} >
      <DialogContent>
        <Lottie animationData={loading} loop={true} />
      </DialogContent>
    </Dialog>
  )
}

export default LoadingDialog