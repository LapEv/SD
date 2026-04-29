import { IconButton } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { IEditINC } from '../../interfaces'

export const EditINC = ({ row }: IEditINC) => {
  const [, { setModal }] = useTableINC()

  const editData = () => {
    setModal({ active: true, image: 'changeIncident', inc: row })
  }

  return (
    <MuiDiv className={'boxIndicatorContainer'}>
      <IconButton onClick={editData} className={'editIconButton'}>
        <EditNoteOutlinedIcon className={`editIcon`} />
      </IconButton>
    </MuiDiv>
  )
}
