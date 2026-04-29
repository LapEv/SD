import { TablePagination, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useIncidents } from 'hooks/incidents/useINC'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const INCFooter = () => {
  const [{ filteredLength }] = useIncidents()
  const [{ page, rowsPerPage, selected }, { setPage, setRowsPerPage }] =
    useTableINC()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <MuiDiv className="selectedBoxStyle">
      {selected.length > 0 && (
        <Typography className="selectedTextStyle" component={'div'}>
          Выбрано инцидентов: {selected.length}
        </Typography>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Строк на странице'}
      />
    </MuiDiv>
  )
}
