import React, { memo, useState } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from '../interfaces'
import { ButtonsModalSection } from 'components/Buttons'
import { MapSavedTemplateInputFields } from '../data'
import { BoxModal, MuiDiv } from 'components/MUI'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useAuth } from 'hooks/auth/useAuth'
import { ISavedTemplates } from 'store/slices/tableINC/interfaces'

export const NewSavedTemplate = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ title }: ChooseModalProps, ref) => {
      const [, { setModal }] = useTableINC()
      const [{ user }] = useAuth()
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapSavedTemplateInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        const newSavedTemplate = list[0].value
        if (
          user?.appOptions &&
          user?.appOptions?.savedTemplates &&
          user?.appOptions?.savedTemplates.length > 0
        ) {
          const checkNameTemplate = user?.appOptions?.savedTemplates.find(
            ({ label }) => label === newSavedTemplate,
          ) as ISavedTemplates
          if (checkNameTemplate) {
            setErrSelectedItems('Такой шаблон уже существует.')
            return
          }
        }
        setModal({
          active: false,
          image: 'newSavedTemplate',
          id: newSavedTemplate,
        })
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
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
                    className="modalTextContainer"
                    margin="normal"
                    required={required ?? true}
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <MuiDiv className={'modalErrorMT2'}>{errSelectedItems}</MuiDiv>
          <ButtonsModalSection
            closeModal={() =>
              setModal({
                active: false,
                image: 'newSavedTemplate',
                id: '',
              })
            }
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)
