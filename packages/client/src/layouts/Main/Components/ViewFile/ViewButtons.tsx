import { IconButton, Tooltip } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { ClearRounded } from '@mui/icons-material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined'
import { useFiles } from 'hooks/files/useFiles'
import { FilesData } from 'store/slices/files/interfaces'
import { IViewButtons } from 'layouts/Main/interfaces'

export const ViewButtons = ({ index }: IViewButtons) => {
  const [{ viewFiles }, { setViewFilePanel }] = useFiles()

  const download = () => {
    const file = (viewFiles.files as FilesData[])[index]
    const a = document.createElement('a')
    a.href = JSON.parse(file.src as string).data
    a.download = file.name
    a.click()
  }

  const downloadAll = () => {
    const files = viewFiles.files as FilesData[]
    files.map(file => {
      const a = document.createElement('a')
      a.href = JSON.parse(file.src as string).data
      a.download = file.name
      a.click()
    })
  }

  return (
    <MuiDiv className="viewButtonPanel">
      <Tooltip
        title="Скачать"
        slotProps={{
          popper: {
            sx: { zIndex: 99999 },
          },
        }}
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton onClick={download} className="viewActButtons">
          <FileDownloadOutlinedIcon className="viewActCloseIcon" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Скачать всё"
        slotProps={{
          popper: {
            sx: { zIndex: 99999 },
          },
        }}
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton onClick={downloadAll} className="viewActButtons">
          <DownloadForOfflineOutlinedIcon className="viewActCloseIcon" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Закрыть"
        slotProps={{
          popper: {
            sx: { zIndex: 99999 },
          },
        }}
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          onClick={() => setViewFilePanel(false)}
          className="viewActButtons">
          <ClearRounded className="viewActCloseIcon" />
        </IconButton>
      </Tooltip>
    </MuiDiv>
  )
}
