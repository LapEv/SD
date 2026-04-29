import { MuiDiv } from 'components/MUI'
import { IEditDataINC } from '../../interfaces'
import { DropDownINConEdit } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useEffect, useMemo, useState } from 'react'
import { useContracts } from 'hooks/contracts/useContracts'
import { DateTimePickerFieldEditINC } from 'components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getSLATime } from 'utils/getSLATime'
import { SLA } from 'store/slices/sla/interfaces'
import 'dayjs/locale/ru'

export const ContractData = ({ newINC, setNewINC }: IEditDataINC) => {
  const [{ contracts }, { getContracts }] = useContracts()
  const [dateValue, setDateValue] = useState<string | Dayjs>(
    dayjs(newINC?.timeSLA as string),
  )

  useEffect(() => {
    if (!contracts.length) {
      getContracts()
    }
  }, [])

  const setDateINC = (value: string | Dayjs) => {
    setNewINC({
      ...newINC,
      timeSLA: dayjs(value).toISOString(),
    })
    setDateValue(value)
  }

  const setSLAData = ({ label, id }: Options) => {
    const activeContract = contracts.find(
      ({ id }) => id === newINC.id_incContract,
    )
    const { days, time, timeEnd, timeStart } = activeContract?.SLAs?.find(
      item => item.id === id,
    ) as SLA
    const timeSLA = getSLATime({
      days,
      time,
      timeEnd,
      timeStart,
      timeRegistration: newINC.timeRegistration,
    })
    setDateValue(dayjs(timeSLA))
    setNewINC({
      ...newINC,
      timeSLA: timeSLA.toISOString(),
      sla: label,
      id_incSLA: id,
    })
  }

  const listContracts = useMemo(
    () =>
      contracts.filter(({ id_client }) => id_client === newINC?.id_incClient),

    [contracts, newINC],
  )

  const listEquipments = useMemo(
    () =>
      listContracts.length
        ? listContracts.filter(({ id }) => id === newINC?.id_incContract)[0]
            .ClassifierEquipments
        : [],
    [contracts, listContracts, newINC],
  )

  const listModels = useMemo(
    () =>
      listEquipments?.length && newINC?.id_incEquipment
        ? listEquipments.filter(({ id }) => id === newINC?.id_incEquipment)[0]
            .ClassifierModels
        : [],
    [contracts, listEquipments, newINC],
  )

  const listTypicalMalfunctions = useMemo(
    () =>
      listModels?.length && newINC?.id_incModel
        ? listModels.filter(({ id }) => id === newINC?.id_incModel)[0]
            .TypicalMalfunctions
        : [],
    [contracts, listModels, newINC],
  )

  const listTypeSLA = useMemo(
    () =>
      listContracts.length
        ? listContracts.filter(({ id }) => id === newINC?.id_incContract)[0]
            .SLAs
        : [],
    [contracts, listContracts, newINC],
  )

  useEffect(() => {
    setDateValue(dayjs(newINC?.timeSLA as string))
  }, [newINC?.timeSLA])

  return (
    <>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Контракт: '}</MuiDiv>
        <DropDownINConEdit
          data={listContracts.map(({ contract, id }) => {
            return {
              ['label']: contract,
              ['id']: id as string,
            }
          })}
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              contract: label,
              id_incContract: id,
              equipment: '',
              id_incEquipment: '',
              model: '',
              id_incModel: '',
              typicalMalfunction: '',
              id_incTypicalMalfunction: '',
            })
          }
          value={newINC.contract}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Классификатор: '}</MuiDiv>
        <DropDownINConEdit
          data={
            listEquipments?.map(({ equipment, id }) => {
              return {
                ['label']: equipment,
                ['id']: id as string,
              }
            }) as Options[]
          }
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              equipment: label,
              id_incEquipment: id,
              model: '',
              id_incModel: '',
              typicalMalfunction: '',
              id_incTypicalMalfunction: '',
            })
          }
          value={newINC.equipment}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Модель: '}</MuiDiv>
        <DropDownINConEdit
          data={
            listModels?.map(({ model, id }) => {
              return {
                ['label']: model,
                ['id']: id as string,
              }
            }) as Options[]
          }
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              model: label,
              id_incModel: id,
              typicalMalfunction: '',
              id_incTypicalMalfunction: '',
            })
          }
          value={newINC.model}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Проблема: '}</MuiDiv>
        <DropDownINConEdit
          data={
            listTypicalMalfunctions?.map(({ typicalMalfunction, id }) => {
              return {
                ['label']: typicalMalfunction,
                ['id']: id as string,
              }
            }) as Options[]
          }
          classNameLi="dd_li_onedit"
          onChange={({ label, id }) =>
            setNewINC({
              ...newINC,
              typicalMalfunction: label,
              id_incTypicalMalfunction: id,
            })
          }
          value={newINC.typicalMalfunction}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Тип SLA: '}</MuiDiv>
        <DropDownINConEdit
          data={
            listTypeSLA?.map(({ sla, id }) => {
              return {
                ['label']: sla,
                ['id']: id as string,
              }
            }) as Options[]
          }
          classNameLi="dd_li_onedit"
          onChange={setSLAData}
          value={newINC.sla}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'SLA: '}</MuiDiv>
        <DateTimePickerFieldEditINC
          dateValue={dateValue as Dayjs}
          setDateValue={setDateINC}
          className={'datePickerFilterEditINC'}
        />
      </MuiDiv>
    </>
  )
}
