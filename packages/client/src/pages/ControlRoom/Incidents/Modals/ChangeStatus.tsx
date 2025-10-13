import React, {
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  DragEvent,
  memo,
} from 'react'
import { AddValuesProps, CloseINCProps } from './interfaces'
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  LinearProgress,
} from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextField, TextField } from 'components/TextFields'
import { MapINCStatusCloseInputFields } from '../data'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { fileValidation } from 'utils/validatorRules'
import { useMessage } from 'hooks/message/useMessage'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const ChangeStatus = memo(
  React.forwardRef<unknown, CloseINCProps>(
    ({ handleModal, title, data }: CloseINCProps, ref) => {
      const [, { setMessage }] = useMessage()
      const theme = useTheme()
      const [{ typesCompletedWork }] = useIncidents()
      const [typeCompletedWorkList, setTypeCompletedWorkList] = useState<
        Options[]
      >([])
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<Options>(emptyValue)

      const [selectedFiles, setSelectedFiles] = useState<FileList | null>()
      const [selectedNameFiles, setSelectedNameFiles] = useState<string>('')

      const [, setDragOver] = useState<boolean>(false)
      const [uploadProgress] = useState(0)

      const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragOver(true)
      }, [])

      const handleDragLeave = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
          event.preventDefault()
          setDragOver(false)
        },
        [],
      )

      const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragOver(false)
        const files = event.dataTransfer.files
        if (files) {
          handleFileDragChange(files)
        }
      }, [])

      const handleFileDragChange = (files: FileList) => {
        const checkFiles = fileValidation(files)
        if (!checkFiles.status) {
          setMessage({
            type: 'error',
            text: checkFiles.error,
          })
          return
        }
        setSelectedFiles(files)
        const names = Array.from(files as FileList)
          .map(item => item.name)
          .join(', ')
        setSelectedNameFiles(names)
      }

      const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const checkFiles = fileValidation(target?.files as FileList)
        if (!checkFiles.status) {
          setMessage({
            type: 'error',
            text: checkFiles.error,
          })
          return
        }
        setSelectedFiles(target?.files)
        const names = Array.from(target?.files as FileList)
          .map(item => item.name)
          .join(', ')
        setSelectedNameFiles(names)
      }

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapINCStatusCloseInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        handleModal({
          state: true,
          typeCompletedWork: selectedTypeCompletedWork,
          commentCloseCheck: list[1].value,
          files: selectedFiles as FileList,
          spaceParts: list[3].value
            ?.split(/,| |;|\|./)
            .filter(item => item !== ''),
          data,
        })
      }

      useEffect(() => {
        const list = typesCompletedWork.map(({ typeCompletedWork, id }) => {
          return {
            label: typeCompletedWork,
            id: id as string,
          }
        })
        setTypeCompletedWorkList(list)
      }, [])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Box sx={{ mt: 2, width: '90%' }}>
            {fields.map(
              ({ id, label, validation, type, required, name }, index) => {
                return (
                  <Controller
                    key={id}
                    control={control}
                    name={`list.${index}.value`}
                    rules={validation}
                    render={({ field }) => {
                      if (name === 'typeCompletedWork') {
                        return (
                          <DropDown
                            data={typeCompletedWorkList}
                            props={{ width: '100%', mb: 2 }}
                            onChange={setSelectedTypeCompletedWork}
                            value={selectedTypeCompletedWork.label || ''}
                            label={label}
                            errorLabel="Не выбран тип выполненных работ!"
                          />
                        )
                      }
                      if (name === 'commentCloseCheck') {
                        return (
                          <MultiTextField
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type}
                            required={required ?? true}
                            variant="outlined"
                            sx={{ width: '100%' }}
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
                            inputProps={{ step: 1 }}
                          />
                        )
                      }
                      if (name === 'act') {
                        return (
                          <TextField
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type}
                            variant="outlined"
                            required={required ?? true}
                            sx={{
                              width: '100%',
                              mt: 2,
                              height: 40,
                              pl: 0,
                            }}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            margin="normal"
                            value={selectedNameFiles || ''}
                            error={
                              !!(errors?.list ?? [])[index]?.value?.message
                            }
                            helperText={
                              (errors?.list ?? [])[index]?.value?.message
                            }
                            InputProps={{
                              fullWidth: true,
                              startAdornment: (
                                <IconButton component="label">
                                  <AttachFileIcon
                                    sx={{
                                      color:
                                        theme.palette.mode === ThemeMode.light
                                          ? (theme as ITheme).colorTheme
                                              .colorLight
                                          : (theme as ITheme).colorTheme
                                              .colorDark,
                                    }}
                                  />
                                  <input
                                    type="file"
                                    accept="image/jpeg,application/pdf"
                                    hidden
                                    onChange={handleFileChange}
                                    name="files[]"
                                    multiple
                                    style={{ display: 'none' }}
                                  />
                                </IconButton>
                              ),
                            }}
                          />
                        )
                      }
                      return (
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          variant="outlined"
                          required={required ?? true}
                          sx={{
                            width: '100%',
                            mt: 2,
                            height: 40,
                          }}
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
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal({ state: false, data })}
            btnName={'Сохранить'}
          />
        </Box>
      )
    },
  ),
)
