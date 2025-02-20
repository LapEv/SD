import { Box, Stack } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { TextField } from 'components/TextFields'
import { ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import {
  IServiceListDataPage,
  SLAList,
  SLAValues,
} from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { MapOLAViewInputFields, MapSLAViewInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Options } from 'components/DropDown/interface'
import { DropDown, emptyValue } from 'components/DropDown'
import { useIncidents } from 'hooks/incidents/useINC'

export const SLAPage = memo(
  ({
    sla,
    ola,
    days,
    time,
    timeStart,
    timeEnd,
    id,
    id_typeOfWork,
    TypesOfWork,
  }: IServiceListDataPage) => {
    const [, { changeSLA, changeOLA }] = useSLA()
    const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
    const [{ admin }] = useAuth()
    const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
    const [listTypes, setListTypes] = useState<Options[]>([])
    const [selectedType, setSelectedType] = useState<Options>(emptyValue)
    const [slaData, setSlaData] = useState<SLAList>(
      sla
        ? {
            sla,
            days,
            time,
            timeStart,
            timeEnd,
            id,
            id_typeOfWork,
            TypesOfWork,
          }
        : {
            ola,
            days,
            time,
            timeStart,
            timeEnd,
            id,
            id_typeOfWork,
            TypesOfWork,
          },
    )

    const fieldsData = sla ? MapSLAViewInputFields : MapOLAViewInputFields

    const { handleSubmit, control, reset } = useForm<SLAValues>({
      mode: 'onBlur',
      defaultValues: {
        list: fieldsData.map(data => ({
          ...data,
          value: slaData[data.name as keyof typeof slaData],
        })),
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: SLAValues) => {
      if (sla) {
        changeSLA({
          sla: list[0].value as string,
          days: list[1].value as string,
          time: list[2].value as string,
          timeStart: list[3].value as string,
          timeEnd: list[4].value as string,
          id,
          id_typeOfWork: selectedType.id,
        })
      }
      if (ola) {
        changeOLA({
          ola: list[0].value as string,
          days: list[1].value as string,
          time: list[2].value as string,
          timeStart: list[3].value as string,
          timeEnd: list[4].value as string,
          id,
          id_typeOfWork: selectedType.id,
        })
      }
    }

    const checkForChange = (newData: Record<never, never>) => {
      if (!admin) return
      setbtnDisabled(deepEqual(newData, slaData as Record<never, never>))
    }

    const clearChange = () => {
      setbtnDisabled(true)
      const newSLA = sla
        ? {
            sla,
            days,
            time,
            timeStart,
            timeEnd,
            id,
            id_typeOfWork: selectedType.id,
            TypesOfWork,
          }
        : {
            ola,
            days,
            time,
            timeStart,
            timeEnd,
            id,
            id_typeOfWork: selectedType.id,
            TypesOfWork,
          }
      setSlaData(newSLA)
      reset({
        list: fieldsData.map(data => ({
          ...data,
          value: newSLA[data.name as keyof typeof newSLA],
        })),
      })
      setSelectedType({
        label: TypesOfWork?.typeOfWork as string,
        id: TypesOfWork?.id as string,
      })
    }

    const changeSelectedTypes = (data: Options) => {
      if (!data) return
      setSelectedType(data)
      checkForChange({
        ...slaData,
        ...{
          TypesOfWork: {
            ...TypesOfWork,
            id: data.id,
            typeOfWork: data.label,
          },
        },
      })
    }

    useEffect(() => {
      const list = typesOfWork.map(({ typeOfWork, id }) => {
        return {
          label: typeOfWork,
          id: id as string,
        }
      })
      setListTypes(list)
      setSelectedType({
        label: TypesOfWork?.typeOfWork as string,
        id: TypesOfWork?.id as string,
      })
    }, [typesOfWork])

    useEffect(() => {
      getTypesOfWork()
    }, [])

    return (
      <Box
        component="form"
        onSubmit={handleSubmit(changeData)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
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
            sx={{ flexWrap: 'wrap', width: '100%' }}>
            {fields.map(
              ({ id, name, label, validation, type, required }, index) => {
                return (
                  <Controller
                    key={id}
                    control={control}
                    name={`list.${index}.value`}
                    rules={validation}
                    render={({ field }) =>
                      name !== 'TypeOfWork' ? (
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          required={required ?? true}
                          variant="outlined"
                          sx={{ width: '48%' }}
                          margin="normal"
                          onChange={(event: ChangeEvent<HTMLInputElement>) => (
                            field.onChange(
                              name !== 'days'
                                ? event.target.value
                                : event.target.valueAsNumber,
                            ),
                            checkForChange({
                              ...slaData,
                              ...{
                                [name]:
                                  name !== 'days'
                                    ? event.target.value
                                    : event.target.valueAsNumber,
                              },
                            })
                          )}
                          error={!!(errors?.list ?? [])[index]?.value?.message}
                          helperText={
                            (errors?.list ?? [])[index]?.value?.message
                          }
                          inputProps={{ step: 1 }}
                        />
                      ) : (
                        <DropDown
                          data={listTypes}
                          props={{ width: '48%', mt: 1 }}
                          onChange={data => changeSelectedTypes(data)}
                          value={selectedType.label || ''}
                          label="Выберите тип работ"
                          errorLabel="Не выбран тип работ!"
                        />
                      )
                    }
                  />
                )
              },
            )}
          </Stack>
        </Box>
        <ButtonsSection
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
