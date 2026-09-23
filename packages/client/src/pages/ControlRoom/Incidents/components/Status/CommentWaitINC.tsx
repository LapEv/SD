import React, { memo } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextFieldIncident } from 'components/TextFields'
import { ButtonsModalSection } from 'components/Buttons'
import { BoxModal } from 'components/MUI'
import { AddValuesProps, CommentWaitINCProps } from '../../interfaces'
import { MapCommentWaitINCInputFields } from '../../data'

export const CommentWaitINC = memo(
  React.forwardRef<unknown, CommentWaitINCProps>(
    ({ handleModal, title, data }: CommentWaitINCProps, ref) => {
      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapCommentWaitINCInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        handleModal({
          state: true,
          data,
          newComment: list[0].value,
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
          {fields.map(({ id, label, validation, required }, index) => {
            return (
              <Controller
                key={`${label}_${id}`}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => (
                  <MultiTextFieldIncident
                    {...field}
                    inputRef={field.ref}
                    label={label}
                    variant="outlined"
                    className={'textMultiCellsEditINC'}
                    margin="normal"
                    multiline
                    maxRows={4}
                    required={required ?? true}
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <ButtonsModalSection
            closeModal={() =>
              handleModal({ state: false, data, newComment: '' })
            }
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)
