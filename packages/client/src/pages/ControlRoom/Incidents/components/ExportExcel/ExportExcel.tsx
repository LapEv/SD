import { IconButton, Tooltip } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import * as XLSX from 'xlsx'
import { useIncidents } from 'hooks/incidents/useINC'
import { prepareDataINCs } from './prepareDataINCs'

export const ExportExcel = () => {
  const [{ filtered }] = useIncidents()

  const prepareData = () => {
    const dataINCs = prepareDataINCs(filtered)
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(dataINCs)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'INCs')
    XLSX.writeFile(workbook, 'incidents.xlsx')
  }

  return (
    <>
      <Tooltip
        title="Export XLS"
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          id="exportExcel-menu-trigger"
          aria-haspopup="true"
          className={'exportExcelIconButton'}
          onClick={prepareData}>
          <FileDownloadOutlinedIcon className={'exportExcelIcon'} />
        </IconButton>
      </Tooltip>
    </>
  )
}
