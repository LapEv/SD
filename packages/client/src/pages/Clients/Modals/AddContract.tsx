import React, { memo, useEffect, useState } from 'react'
import {
  Typography,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapNewContractInputFields } from '../data'
import { ButtonsModalSection, RotateButton } from 'components/Buttons'
import { useMessage } from 'hooks/message/useMessage'
import { useContracts } from 'hooks/contracts/useContracts'
import { DateField } from 'components/DatePicker'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Options } from 'components/DropDown/interface'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, DropDownMultiple, emptyOptionsDD } from 'components/DropDown'
import { useObjects } from 'hooks/objects/useObjects'
import { useClients } from 'hooks/clients/useClients'
import { convetStringToDate } from 'utils/convertDate'
import dayjs, { Dayjs } from 'dayjs'
import {
  DataList,
  ICheckBoxGroupData,
} from 'components/CheckBoxGroup/interface'
import { CheckBoxGroups, Item } from 'components/CheckBoxGroup'
import { BoxModal } from 'components/MUI'

export const AddContract = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { setMessage }] = useMessage()
      const [openList, setOpenList] = useState(false)
      const [openListObjects, setOpenListObjects] = useState(false)
      const [{ clients }, { getClients }] = useClients()
      const [{ contracts }, { getContracts, newContract }] = useContracts()
      const [{ equipments }, { getClassifierEquipments }] = useClassifier()
      const [{ sla }, { getSLA }] = useSLA()
      const [{ objects }, { getObjects }] = useObjects()
      const [client, setClient] = useState<Options>(emptyOptionsDD)
      const [slaList, setSLAList] = useState<Options[]>([])
      const [objectList, setObjectList] = useState<DataList[]>([])
      const [selectedObjects, setSelectedObjects] = useState<string[]>([])
      const [equipmentList, setEquipmentList] = useState<ICheckBoxGroupData[]>(
        [],
      )
      const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
      const [selectedModels, setSelectedModels] = useState<string[]>([])
      const [errSLA, setErrSLA] = useState<boolean>(false)
      const [dateValue, setDateValue] = useState<string | Dayjs>(dayjs())
      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewContractInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        const isExist = contracts.find(item => item.contract === list[0].value)
        if (isExist) {
          setMessage({
            text: 'Такой контракт уже существует',
            type: 'error',
          })
          return
        }
        if (!slaList.length) {
          setErrSLA(true)
          return
        }
        const date = convetStringToDate(
          dayjs(dateValue).format('DD/MM/YYYY'),
          '/',
        ) as string
        newContract({
          contract: list[0].value,
          number: list[1].value,
          date: date,
          sla: slaList.map(item => item.id),
          equipment: selectedEquipments,
          model: selectedModels,
          objects: selectedObjects,
          id_client: client.id,
          notificationEmail: '',
        })
        handleModal(false)
      }

      useEffect(() => {
        getContracts()
        getClients()
        getClassifierEquipments()
        getSLA()
        getObjects()
      }, [])

      useEffect(() => {
        const data = equipments.map(({ equipment, id, ClassifierModels }) => {
          return {
            id: id as string,
            group: equipment,
            checkedGroup: selectedEquipments.includes(id as string),
            items: ClassifierModels?.map(({ model, id }) => {
              return {
                item: model,
                id: id as string,
                checkedItems: selectedModels.includes(id as string),
              }
            }) as [],
          }
        })
        setEquipmentList(data)
      }, [equipments, openList])

      useEffect(() => {
        const listData = objects.map(({ object, id }) => {
          return {
            name: object,
            id: id as string,
            initChecked: selectedObjects.includes(id as string),
          }
        })
        setObjectList(listData)
      }, [objects, openListObjects])

      const onChooseObjects = (checked: boolean, id: string) => {
        if (checked) {
          setSelectedObjects([...selectedObjects, id])
          return
        }
        setSelectedObjects(selectedObjects.filter(item => item !== id))
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={clients.map(item => {
              return {
                ['label']: item.client as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 3, mb: 1 }}
            onChange={setClient}
            value={client.label}
            label="Выберите клиента"
            errorLabel="Не выбран клиент!"
          />
          {fields.map(({ id, label, validation, type, required }, index) => {
            return (
              <Controller
                key={`${label}_${id}`}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={field.ref}
                    label={label}
                    type={type}
                    variant="outlined"
                    required={required ?? true}
                    className={'textContainer_w90_mt3'}
                    margin="normal"
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <DateField
            dateValue={dateValue as Dayjs}
            setDateValue={setDateValue}
            className={'datePicker'}
          />
          <DropDownMultiple
            className={'dropdown dropdown_mt4 multiline'}
            data={sla.map(item => {
              return {
                ['label']: item.sla as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 6 }}
            onChange={setSLAList}
            value={slaList}
            label="Выберите уровни сервиса"
            errorLabel="Не выбраны уровни сервиса!"
            error={errSLA}
          />
          <ListItemButton
            divider={openList}
            className={'itemContainerLabel'}
            onClick={() => (setOpenList(!openList), setOpenListObjects(false))}>
            <ListItemText primary={'Выбор классификатора'} sx={{ ml: 2 }} />
            <RotateButton open={openList} />
          </ListItemButton>
          <Collapse
            className={'collapseContainer'}
            in={openList}
            timeout="auto"
            unmountOnExit>
            <CheckBoxGroups
              data={equipmentList}
              startDataGroups={selectedEquipments}
              startDataItems={selectedModels}
              onChooseGroup={setSelectedEquipments}
              onChooseItems={setSelectedModels}
            />
          </Collapse>
          <Divider
            orientation="horizontal"
            variant="middle"
            flexItem
            sx={{ mt: 2 }}
          />
          <ListItemButton
            divider={openListObjects}
            className={'itemContainerLabel'}
            onClick={() => (
              setOpenListObjects(!openListObjects),
              setOpenList(false)
            )}>
            <ListItemText primary={'Выбор объектов'} sx={{ ml: 2 }} />
            <RotateButton open={openListObjects} />
          </ListItemButton>
          <Collapse
            className={'collapseContainer width95'}
            in={openListObjects}
            timeout="auto"
            unmountOnExit>
            {objectList?.map(({ name, id, initChecked, comment }) => (
              <Item
                name={name}
                id={`${id}`}
                comment={comment}
                groupChecked={null}
                onChooseItems={onChooseObjects}
                initChecked={initChecked}
                key={`${name}_${id}`}
              />
            ))}
          </Collapse>
          <Divider
            orientation="horizontal"
            variant="middle"
            flexItem
            sx={{ mt: 2 }}
          />

          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)
