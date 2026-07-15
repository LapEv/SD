import { TableCell, useTheme } from '@mui/material'
import { ICells } from '../interfaces'
import { Indicator } from './Indicator/Indicator'
import { convertTSToCurrentTZ } from 'utils/convertDate'
import { Status } from './Status/Status'
import { Executor } from './Executor/Executor'
import { Responsible } from './Responsible/Responsible'
import { EditINC } from './Edit/EditINC'
import { ITheme } from 'themes/themeConfig'

export const Cells = ({
  value,
  width,
  labelId,
  minWidth,
  id,
  type,
  row,
}: ICells) => {
  const theme = useTheme() as ITheme

  if (id === 'indicator')
    return (
      <TableCell component="th" id={labelId} scope="row" padding="normal">
        <Indicator
          timeSLA={row.timeSLA}
          timeReg={row.timeRegistration}
          timeCloseCheck={row.timeCloseCheck}
          status={row.status}
          inc={row.incident}
          theme={theme.palette.mode}
        />
      </TableCell>
    )
  if (id === 'edit')
    return (
      <TableCell component="th" id={labelId} scope="row" padding="normal">
        <EditINC row={row} />
      </TableCell>
    )
  if (id === 'status') {
    return (
      <TableCell component="th" id={labelId} className="cellStatusContainer">
        <Status
          value={row.status}
          id={row.id}
          incident={row.incident}
          executor={row.executor}
          responsible={row.responsible}
          timeSLA={row.timeSLA}
        />
      </TableCell>
    )
  }
  if (id === 'executor') {
    return (
      <TableCell component="th" id={labelId} className="cellStatusContainer">
        <Executor
          value={row.executor}
          id={row.id}
          incident={row.incident}
          responsible={row.responsible}
        />
      </TableCell>
    )
  }
  if (id === 'responsible') {
    return (
      <TableCell component="th" id={labelId} className="cellStatusContainer">
        <Responsible
          value={row.responsible}
          id={row.id}
          incident={row.incident}
        />
      </TableCell>
    )
  }

  if (id === 'act') {
    return (
      <TableCell
        component="th"
        id={labelId}
        className="cellStatusContainer"
        scope="row"
        padding="normal"
        width={width}
        sx={{ width: width, maxWidth: width, minWidth: minWidth }}>
        {row.act && row.act.length > 0 ? row.act.join(', ') : row.act}
      </TableCell>
    )
  }
  if (id === 'spaceParts') {
    return (
      <TableCell
        component="th"
        id={labelId}
        className="cellStatusContainer"
        scope="row"
        padding="normal"
        width={width}
        sx={{ width: width, maxWidth: width, minWidth: minWidth }}>
        {row.spaceParts && row.spaceParts.length > 0
          ? row.spaceParts.join(', ')
          : row.spaceParts}
      </TableCell>
    )
  }

  return (
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      padding="normal"
      width={width}
      sx={{ width: width, maxWidth: width, minWidth: minWidth }}>
      {type === 'dateTime' ? convertTSToCurrentTZ(value) : value}
    </TableCell>
  )
}
