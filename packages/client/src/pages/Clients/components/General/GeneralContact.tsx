import { Collapse, ListItemButton, ListItemText, Stack } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { MultiTextField, TextField } from 'components/TextFields'
import { MuiDiv } from 'components/MUI'
import { useApp } from 'hooks/app/useApp'
import { MapClientGeneralContactsInputFields } from 'pages/Clients/data'
import {
  ClientsAddValuesProps,
  IGeneralContact,
} from 'pages/Clients/interfaces'
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  useFormState,
} from 'react-hook-form'
import { useClients } from 'hooks/clients/useClients'
import { INewDataContact } from 'store/slices/clients/interfaces'
import { deepEqual } from 'utils/deepEqual'
import { Item } from 'components/CheckBoxGroup'

export const GeneralContact = ({
  contact,
  clearContacts,
  setClearContacts,
  index,
  clientData,
}: IGeneralContact) => {
  const [, { setbtnDisabled }] = useApp()
  const [open, setOpen] = useState(false)
  const [{ newDataInputs }, { setNewDataInputs, setCheckError }] = useClients()

  const { control, reset } = useForm<ClientsAddValuesProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      list: MapClientGeneralContactsInputFields.map(data => ({
        ...data,
        value: contact ? contact[data.name as keyof typeof contact] : '',
      })),
    },
  })
  const { errors } = useFormState({ control: control })
  const { fields } = useFieldArray({
    control: control,
    name: 'list',
  })

  const checkForChange = (newData: INewDataContact) => {
    const _newDataInputs = newDataInputs.id ? newDataInputs : clientData
    const newContacts = _newDataInputs.Contacts?.map(item =>
      item.id === newData.id ? { ...item, ...newData } : item,
    )
    const newClient = { ..._newDataInputs, Contacts: newContacts }
    setNewDataInputs(newClient)
    const isEqual = deepEqual(
      newClient as Record<never, never>,
      clientData as Record<never, never>,
    )
    setbtnDisabled(isEqual)
    if (errors.list) {
      setCheckError({ id: index, statusError: true })
    }
    if (!errors.list) {
      setCheckError({ id: index, statusError: false })
    }
  }

  useEffect(() => {
    if (clearContacts) {
      reset({
        list: MapClientGeneralContactsInputFields.map(data => ({
          ...data,
          value: contact[data.name as keyof typeof contact],
        })),
      })
      setClearContacts(false)
    }
  }, [clearContacts])

  return (
    <>
      <ListItemButton
        divider={open}
        className={'itemClientContainerLabel'}
        onClick={() => setOpen(!open)}>
        <ListItemText
          primary={`${contact.lastName} ${contact.firstName} ${contact.middleName}`}
          secondary={contact.post}
          slotProps={{
            secondary: {
              sx: { ml: 2, fontSize: 14 },
            },
          }}
          sx={{ ml: 2 }}
        />
        <RotateButton open={open} />
      </ListItemButton>
      <Collapse
        className={'collapseList collapseList_p_Contacts'}
        in={open}
        timeout="auto"
        unmountOnExit>
        <MuiDiv className="boxClientGeneral">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            className="stackClientGeneral">
            {fields.map(
              ({ id, name, label, validation, type, required }, index) => {
                return (
                  <Controller
                    key={id}
                    control={control}
                    name={`list.${index}.value`}
                    rules={validation}
                    render={({ field }) => {
                      if (name === 'comment') {
                        return (
                          <MultiTextField
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type as string}
                            required={required ?? true}
                            variant="outlined"
                            className={'textMultiCellsCommentContact'}
                            margin="normal"
                            multiline
                            maxRows={3}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>,
                            ) => (
                              field.onChange(event.target.value),
                              checkForChange({
                                id: contact.id,
                                ...{
                                  [name]: event.target.value,
                                },
                              })
                            )}
                            error={
                              !!(errors?.list ?? [])[index]?.value?.message
                            }
                            helperText={
                              (errors?.list ?? [])[index]?.value?.message
                            }
                          />
                        )
                      }
                      if (name === 'active') {
                        return (
                          <Item
                            name={`${label}: ${field.value ? 'Активный' : 'Неактивный'}`}
                            id={`${id}`}
                            groupChecked={null}
                            onChooseItems={(data: boolean) => (
                              field.onChange(data),
                              checkForChange({
                                id: contact.id,
                                ...{
                                  [name]: data,
                                },
                              })
                            )}
                            initChecked={field.value as unknown as boolean}
                          />
                        )
                      }
                      return (
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type as string}
                          required={required ?? true}
                          variant="outlined"
                          className="textClientGeneralList"
                          margin="normal"
                          onChange={(event: ChangeEvent<HTMLInputElement>) => (
                            field.onChange(event.target.value),
                            checkForChange({
                              id: contact.id,
                              ...{
                                [name]: event.target.value,
                              },
                            })
                          )}
                          error={!!(errors?.list ?? [])[index]?.value?.message}
                          helperText={
                            (errors?.list ?? [])[index]?.value?.message
                          }
                          onBlur={(event: FocusEvent<HTMLInputElement>) =>
                            checkForChange({
                              id: contact.id,
                              ...{
                                [name]: event.target.value,
                              },
                            })
                          }
                          inputProps={{ step: 1 }}
                        />
                      )
                    }}
                  />
                )
              },
            )}
          </Stack>
        </MuiDiv>
      </Collapse>
    </>
  )
}
