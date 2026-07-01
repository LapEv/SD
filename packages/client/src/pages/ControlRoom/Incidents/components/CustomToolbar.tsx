import { Divider, Toolbar } from '@mui/material'
import { ViewColumns } from './ViewColumns/ViewColumns'
import { TableSettings } from './TableSettings/TableSettings'
import { TableFilter } from './Filter/TableFilter'
import { ExportExcel } from './ExportExcel/ExportExcel'
import { QuickSearch } from './QuickSearch/QuickSearch'
import { Print } from './Print/Print'
import { NewIncidentBar } from './NewIncident/NewIncidentBar'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenuToolTip } from 'components/DropDownButtonMenu'
import { menuData } from '../menuData'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { FilterElements } from './Filter/FilterElements'
import { QuickFilter } from './QuickFilter/QuickFilter'

export const CustomToolbar = () => {
  const [{ superAdmin }] = useAuth()
  const [, { setModal }] = useTableINC()

  const checkClickMenu = (image: string) => {
    setModal({ active: true, image })
  }

  return (
    <Toolbar className="tableHeadToolbar">
      <FilterElements />
      <Divider orientation="vertical" variant="middle" flexItem />
      <QuickSearch />
      <Divider orientation="vertical" variant="middle" flexItem />
      <QuickFilter />
      <TableFilter />
      <ViewColumns />
      <Divider orientation="vertical" variant="middle" flexItem />
      <ExportExcel />
      <Print />
      <Divider orientation="vertical" variant="middle" flexItem />
      <NewIncidentBar />
      <Divider orientation="vertical" variant="middle" flexItem />
      <TableSettings />
      {superAdmin && (
        <>
          <Divider orientation="vertical" variant="middle" flexItem />
          <DropDownMenuToolTip
            title={'Добавить/Удалить'}
            data={menuData}
            divider={[3, 6, 9]}
            className={'menuINCIconButton'}
            classNameIcon={'menuINCIcon'}
            onClick={checkClickMenu}
          />
        </>
      )}
    </Toolbar>
  )
}
