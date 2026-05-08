import { MuiDiv } from 'components/MUI'
import { IEditDataINC } from '../../interfaces'
import { Options } from 'components/DropDown/interface'
import { DropDownINConEdit } from 'components/DropDown'
import { useIncidents } from 'hooks/incidents/useINC'
import { useEffect, useMemo } from 'react'
import { CellINC } from './CellINC'
import { CellINCActs } from './CellINCActs'

export const CompleteData = ({ newINC, setNewINC }: IEditDataINC) => {
  const [{ typesCompletedWork }, { getTypesCompletedWork }] = useIncidents()

  useEffect(() => {
    if (!typesCompletedWork.length) {
      getTypesCompletedWork()
    }
  }, [])

  const listTypesCompletedWork = useMemo(() => {
    return typesCompletedWork
      .map(({ typeCompletedWork, id }) => {
        return { label: typeCompletedWork, id }
      })
      .sort((arr1, arr2) =>
        (arr1.label as string) > (arr2.label as string) ? 1 : -1,
      )
  }, [typesCompletedWork])

  return (
    <>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Тип решения: '}</MuiDiv>
        <DropDownINConEdit
          data={listTypesCompletedWork as Options[]}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              typeCompletedWork: label,
              id_typeCompletedWork: id,
            })
          }
          value={newINC.typeCompletedWork ?? ''}
        />
      </MuiDiv>
      <CellINCActs
        label={'Акты: '}
        value={newINC.act && newINC.act.length > 0 ? newINC.act.join(', ') : ''}
        files={newINC.Files}
        idINC={newINC.id}
      />
      <CellINC
        label={'ЗИП: '}
        value={
          newINC.spaceParts && newINC.spaceParts.length > 0
            ? newINC.spaceParts.join(', ')
            : ''
        }
      />
      <CellINC label={'Оценка: '} value={newINC.rating} />
    </>
  )
}
