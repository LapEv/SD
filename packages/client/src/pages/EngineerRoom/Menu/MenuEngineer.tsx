import { MuiDiv } from 'components/MUI'
import { FilterEngineer } from './FilterEngineer'
import { useApp } from 'hooks/app/useApp'
import { Divider } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { useEffect, useState } from 'react'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { useEngineer } from 'hooks/engineer/useEngineer'
import { SettingsEngineer } from './SettingsEngineer'
import { SortEngineer } from './SortEngineer'
import { IMenuEngineer } from '../interfaces'

export const MenuEngineer = ({ filtered }: IMenuEngineer) => {
  const [{ device }] = useApp()
  const [{ incStatuses }] = useIncidents()
  const [{ filterEngineerStatus }, { changeFilterStatus }] = useEngineer()
  const [dataGroup, setDataGroup] = useState<DataList[]>([])

  const onChooseItems = (check: boolean, item: DataList) => {
    const newGroup = dataGroup.map(value =>
      value.id === item.id ? { ...value, initChecked: check } : value,
    )
    const newFilter = newGroup
      .map(({ id, initChecked }) => (initChecked ? id : ''))
      .filter(item => item)
    changeFilterStatus(newFilter)
    setDataGroup(newGroup)
  }

  useEffect(() => {
    const data = incStatuses
      .filter(
        ({ statusINC }) =>
          statusINC === 'В работе' ||
          statusINC === 'Выполнено' ||
          statusINC === 'Решён' ||
          statusINC === 'Закрыт',
      )
      .map(({ statusINC, id }) => {
        return {
          name: statusINC,
          id: id,
          initChecked: filterEngineerStatus.includes(id),
        }
      })
    setDataGroup(data)
  }, [incStatuses])

  if (device === 'mobile') {
    return (
      <MuiDiv className="boxMenuEngineerMobile">
        <FilterEngineer dataGroup={dataGroup} onChooseItems={onChooseItems} />
        <SortEngineer />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ ml: 2, mr: 2 }}
        />
        <SettingsEngineer filtered={filtered} />
      </MuiDiv>
    )
  }

  return (
    <>
      <MuiDiv className="boxMenuEngineer">
        <SettingsEngineer filtered={filtered} />
      </MuiDiv>
      <MuiDiv className="boxFilterEngineer">
        <SortEngineer />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ ml: 2, mr: 2 }}
        />
        {dataGroup.map(({ name, id, initChecked }) => (
          <Item
            name={name}
            id={`${id}`}
            groupChecked={null}
            onChooseItems={check =>
              onChooseItems(check, { name, id, initChecked })
            }
            initChecked={initChecked}
            key={`${id}`}
            className="w_auto"
          />
        ))}
      </MuiDiv>
      <Divider
        orientation="horizontal"
        variant="middle"
        flexItem
        sx={{ ml: 2, mr: 2 }}
      />
    </>
  )
}
