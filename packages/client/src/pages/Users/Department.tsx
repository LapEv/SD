import { memo, useEffect, useState } from 'react'
import { ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { ListUsers } from './ListUsers'
import { RotateButton } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { Department } from 'store/slices/structure/interfaces'
import { MuiDiv } from 'components/MUI'

export const DepartmentData = memo(
  ({ departmentName, id_department, Users }: Department) => {
    const [{ activeDepartment }, { setActiveDepartment }] = useStructure()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      if (!open) {
        setActiveDepartment(id_department as string)
      }
      setOpen(!open)
    }

    useEffect(() => {
      if (activeDepartment !== id_department) {
        setOpen(false)
      }
    }, [activeDepartment])

    return (
      <MuiDiv className={'flexColumn'}>
        <ListItemButton
          divider={open}
          className={'itemButtonCollapse'}
          onClick={handleClick}>
          <ListItemText primary={departmentName} sx={{ ml: 2 }} />
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          className={'collapseList'}
          in={open}
          timeout="auto"
          unmountOnExit>
          {Users?.map(
            value =>
              value.status !== 'SUPERADMIN' && (
                <ListUsers {...value} key={value.id} />
              ),
          )}
        </Collapse>
      </MuiDiv>
    )
  },
)
