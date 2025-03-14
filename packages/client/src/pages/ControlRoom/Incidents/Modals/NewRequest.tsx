import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
// import { useForm, useFieldArray, useFormState } from 'react-hook-form'
// import { ChooseModalProps, AddValuesProps } from './interfaces'
import { ChooseModalProps } from './interfaces'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
// import { MapINCStatusInputFields } from '../data'

export const NewRequest = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      // const { handleSubmit, control } = useForm<AddValuesProps>({
      //   mode: 'onBlur',
      //   defaultValues: {
      //     list: MapINCStatusInputFields,
      //   },
      // })
      // const { errors } = useFormState({ control })
      // const { fields } = useFieldArray({
      //   control,
      //   name: 'list',
      // })

      // function changeData({ list }: AddValuesProps) {
      //   // newIncidentStatuses({
      //   //   statusINC: list[0].value,
      //   // })
      //   handleModal(false)
      // }

      return (
        <Box ref={ref} tabIndex={-1} sx={modalStyle}>
          {/* component="form"
          onSubmit={handleSubmit(changeData)}> */}
          <Typography variant={'h6'}>{title}</Typography>
          {/* {fields.map(
          ({ name, id, label, validation, type, required }, index) => {
            return (
              <Controller
                key={id}
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
                    sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                    margin="normal"
                    required={required ?? true}
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          }
        )} */}
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </Box>
      )
    },
  ),
)
