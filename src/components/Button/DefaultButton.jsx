import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const icons = {
  upload: <FileUploadOutlinedIcon />,
  download: <FileDownloadOutlinedIcon />,
  add: <AddOutlinedIcon />
}

const DefaultButton = ({label, icon, color, onClick}) => {

  return (
    <Button onClick={onClick} variant="contained" color={color} startIcon={icons[`${icon}`]}>
      <Typography fontWeight='bold'>{label}</Typography>
    </Button>
  )
}

export default DefaultButton