import { MuiDiv } from 'components/MUI'
import { ICellINCActs } from '../../interfaces'
import { IconButton, Tooltip } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useFiles } from 'hooks/files/useFiles'

export const CellINCActs = ({
  label,
  value,
  files,
  idINC,
  incident,
}: ICellINCActs) => {
  const [{ viewFiles }, { setViewFiles, setViewFilePanel, setAddAct }] =
    useFiles()

  const onClick = () => {
    setViewFilePanel(true)
    if (viewFiles.idINC !== idINC) {
      setViewFiles({ idINC, files })
    }
  }
  return (
    <MuiDiv className="cellINCContainer">
      <MuiDiv className="cellINCLabel">
        {label}
        {value ? (
          <>
            <Tooltip
              title="Просмотр"
              enterDelay={300}
              leaveDelay={100}
              placement="top">
              <IconButton className={'viewActIconButton'} onClick={onClick}>
                <VisibilityOutlinedIcon
                  className={'viewActIcon'}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Добавить"
              enterDelay={300}
              leaveDelay={100}
              placement="top">
              <IconButton
                className={'viewActIconButton'}
                onClick={() =>
                  setAddAct({
                    status: true,
                    id_incFiles: idINC,
                    incident,
                    files,
                  })
                }>
                <AddCircleOutlineOutlinedIcon
                  className={'viewActIcon'}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
      </MuiDiv>
      <MuiDiv className="cellINCValue">{value ?? ''}</MuiDiv>
    </MuiDiv>
  )
}
