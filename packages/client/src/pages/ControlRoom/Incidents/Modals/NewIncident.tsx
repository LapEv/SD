import React, { useEffect, useState, memo } from 'react'
import { Stack, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  MultiTextFieldIncident,
  TextFieldIncidents,
} from 'components/TextFields'
import { ButtonsModalSection } from 'components/Buttons'
import { MapINCInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { DropDownINC, emptyOptionsDD } from 'components/DropDown'
import { useClients } from 'hooks/clients/useClients'
import { Options } from 'components/DropDown/interface'
import { useContracts } from 'hooks/contracts/useContracts'
import { Contracts } from 'store/slices/contracts/interfaces'
import { SLA } from 'store/slices/sla/interfaces'
import { DateTimePickerFieldEditINC } from 'components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getSLATime } from 'utils/getSLATime'
import { useAuth } from 'hooks/auth/useAuth'
import { AddValuesProps, ChooseModalProps, methodsReuqest } from '../interfaces'
import { BoxModal } from 'components/MUI'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const NewIncident = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ user }] = useAuth()
      const [{ clients }, { getClients }] = useClients()
      const [{ contracts }, { getContracts }] = useContracts()
      const [{ typesOfWork, incStatuses }, { getTypesOfWork, newINC }] =
        useIncidents()
      const [{ timeInterval }] = useTableINC()
      const [clientsList, setClientsList] = useState<Options[]>([])
      const [selectedClient, setSelectedClient] =
        useState<Options>(emptyOptionsDD)
      const [activeContract, setActiveContract] = useState<Contracts | null>(
        null,
      )
      const [contractList, setContractList] = useState<Options[]>([])
      const [selectedContract, setSelectedContract] =
        useState<Options>(emptyOptionsDD)
      const [objectList, setObjectList] = useState<Options[]>([])
      const [selectedObject, setSelectedObject] =
        useState<Options>(emptyOptionsDD)
      const [dateValue, setDateValue] = useState<string | Dayjs>(dayjs())
      const [slaDiff, setSLADiff] = useState<number>(0)
      const [slaList, setSLAList] = useState<Options[]>([])
      const [selectedSLA, setSelectedSLA] = useState<Options>(emptyOptionsDD)
      const [typeOfWorkList, setTypeOfWorkList] = useState<Options[]>([])
      const [selectedTypeOfWork, setSelectedTypeOfWork] =
        useState<Options>(emptyOptionsDD)
      const [equipmentList, setEquipmentList] = useState<Options[]>([])
      const [selectedEquipment, setSelectedEquipment] =
        useState<Options>(emptyOptionsDD)
      const [modelList, setModelList] = useState<Options[]>([])
      const [selectedModel, setSelectedModel] =
        useState<Options>(emptyOptionsDD)
      const [typicalMalfunctionList, setTypicalMalfunctionList] = useState<
        Options[]
      >([])
      const [selectedTypicalMalfunction, setSelectedTypicalMalfunction] =
        useState<Options>(emptyOptionsDD)

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapINCInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        const id_incStatus = incStatuses.find(item =>
          item.statusINC.includes('Зарегистрирован'),
        )?.id as string

        const newINCobject = {
          clientID: selectedClient.id,
          contractID: selectedContract.id,
          objectID: selectedObject.id,
          SLAID: selectedSLA.id,
          typeOfWorkID: selectedTypeOfWork.id,
          slaDiff,
          id_incStatus,
          clientINC: list[10].value,
          responsibleID: user.id as string,
          equipmentId: selectedEquipment.id,
          modelId: selectedModel.id,
          typicalMalfunctionID: selectedTypicalMalfunction.id,
          description: list[6].value,
          comment: list[13].value,
          applicant: list[11].value,
          applicantContacts: list[12].value,
          methodsReuqest: methodsReuqest.manually,
          timeInterval,
        }
        newINC(newINCobject)
        handleModal(false)
      }

      useEffect(() => {
        setContractList([])
        if (!clients.length) {
          getClients()
          getContracts()
          getTypesOfWork()
          return
        }
        const count = contracts.reduce(
          (acc, item) =>
            !acc.includes(item.id_client) ? [...acc, item.id_client] : acc,
          [] as string[],
        ).length
        if (!contracts.length || count === 1) {
          getContracts()
        }
        if (!typesOfWork.length) {
          getTypesOfWork()
        }
      }, [])

      const setClient = (data: Options) => {
        setSelectedClient(emptyOptionsDD)
        setSelectedContract(emptyOptionsDD)
        setContractList([])
        if (!data.id) {
          return
        }
        setSelectedClient(data)
        const listContracts = contracts
          .filter(({ id_client }) => id_client === data.id)
          .map(({ contract, id }) => {
            return {
              label: contract,
              id: id as string,
            }
          })
        setContractList(listContracts)
        setSelectedObject(emptyOptionsDD)
        setSelectedEquipment(emptyOptionsDD)
        setSelectedModel(emptyOptionsDD)
        setSelectedTypicalMalfunction(emptyOptionsDD)
        setSelectedSLA(emptyOptionsDD)
        setSelectedTypeOfWork(emptyOptionsDD)
      }

      useEffect(() => {
        const list = clients.map(({ client, id }) => {
          return {
            label: client,
            id: id as string,
          }
        })
        setClientsList(list)
      }, [clients])

      useEffect(() => {
        const listTypesOfWork = typesOfWork.map(({ typeOfWork, id }) => {
          return {
            label: typeOfWork,
            id: id as string,
          }
        })
        setTypeOfWorkList(listTypesOfWork)
      }, [typesOfWork])

      const setContract = (data: Options) => {
        setSelectedContract(data)
        if (data.id) {
          const contract = contracts.filter(({ id }) => id === data.id)[0]
          setActiveContract(contract)
          const listObjects = contract.Objects?.map(
            ({ object, id, internalClientName, internalClientID }) => {
              return {
                label: object,
                id: id as string,
                description: internalClientName ?? '',
                descriptionID: internalClientID ?? '',
              }
            },
          ) as Options[]
          setObjectList(listObjects)
          const listSLAs = contract.SLAs?.map(({ sla, id }) => {
            return {
              label: sla,
              id: id as string,
            }
          }) as Options[]
          setSLAList(listSLAs)
          const listEquipment = contract.ClassifierEquipments?.map(
            ({ equipment, id }) => {
              return {
                label: equipment,
                id: id as string,
              }
            },
          ) as Options[]
          setEquipmentList(listEquipment)
        } else {
          setActiveContract(null)
          setObjectList([])
          setEquipmentList([])
          setModelList([])
          setTypicalMalfunctionList([])
          setSLAList([])
          setTypeOfWorkList([])
        }
        setSelectedObject(emptyOptionsDD)
        setSelectedEquipment(emptyOptionsDD)
        setSelectedModel(emptyOptionsDD)
        setSelectedTypicalMalfunction(emptyOptionsDD)
        setSelectedSLA(emptyOptionsDD)
        setSelectedTypeOfWork(emptyOptionsDD)
      }

      const setSLA = (data: Options) => {
        setSelectedSLA(data)
        if (!data.id) {
          setSelectedTypeOfWork(emptyOptionsDD)
          setTypeOfWorkList([])
          setDateValue(dayjs())
          return
        }
        const slaData = activeContract?.SLAs?.find(item => item.id === data.id)
        const getTypeOfWork = slaData?.TypesOfWork
        const { days, time, timeEnd, timeStart } = slaData as SLA
        setSelectedTypeOfWork({
          label: getTypeOfWork?.typeOfWork as string,
          id: getTypeOfWork?.id as string,
        })
        const { slaTS, slaDiff } = getSLATime({
          days,
          time,
          timeEnd,
          timeStart,
        })
        setDateValue(dayjs(slaTS))
        setSLADiff(slaDiff)
      }

      const setEquimpent = (data: Options) => {
        setSelectedEquipment(data)
        if (data.id) {
          const activeEquipment = activeContract?.ClassifierEquipments?.filter(
            item => item.id === data.id,
          )[0]
          const listModels = activeEquipment?.ClassifierModels?.map(
            ({ model, id }) => {
              return {
                label: model,
                id: id as string,
              }
            },
          ) as Options[]
          setModelList(listModels)
          setSelectedModel(emptyOptionsDD)
          setSelectedTypicalMalfunction(emptyOptionsDD)
        } else {
          setModelList([])
          setSelectedModel(emptyOptionsDD)
          setSelectedEquipment(emptyOptionsDD)
          setSelectedTypicalMalfunction(emptyOptionsDD)
          setTypicalMalfunctionList([])
        }
      }

      const setModel = (data: Options) => {
        setSelectedModel(data)
        if (data.id) {
          const activeEquipment = activeContract?.ClassifierEquipments?.filter(
            item => item.id === selectedEquipment.id,
          )[0]
          const activeModel = activeEquipment?.ClassifierModels?.filter(
            item => item.id === data.id,
          )[0]
          const listTypical = activeModel?.TypicalMalfunctions?.map(
            ({ typicalMalfunction, id }) => {
              return {
                label: typicalMalfunction,
                id: id as string,
              }
            },
          ) as Options[]
          setTypicalMalfunctionList(listTypical)
          setSelectedTypicalMalfunction(emptyOptionsDD)
        } else {
          setTypicalMalfunctionList([])
          setSelectedModel(emptyOptionsDD)
          setSelectedTypicalMalfunction(emptyOptionsDD)
        }
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer newINC'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'} className={'newINC'}>
            {title}
          </Typography>
          <Stack direction="column" useFlexGap className={'newINC'}>
            {fields.map(
              (
                { id, name, label, validation, type, required, tabIndex },
                index,
              ) => {
                return (
                  <Controller
                    key={`${label}_${id}`}
                    control={control}
                    name={`list.${index}.value`}
                    rules={validation}
                    render={({ field }) => {
                      if (name === 'client') {
                        return (
                          <DropDownINC
                            data={clientsList}
                            className={'dropdownCellsNewINC'}
                            onChange={setClient}
                            value={selectedClient.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран клиент!"
                          />
                        )
                      }
                      if (name === 'contract') {
                        return (
                          <DropDownINC
                            data={contractList}
                            className={'dropdownCellsNewINC'}
                            onChange={setContract}
                            value={selectedContract.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран контракт!"
                          />
                        )
                      }
                      if (name === 'object') {
                        return (
                          <DropDownINC
                            data={objectList}
                            className={'dropdownCellsNewINC'}
                            onChange={setSelectedObject}
                            value={selectedObject.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран объект!"
                          />
                        )
                      }
                      if (name === 'sla') {
                        return (
                          <DropDownINC
                            data={slaList}
                            className={'dropdownCellsNewINC'}
                            onChange={setSLA}
                            value={selectedSLA.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран SLA!"
                          />
                        )
                      }
                      if (name === 'typeOfWork') {
                        return (
                          <DropDownINC
                            data={typeOfWorkList}
                            className={'dropdownCellsNewINC'}
                            onChange={setSelectedTypeOfWork}
                            value={selectedTypeOfWork.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран тип работ!"
                          />
                        )
                      }
                      if (name === 'equipment') {
                        return (
                          <DropDownINC
                            data={equipmentList}
                            className={'dropdownCellsNewINC'}
                            onChange={setEquimpent}
                            value={selectedEquipment.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбран классификатор!"
                          />
                        )
                      }
                      if (name === 'model') {
                        return (
                          <DropDownINC
                            data={modelList}
                            className={'dropdownCellsNewINC'}
                            onChange={setModel}
                            value={selectedModel.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбрана модель!"
                          />
                        )
                      }
                      if (name === 'typicalMalfunction') {
                        return (
                          <DropDownINC
                            data={typicalMalfunctionList}
                            className={'dropdownCellsNewINC'}
                            onChange={setSelectedTypicalMalfunction}
                            value={selectedTypicalMalfunction.label || ''}
                            label={label}
                            tabIndex={tabIndex}
                            errorLabel="Не выбрана типовая неисправность!"
                          />
                        )
                      }
                      if (name === 'timeSLA') {
                        return (
                          <DateTimePickerFieldEditINC
                            dateValue={dateValue as Dayjs}
                            setDateValue={setDateValue}
                            label={'Выберите дату'}
                            className={'datePickerFilter newINC'}
                          />
                        )
                      }
                      if (name === 'description' || name === 'comments') {
                        return (
                          <MultiTextFieldIncident
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type}
                            required={required ?? true}
                            variant="outlined"
                            className={'textMultiCellsNewINC'}
                            margin="normal"
                            multiline
                            maxRows={3}
                            value={field.value || ''}
                            error={
                              !!(errors?.list ?? [])[index]?.value?.message
                            }
                            helperText={
                              (errors?.list ?? [])[index]?.value?.message
                            }
                            slotProps={{
                              input: {
                                tabIndex,
                              },
                            }}
                          />
                        )
                      }
                      return (
                        <TextFieldIncidents
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          required={required ?? true}
                          variant="outlined"
                          sx={{ width: '100%' }}
                          className={'textCellsNewINC'}
                          margin="normal"
                          value={field.value || ''}
                          error={!!(errors?.list ?? [])[index]?.value?.message}
                          helperText={
                            (errors?.list ?? [])[index]?.value?.message
                          }
                        />
                      )
                    }}
                  />
                )
              },
            )}
          </Stack>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)
