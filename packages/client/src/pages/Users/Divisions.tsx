import { useStructure } from 'hooks/structure/useStructure'
import { memo, useEffect, useState } from 'react'
import { ListItemText, ListItemButton } from '@mui/material'
import { Division } from 'store/slices/structure/interfaces'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { DepartmentData } from './Department'
import { MuiDiv } from 'components/MUI'

export const Divisions = memo(
  ({ divisionName, id_division, Departments }: Division) => {
    const [{ activeDivision }, { setActiveDivision }] = useStructure()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(!open)
      setActiveDivision(id_division as string)
    }

    useEffect(() => {
      if (activeDivision !== id_division) {
        setOpen(false)
      }
    }, [activeDivision])

    return (
      <MuiDiv className={'containerCollapse'}>
        <ListItemButton
          divider={open}
          className={'itemButtonCollapse1'}
          onClick={handleClick}>
          <ListItemText primary={divisionName} />
          <RotateButton open={open} handleClick={handleClick} />
        </ListItemButton>
        <Collapse
          className={'collapseList'}
          in={open}
          timeout="auto"
          unmountOnExit>
          {Departments?.map(({ departmentName, id, Users }) => (
            <DepartmentData
              departmentName={departmentName}
              id_department={id}
              key={id}
              Users={Users}
            />
          ))}
        </Collapse>
      </MuiDiv>
    )
  },
)
