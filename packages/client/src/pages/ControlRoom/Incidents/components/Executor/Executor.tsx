import { memo, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownINConTable, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from '../../interfaces'
import { emptyExecutor } from '../../data'

export const Executor = memo(
  ({ value, id, incident, responsible }: IExecutor) => {
    const [, { changeExecutor, changeResponsible }] = useIncidents()
    const [{ fieldEngineers, dispatchers, user }] = useAuth()
    const [executor, setExecutor] = useState<Options>(emptyOptionsDD)

    const setData = (data: Options) => {
      if (data.label === executor.label) return

      const _data = data.id !== emptyExecutor.id ? data : { id: '', label: '' }
      changeExecutor({
        id,
        id_incExecutor: _data.id,
        incident,
        executor: _data.label,
        userID: user.id as string,
        userShortName: user.shortName as string,
      })
      if (!responsible) {
        changeResponsible({
          id,
          id_incResponsible: user.id as string,
          incident,
          responsible: user.shortName as string,
          userID: user.id as string,
          notImportant: true,
          userShortName: user.shortName as string,
        })
      }
    }

    const list = useMemo(() => {
      return [emptyExecutor, ...fieldEngineers, ...dispatchers]
        .map(({ shortName, id }) => {
          return { label: shortName, id }
        })
        .sort((arr1, arr2) =>
          (arr1.label as string) > (arr2.label as string) ? 1 : -1,
        )
    }, [fieldEngineers, dispatchers])

    useEffect(() => {
      const user = list.find(({ label }) => label === value) as Options
      if (user) {
        setExecutor({ label: user.label, id: user.id })
      }
      if (!value) {
        setExecutor({ label: '', id: '' })
      }
    }, [value, list])

    return (
      <DropDownINConTable
        data={list.map(({ label, id }) => {
          return {
            ['label']: label as string,
            ['id']: id as string,
          }
        })}
        onChange={setData}
        value={executor.label}
      />
    )
  },
)
