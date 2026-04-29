import React, {
  useState,
  ChangeEvent,
  useCallback,
  DragEvent,
  memo,
  useRef,
} from 'react'
import { AddValuesProps, CloseINCProps } from '../interfaces'
import { IconButton, Typography } from '@mui/material'
import { ButtonsModalSection } from 'components/Buttons'
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
import { colorIndicator, MapINCStatusCloseInputFields } from '../data'
import { DropDownINC, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { fileValidation } from 'utils/validatorRules'
import { useMessage } from 'hooks/message/useMessage'
import { BoxModal, MuiDiv } from 'components/MUI'
import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { useUploadProgress } from 'api/useUploadProgress'

export const ChangeStatus = memo(
  React.forwardRef<unknown, CloseINCProps>(
    (
      { handleModal, title, data, incident, id_incFiles }: CloseINCProps,
      ref,
    ) => {
      const [, { setMessage }] = useMessage()
      const [{ typesCompletedWork }] = useIncidents()
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<Options>(emptyOptionsDD)
      const [selectedFiles, setSelectedFiles] = useState<FileList | null>()
      const [selectedNameFiles, setSelectedNameFiles] = useState<string>('')
      const [, setDragOver] = useState<boolean>(false)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const { uploadProgress, progress } = useUploadProgress({
        files: selectedFiles as FileList,
        incident,
        id_incFiles,
      })
      const refInputFile = useRef<HTMLInputElement>(null)

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
          handleFile(files)
        }
      }, [])

      const handleFile = (files: FileList) => {
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

      const changeData = async ({ list }: AddValuesProps) => {
        if (selectedFiles?.length) {
          const result = await uploadProgress()
          if (result?.status !== 200) {
            setErrSelectedItems(
              'Ошибка загрузки актов! Пробуйте заново или обратитесь к администратору.',
            )
            return
          }
          handleModal({
            state: true,
            typeCompletedWork: selectedTypeCompletedWork,
            commentCloseCheck: list[1].value,
            files: result?.data,
            spaceParts: list[3].value
              ?.split(/,| |;|\|./)
              .filter(item => item !== ''),
            data,
            act: [selectedNameFiles],
          })
          return
        }
        handleModal({
          state: true,
          typeCompletedWork: selectedTypeCompletedWork,
          commentCloseCheck: list[1].value,
          spaceParts: list[3].value
            ?.split(/,| |;|\|./)
            .filter(item => item !== ''),
          data,
        })
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onFocus={() => setErrSelectedItems('')}
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <MuiDiv className={'w90_mt2'}>
            {fields.map(
              ({ id, label, validation, type, required, name }, index) => {
                return (
                  <Controller
                    key={`${label}_${id}`}
                    control={control}
                    name={`list.${index}.value`}
                    rules={validation}
                    render={({ field }) => {
                      if (name === 'typeCompletedWork') {
                        return (
                          <DropDownINC
                            data={typesCompletedWork.map(
                              ({ typeCompletedWork, id }) => {
                                return {
                                  ['label']: typeCompletedWork,
                                  ['id']: id as string,
                                }
                              },
                            )}
                            className="dropdownINConTable"
                            label={label}
                            onChange={setSelectedTypeCompletedWork}
                            value={selectedTypeCompletedWork.label}
                            errorLabel="Не выбран тип выполненных работ!"
                          />
                        )
                      }
                      if (name === 'commentCloseCheck') {
                        return (
                          <MultiTextFieldIncident
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type}
                            required={required ?? true}
                            variant="outlined"
                            className={'textMultiCellsCloseINC'}
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
                          />
                        )
                      }
                      if (name === 'act') {
                        return (
                          <TextFieldIncidents
                            {...field}
                            inputRef={field.ref}
                            label={label}
                            type={type}
                            variant="outlined"
                            required={required ?? true}
                            className={'textContainer_mt2'}
                            sx={{ width: '100%' }}
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
                            slotProps={{
                              input: {
                                fullWidth: true,
                                endAdornment: (
                                  <IconButton className={`attachIconButton `}>
                                    <AttachFileIcon
                                      className={`attachIcon`}
                                      onClick={() =>
                                        refInputFile.current?.click()
                                      }
                                    />
                                    <input
                                      ref={refInputFile}
                                      type="file"
                                      accept="image/jpeg,application/pdf"
                                      hidden
                                      onChange={({
                                        target,
                                      }: ChangeEvent<HTMLInputElement>) =>
                                        handleFile(target.files as FileList)
                                      }
                                      name="files[]"
                                      multiple
                                      style={{ display: 'none' }}
                                    />
                                  </IconButton>
                                ),
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
                          variant="outlined"
                          required={required ?? true}
                          className={'textContainer_mt2'}
                          sx={{ width: '100%' }}
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
          </MuiDiv>
          <MuiDiv className={'modalErrorCloseCheckNC'}>
            {errSelectedItems}
          </MuiDiv>
          <MuiDiv
            className="progressContainer"
            sx={{ opacity: progress ? 1 : 0 }}>
            <Typography className="progressTitle">Загрузка актов</Typography>
            <LinearProgressWithLabel
              variant="determinate"
              sx={{ backgroundColor: colorIndicator.notExpired }}
              classNameBox="progressBox"
              classNameContent="progressContent"
              indicator={colorIndicator.notExpired}
              percent={progress}
              value={progress}
            />
          </MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal({ state: false, data })}
            btnName={'Сохранить'}
          />
        </BoxModal>
      )
    },
  ),
)
