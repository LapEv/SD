import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton, useTheme } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { ListUsers } from './ListUsers'
import { RotateButton } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Department } from 'store/slices/structure/interfaces'
import { ITheme } from 'themes/themeConfig'

export const DepartmentData = memo(
  ({ departmentName, id_department, Users }: Department) => {
    const [{ activeDepartment }, { setActiveDepartment }] = useStructure()
    const [open, setOpen] = useState(false)
    const theme = useTheme() as ITheme

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
      <Box sx={flexColumn_FS_SA}>
        <ListItemButton
          divider={open}
          sx={classifierChildComponent}
          onClick={handleClick}>
          <ListItemText primary={departmentName} sx={{ ml: 2 }} />
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', height: theme.fontSize === 'small' ? 40 : 50 }}
          in={open}
          timeout="auto"
          unmountOnExit>
          {Users?.map(value => <ListUsers {...value} key={value.id} />)}
        </Collapse>
      </Box>
    )
  },
)
