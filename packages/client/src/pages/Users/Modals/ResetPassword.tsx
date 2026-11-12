import React, { ChangeEvent, memo } from 'react'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
  IconPopoverButton,
} from 'components/Buttons'
import { useAuth } from 'hooks/auth/useAuth'
import { TextField } from 'components/TextFields'
import { User } from 'storeAuth/interfaces'
import { useFilteredData } from 'hooks/useFilteredData'
import { BoxModal, MuiDiv } from 'components/MUI'
import { MapResetPasswordNameInputFields } from '../data'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useSystem } from 'hooks/system/useSystem'

export const ResetPassword = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ users }, { resetPassword, getActiveUsers }] = useAuth()
      const [{ generatedPassword }, { generatePassword }] = useSystem()
      const [selectedUser, setSelectedUser] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const [filterText, setFilterText] = useState<string>('')
      const filteredusers = useFilteredData<User>(users, filterText, [
        'lastName',
        'post',
      ])

      const { handleSubmit, control, setValue, reset } =
        useForm<AddValuesProps>({
          mode: 'onBlur',
          defaultValues: {
            list: MapResetPasswordNameInputFields,
          },
        })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedUser.length) {
          setErrSelectedItems('Не выбран пользователь!')
          return
        }
        handleModal(false)
        resetPassword({ id: selectedUser, password: list[0].value })
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedUser('')
          return
        }
        setSelectedUser(id)
        if (id) setErrSelectedItems('')
      }

      useEffect(() => {
        getActiveUsers({})
      }, [])

      const setText = (text: string) => {
        setFilterText(text)
      }

      useEffect(() => {
        setValue(`list.0.value`, generatedPassword as string)
      }, [generatedPassword])

      const closeModal = () => {
        reset({
          list: MapResetPasswordNameInputFields,
        })
        setTimeout(() => {
          handleModal(false)
        }, 1000)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <TextField
            variant="outlined"
            className="modalTextContainer"
            label="Фильтр по фамилии"
            margin="normal"
            value={filterText || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value ?? '')
            }
            slotProps={{
              input: {
                endAdornment: (
                  <ClearSearchModalSection
                    length={filterText.length}
                    handleClick={() => setFilterText('')}
                  />
                ),
              },
            }}
          />
          <MuiDiv className={'boxDataModal'}>
            {filteredusers.map(
              ({ lastName, firstName, middleName, post, id }) => (
                <Item
                  name={`${lastName} ${firstName} ${middleName}`}
                  comment={post as string}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  oneChecked={selectedUser === id ? true : false}
                  key={`${lastName}_${firstName}_${id}`}
                  className={'listItemsChangeRolesGr'}
                  classItemText={'listItemsTextContainer'}
                />
              ),
            )}
          </MuiDiv>
          <MuiDiv className="boxUserPassword">
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
                      className="textContainer_w90_mt3"
                      margin="normal"
                      value={field.value || ''}
                      error={!!(errors?.list ?? [])[index]?.value?.message}
                      helperText={(errors?.list ?? [])[index]?.value?.message}
                    />
                  )}
                />
              )
            })}
            <IconPopoverButton
              className={'addIconButton generateUserPassAddIconButton'}
              popover={'Сгенерировать пароль'}
              onClick={() => generatePassword(12)}
              icon={<LockResetIcon />}
              propsPopover={{ ml: 0.5 }}
              horizontal={'right'}
              horizontal2={'left'}
            />
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрано ниодного пользователя!'}
          </MuiDiv>
          <ButtonsModalSection closeModal={closeModal} btnName="Сбросить" />
        </BoxModal>
      )
    },
  ),
)
