import { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { customDropDownCell } from '../data'
import { FilterOptions } from '../Utils/FilterOptions'
import { IExecutor } from './interfaces'

export const Executor = memo(
  ({ value, id, incident, responsible }: IExecutor) => {
    const [, { changeExecutor, changeResponsible }] = useIncidents()
    const [{ fieldEngineers, user }] = useAuth()
    const [executor, setExecutor] = useState<Options>({ label: value, id: '' })

    const setData = (data: Options) => {
      if (data.label === executor.label) return

      setExecutor(data)
      const { nameSort, direction, limit, page, filterOptions } =
        FilterOptions()

      changeExecutor({
        id,
        id_incExecutor: data.id,
        incident,
        executor: data.label,
        userID: user.id as string,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      if (!responsible) {
        changeResponsible({
          id,
          id_incResponsible: user.id as string,
          incident,
          responsible: user.shortName as string,
          userID: user.id as string,
          nameSort,
          direction,
          limit,
          page,
          filterOptions,
        })
      }
    }

    useEffect(() => {
      setExecutor({ label: value, id: '' })
    }, [value])

    return (
      <DropDownIncidents
        data={fieldEngineers.map(({ shortName, id }) => {
          return {
            ['label']: shortName as string,
            ['id']: id as string,
          }
        })}
        props={customDropDownCell}
        onChange={setData}
        value={executor.label}
        label="Выберите исполнителя"
        errorLabel="Не выбран исполнитель!"
        disableClearable={false}
      />
    )
  },
)
