import { MuiDiv } from 'components/MUI'
import { IEditDataINC } from '../../interfaces'
import { CellINC } from './CellINC'
import { DropDownINConEdit } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { emptyExecutor, emptyResponsible } from '../../data'
import { useMemo } from 'react'
import { useAuth } from 'hooks/auth/useAuth'

export const UserData = ({ newINC, setNewINC }: IEditDataINC) => {
  const [{ fieldEngineers, dispatchers, user }] = useAuth()

  const listExecutor = useMemo(() => {
    return [emptyExecutor, ...fieldEngineers, ...dispatchers]
      .map(({ shortName, id }) => {
        return { label: shortName, id }
      })
      .sort((arr1, arr2) =>
        (arr1.label as string) > (arr2.label as string) ? 1 : -1,
      )
  }, [fieldEngineers, dispatchers])

  const listResponsible = useMemo(() => {
    return [emptyResponsible, user, ...dispatchers]
      .map(({ shortName, id }) => {
        return { label: shortName, id }
      })
      .sort((arr1, arr2) =>
        (arr1.label as string) > (arr2.label as string) ? 1 : -1,
      )
  }, [dispatchers])

  return (
    <>
      <CellINC label={'Кто принял: '} value={newINC.userAccepted} />
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Исполнитель: '}</MuiDiv>
        <DropDownINConEdit
          data={listExecutor as Options[]}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              executor: id === emptyExecutor.id ? '' : label,
              id_incExecutor: id,
            })
          }
          value={newINC.executor ?? ''}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Ответственный: '}</MuiDiv>
        <DropDownINConEdit
          data={listResponsible as Options[]}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              responsible: id === emptyResponsible.id ? '' : label,
              id_incResponsible: id,
            })
          }
          value={newINC.responsible ?? ''}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Перевёл в вып: '}</MuiDiv>
        <DropDownINConEdit
          data={listResponsible as Options[]}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              userClosingCheck: id === emptyResponsible.id ? '' : label,
              id_incClosingCheck: id,
            })
          }
          value={newINC.userClosingCheck ?? ''}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Закрыл: '}</MuiDiv>
        <DropDownINConEdit
          data={listResponsible as Options[]}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              userClosing: id === emptyResponsible.id ? '' : label,
              id_incClosing: id,
            })
          }
          value={newINC.userClosing ?? ''}
        />
      </MuiDiv>
    </>
  )
}
