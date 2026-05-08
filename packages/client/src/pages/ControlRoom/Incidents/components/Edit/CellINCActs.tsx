import { MuiDiv } from 'components/MUI'
import { ICellINCActs } from '../../interfaces'
import { IconButton, Tooltip } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useFiles } from 'hooks/files/useFiles'

export const CellINCActs = ({ label, value, files, idINC }: ICellINCActs) => {
  const [{ viewFiles }, { setViewFiles, setViewFilePanel }] = useFiles()

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
        ) : (
          <></>
        )}
      </MuiDiv>
      <MuiDiv className="cellINCValue">{value ?? ''}</MuiDiv>
    </MuiDiv>
  )
}
