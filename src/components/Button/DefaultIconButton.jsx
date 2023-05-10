import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';

const icons = {
  detail: <AssignmentOutlinedIcon />,
  delete: <DeleteOutlinedIcon />,
  edit: <EditOutlinedIcon />
}

const DefaultIconButton = (props) => {

  const {icon, onClick} = props

  return (
    <IconButton aria-label='delete' onClick={onClick}>
      {icons[icon]}
    </IconButton>
  )
}

export default DefaultIconButton