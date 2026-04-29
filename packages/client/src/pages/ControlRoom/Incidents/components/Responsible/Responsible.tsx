import { memo, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownINConTable, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IResponsible } from '../../interfaces'
import { emptyResponsible } from '../../data'

export const Responsible = memo(({ value, id, incident }: IResponsible) => {
  const [, { changeResponsible }] = useIncidents()
  const [{ dispatchers, user }] = useAuth()
  const [responsible, setResponsible] = useState<Options>(emptyOptionsDD)

  const setData = (data: Options) => {
    if (data.label === responsible.label) return

    const _data = data.id !== emptyResponsible.id ? data : { id: '', label: '' }
    changeResponsible({
      id,
      id_incResponsible: _data.id,
      incident,
      responsible: _data.label,
      userID: user.id as string,
      userShortName: user.shortName as string,
    })
  }

  const list = useMemo(() => {
    return [emptyResponsible, user, ...dispatchers]
      .map(({ shortName, id }) => {
        return { label: shortName, id }
      })
      .sort((arr1, arr2) =>
        (arr1.label as string) > (arr2.label as string) ? 1 : -1,
      )
  }, [dispatchers])

  useEffect(() => {
    const user = list.find(({ label }) => label === value) as Options
    if (user) {
      setResponsible({ label: user.label, id: user.id })
    }
    if (!value) {
      setResponsible({ label: '', id: '' })
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
      value={responsible.label}
    />
  )
})
