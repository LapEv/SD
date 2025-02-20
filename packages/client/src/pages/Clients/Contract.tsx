import { memo, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import { TextField } from 'components/TextFields'
import { ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import { AddValuesAddContract } from 'store/slices/sla/interfaces'
import { MapContractInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Contracts, IContractData } from 'store/slices/contracts/interfaces'
import { convertDateToStringYYYYMMDD } from 'utils/convertDate'
import { isEqualArr } from 'utils/isEqualArr'
import { useContracts } from 'hooks/contracts/useContracts'
import {
  ContractEquipmentList,
  ContractSLAList,
  ContractObjectList,
  ContractIncStatussesList,
} from './'

export const ContractPage = memo(
  ({
    contract,
    id,
    number,
    date,
    notificationEmail,
    SLAs,
    ClassifierEquipments,
    ClassifierModels,
    Objects,
    IncindentStatuses,
    id_client,
  }: Contracts) => {
    const [{ admin }] = useAuth()
    const [, { changeContract }] = useContracts()
    const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
    const [slaDisabled, setSLADisabled] = useState<boolean>(true)
    const [equipmentDisabled, setEquipmentDisabled] = useState<boolean>(true)
    const [modelDisabled, setModelDisabled] = useState<boolean>(true)
    const [dataDisabled, setDataDisabled] = useState<boolean>(true)
    const [objectDisabled, setObjectDisabled] = useState<boolean>(true)
    const [incStatussesDisabled, setIncStatussesDisabled] =
      useState<boolean>(true)
    const [slaID, setSLAID] = useState<string[]>([])
    const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
    const [selectedModels, setSelectedModels] = useState<string[]>([])
    const [objectID, setObjectID] = useState<string[]>([])
    const [incStatussesID, setIncStatussesID] = useState<string[]>([])
    const [clearChanges, setClearChanges] = useState<boolean>(false)
    const [contractData, setContractData] = useState<IContractData>({
      contract,
      id,
      number,
      notificationEmail,
      date: convertDateToStringYYYYMMDD(date),
      id_client,
    })

    const {
      handleSubmit: handleSubmitAddContract,
      control: controlAddContract,
      reset,
    } = useForm<AddValuesAddContract>({
      mode: 'onBlur',
      defaultValues: {
        listAddContract: MapContractInputFields.map(data => ({
          ...data,
          value: contractData[data.name as keyof typeof contractData],
        })),
      },
    })
    const { errors: errorsAddContract } = useFormState({
      control: controlAddContract,
    })
    const { fields: fieldsAddContract } = useFieldArray({
      control: controlAddContract,
      name: 'listAddContract',
    })

    const changeData = ({ listAddContract }: AddValuesAddContract) => {
      changeContract({
        id,
        number: listAddContract[0].value as string,
        date: listAddContract[1].value as string,
        notificationEmail: listAddContract[2].value as string,
        sla: slaID,
        equipment: selectedEquipments,
        model: selectedModels,
        objects: objectID,
        incStatusses: incStatussesID,
      })
      const newSLA = {
        contract,
        id,
        number: listAddContract[0].value as string,
        date: listAddContract[1].value as string,
        notificationEmail: listAddContract[2].value as string,
        id_client,
      }
      setContractData(newSLA)
      setbtnDisabled(true)
      setSLADisabled(true)
      setEquipmentDisabled(true)
      setModelDisabled(true)
      setDataDisabled(true)
      setObjectDisabled(true)
      setIncStatussesDisabled(true)
      setClearChanges(true)
    }

    const checkForChange = (newData: Record<never, never>) => {
      if (!admin) return
      setDataDisabled(deepEqual(newData, contractData as Record<never, never>))
    }

    const onChooseSLAs = (checked: boolean, id: string) => {
      if (checked) {
        const newSLAs = [...slaID]
        newSLAs.push(id)
        setSLADisabled(
          isEqualArr(newSLAs as [], SLAs?.map(({ id }) => id) as []),
        )
        setSLAID(newSLAs)
        return
      }
      const newSLAs = slaID.filter(item => item !== id)
      setSLADisabled(isEqualArr(newSLAs as [], SLAs?.map(({ id }) => id) as []))
      setSLAID(newSLAs)
    }

    const onChooseEquipments = (data: string[]) => {
      setEquipmentDisabled(
        isEqualArr(data as [], ClassifierEquipments?.map(({ id }) => id) as []),
      )
      setSelectedEquipments(data)
    }

    const onChooseModels = (data: string[]) => {
      setModelDisabled(
        isEqualArr(data as [], ClassifierModels?.map(({ id }) => id) as []),
      )
      setSelectedModels(data)
    }

    const onChooseObjects = (checked: boolean, id: string) => {
      if (checked) {
        const newObjects = [...objectID]
        newObjects.push(id)
        setObjectDisabled(
          isEqualArr(newObjects as [], Objects?.map(({ id }) => id) as []),
        )
        setObjectID(newObjects)
        return
      }
      const newObjects = objectID.filter(item => item !== id)
      setObjectDisabled(
        isEqualArr(newObjects as [], Objects?.map(({ id }) => id) as []),
      )
      setObjectID(newObjects)
    }

    const onChooseIncStatusses = (checked: boolean, id: string) => {
      if (checked) {
        const newIncStatusses = [...incStatussesID]
        newIncStatusses.push(id)
        setIncStatussesDisabled(
          isEqualArr(
            newIncStatusses as [],
            IncindentStatuses?.map(({ id }) => id) as [],
          ),
        )
        setIncStatussesID(newIncStatusses)
        return
      }
      const newIncStatusses = incStatussesID.filter(item => item !== id)
      setIncStatussesDisabled(
        isEqualArr(
          newIncStatusses as [],
          IncindentStatuses?.map(({ id }) => id) as [],
        ),
      )
      setIncStatussesID(newIncStatusses)
    }

    const clearChange = () => {
      const newSLA = {
        contract,
        id,
        number,
        notificationEmail,
        date: convertDateToStringYYYYMMDD(date),
        id_client,
      }
      setContractData(newSLA)
      reset({
        listAddContract: MapContractInputFields.map(data => ({
          ...data,
          value: newSLA[data.name as keyof typeof newSLA],
        })),
      })
      setSLAID(SLAs?.map(({ id }) => id) as string[])
      setSelectedEquipments(
        ClassifierEquipments?.map(({ id }) => id) as string[],
      )
      setSelectedModels(ClassifierModels?.map(({ id }) => id) as string[])
      setObjectID(Objects?.map(({ id }) => id) as string[])
      setIncStatussesID(IncindentStatuses?.map(({ id }) => id) as string[])
      setbtnDisabled(true)
      setSLADisabled(true)
      setEquipmentDisabled(true)
      setModelDisabled(true)
      setDataDisabled(true)
      setObjectDisabled(true)
      setIncStatussesDisabled(true)
      setClearChanges(true)
    }

    useEffect(() => {
      setSLAID(SLAs?.map(({ id }) => id) as string[])
      setSelectedEquipments(
        ClassifierEquipments?.map(({ id }) => id) as string[],
      )
      const models = ClassifierEquipments?.map(item => [
        ...(item.ClassifierModels?.map(({ id }) => id) as string[]),
      ])[0]
      setSelectedModels(models as string[])
      setObjectID(Objects?.map(({ id }) => id) as string[])
      setIncStatussesID(IncindentStatuses?.map(({ id }) => id) as string[])
    }, [])

    useEffect(() => {
      if (
        !slaDisabled ||
        !dataDisabled ||
        !equipmentDisabled ||
        !modelDisabled ||
        !objectDisabled ||
        !incStatussesDisabled
      ) {
        setbtnDisabled(false)
        return
      }
      setbtnDisabled(true)
    }, [
      dataDisabled,
      slaDisabled,
      equipmentDisabled,
      modelDisabled,
      objectDisabled,
      incStatussesDisabled,
    ])

    return (
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            width: '95%',
          }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{ flexWrap: 'wrap', width: '100%' }}>
            {fieldsAddContract.map(
              ({ id, name, label, validation, type, required }, index) => {
                return (
                  <Controller
                    key={id}
                    control={controlAddContract}
                    name={`listAddContract.${index}.value`}
                    rules={validation}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        required={required}
                        variant="outlined"
                        sx={{ width: '48%' }}
                        margin="normal"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => (
                          field.onChange(event),
                          checkForChange({
                            ...contractData,
                            ...{ [name]: event.target.value },
                          })
                        )}
                        error={
                          !!(errorsAddContract?.listAddContract ?? [])[index]
                            ?.value?.message
                        }
                        helperText={
                          (errorsAddContract?.listAddContract ?? [])[index]
                            ?.value?.message
                        }
                        inputProps={{ step: 1 }}
                      />
                    )}
                  />
                )
              },
            )}
          </Stack>
        </Box>
        <ContractSLAList slaID={slaID} onChooseItems={onChooseSLAs} />
        <ContractEquipmentList
          equipmentID={selectedEquipments}
          modelID={selectedModels}
          onChooseGroup={onChooseEquipments}
          onChooseItems={onChooseModels}
          clearChanges={clearChanges}
          onClearChanges={setClearChanges}
        />
        <ContractObjectList
          objectID={objectID}
          onChooseItems={onChooseObjects}
        />
        <ContractIncStatussesList
          incStatussesID={incStatussesID}
          onChooseItems={onChooseIncStatusses}
        />
        <ButtonsSection
          onClick={handleSubmitAddContract(changeData)}
          btnSecondHandle={clearChange}
          btnName="Сохранить"
          btnDisabled={btnDisabled}
          btnSecondDisabled={btnDisabled}
          btnSecondName="Отменить изменения"
        />
      </Box>
    )
  },
)
