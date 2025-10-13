import { memo, useState } from 'react'
import { ICheckBoxGroups } from './interface'
import { Group } from './Group'

export const CheckBoxGroups = memo(
  ({
    data,
    onChooseGroup,
    onChooseItems,
    props,
    startDataGroups,
    startDataItems,
    clearChanges,
    onClearChanges,
  }: ICheckBoxGroups) => {
    const [selectedGroups, setSelectedGroups] = useState<string[]>(
      (startDataGroups as string[]) ?? []
    )
    const [selectedItems, setSelectedItems] = useState<string[]>(
      (startDataItems as string[]) ?? []
    )

    const changeGroup = (checked: boolean, id: string) => {
      if (!checked) {
        const newSelectedGroup = selectedGroups.filter(value => value !== id)
        setSelectedGroups(newSelectedGroup)
        onChooseGroup(newSelectedGroup)
        return
      }

      setSelectedGroups([...selectedGroups, id])
      onChooseGroup([...selectedGroups, id])
    }

    const changeItems = (checked: boolean, id: string) => {
      if (!checked) {
        const newSelectedItems = selectedItems.filter(value => value !== id)
        setSelectedItems(newSelectedItems)
        onChooseItems(newSelectedItems)
        return
      }
      setSelectedItems([...selectedItems, id])
      onChooseItems([...selectedItems, id])
    }

    const changeItemsGroup = (checked: boolean, ids: string[]) => {
      if (!checked) {
        const newSelectedItems = selectedItems.filter(
          value => !ids.includes(value)
        )
        setSelectedItems(newSelectedItems)
        onChooseItems(newSelectedItems)
        return
      }
      setSelectedItems([...new Set([...selectedItems, ...ids])])
      onChooseItems([...new Set([...selectedItems, ...ids])])
    }

    return (
      <>
        {data.map(item => (
          <Group
            key={item.id}
            data={item}
            props={props}
            onChooseGroup={changeGroup}
            onChooseItems={changeItems}
            onChooseItemsGroup={changeItemsGroup}
            clearChanges={clearChanges}
            onClearChanges={onClearChanges}
          />
        ))}
      </>
    )
  }
)
