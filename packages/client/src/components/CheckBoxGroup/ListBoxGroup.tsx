import { useState, useEffect, memo } from 'react'
import { Box, Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { Item } from './Item'
import { IListBoxGroup } from './interface'

export const ListBoxGroup = memo(
  ({
    groupName,
    data,
    groupId,
    groupChecked,
    onChooseItems,
  }: IListBoxGroup) => {
    const [open, setOpen] = useState(false)
    const [{ activeRolesGroup }, { setActiveRolesGroup }] = useRoles()

    const handleClick = () => {
      setOpen(!open)
      !open ? setActiveRolesGroup(groupId) : setActiveRolesGroup('')
    }

    useEffect(() => {
      if (activeRolesGroup !== groupId) {
        setOpen(false)
      }
    }, [activeRolesGroup])

    useEffect(() => {
      if (groupChecked && activeRolesGroup !== groupId) {
        setOpen(true)
        setActiveRolesGroup(groupId)
      }
    }, [groupChecked])

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ListItemButton
          divider={open}
          sx={{
            fontWeight: 'bold',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            padding: 0,
          }}
          onClick={handleClick}>
          <>
            <ListItemText primary={groupName} />
            <RotateButton open={open} handleClick={handleClick} />
          </>
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          in={open}
          timeout="auto"
          unmountOnExit>
          {data.map(({ item, id, checkedItems }, index) => (
            <Item
              name={item}
              id={`${id}`}
              groupChecked={groupChecked}
              onChooseItems={onChooseItems}
              initChecked={checkedItems}
              key={`${id}${index}`}
            />
          ))}
        </Collapse>
      </Box>
    )
  },
)
