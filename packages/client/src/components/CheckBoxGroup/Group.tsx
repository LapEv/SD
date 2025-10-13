import { useState, ChangeEvent, useEffect, memo } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { ListBoxGroup } from './ListBoxGroup'
import { ICheckBoxGroup, ICheckBoxGroupItems } from './interface'
import { isEqualArr } from 'utils/isEqualArr'

export const Group = memo(
  ({
    data,
    onChooseGroup,
    onChooseItems,
    onChooseItemsGroup,
    clearChanges,
    onClearChanges,
  }: ICheckBoxGroup) => {
    const [checked, setChecked] = useState<boolean>(data.checkedGroup)
    const [selectedGroup, setSelectedGroup] = useState<string>(
      data.checkedGroup ? data.id : ''
    )
    const [items, setItems] = useState<ICheckBoxGroupItems[]>(data.items)
    const [selectedItems, setSelectedItems] = useState<string[]>(
      data.items.map(item => {
        if (item.checkedItems) {
          return item.id as string
        }
      }) as string[]
    )
    const [checkedGroup, setCheckedGroup] = useState<boolean>(data.checkedGroup)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
      if (!event.target.checked) {
        setSelectedGroup('')
        setSelectedItems([])
        setItems(
          items.map(item => {
            return { ...item, checkedItems: false }
          })
        )
        setCheckedGroup(event.target.checked)
        onChooseGroup(event.target.checked, data.id)
        onChooseItemsGroup(event.target.checked, selectedItems)
        return
      }
      setSelectedGroup(event.target.value)
      setSelectedItems(items.map(({ id }) => id))
      setItems(
        items.map(item => {
          return { ...item, checkedItems: true }
        })
      )
      setCheckedGroup(event.target.checked)
      onChooseGroup(event.target.checked, data.id)
      onChooseItemsGroup(
        event.target.checked,
        items.map(({ id }) => id)
      )
    }

    const onItemsChange = (checked: boolean, id: string) => {
      if (!checked) {
        const newItems = selectedItems.filter(value => value !== id)
        setSelectedItems(newItems)
        if (!newItems.length) {
          setSelectedGroup('')
          onChooseGroup(checked, data.id)
          setChecked(false)
        }
        setItems(
          items.map(item => {
            return {
              ...item,
              checkedItems: item.id === id ? false : item.checkedItems,
            }
          })
        )
        onChooseItems(checked, id)
        return
      }
      if (!selectedItems.includes(id)) {
        setSelectedItems([...selectedItems, id])
        if (!selectedGroup) {
          setSelectedGroup(data.id)
          onChooseGroup(checked, data.id)
          setChecked(true)
        }
        setItems(
          items.map(item => {
            return {
              ...item,
              checkedItems: item.id === id ? true : item.checkedItems,
            }
          })
        )
        onChooseItems(checked, id)
      }
    }

    useEffect(() => {
      if (
        !isEqualArr(data.items as [], items as []) ||
        data.checkedGroup !== checked
      ) {
        setChecked(data.checkedGroup)
        setSelectedGroup(data.checkedGroup ? data.id : '')
        setItems(data.items)
        setSelectedItems(
          data.items.map(item => {
            if (item.checkedItems) {
              return item.id as string
            }
          }) as string[]
        )
        setCheckedGroup(data.checkedGroup)
        onClearChanges?.(false)
      }
    }, [clearChanges])

    return (
      <Box
        component="main"
        maxWidth="md"
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}>
        <>
          <FormControlLabel
            name={data.group}
            label={''}
            value={data.id}
            control={<Checkbox checked={checked} onChange={handleChange} />}
          />
          <ListBoxGroup
            key={`${data.id}${data.group}`}
            groupName={data.group}
            data={items}
            groupId={data.id}
            groupChecked={checkedGroup}
            onChooseItems={onItemsChange}
          />
        </>
      </Box>
    )
  }
)
