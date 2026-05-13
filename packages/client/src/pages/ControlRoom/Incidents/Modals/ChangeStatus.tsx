import React, { useState, ChangeEvent, DragEvent, memo, useRef } from 'react'
import { AddValuesProps, CloseINCProps } from '../interfaces'
import { Typography, Chip } from '@mui/material'
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
import { fileValidation } from 'utils/validatorRules'
import { BoxModal, MuiDiv } from 'components/MUI'
import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { useUploadProgress } from 'api/useUploadProgress'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

export const ChangeStatus = memo(
  React.forwardRef<unknown, CloseINCProps>(
    (
      { handleModal, title, data, incident, id_incFiles }: CloseINCProps,
      ref,
    ) => {
      const [{ typesCompletedWork }] = useIncidents()
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<Options>(emptyOptionsDD)
      const [selectedFiles, setSelectedFiles] = useState<File[] | null>()
      const [selectedNameFiles, setSelectedNameFiles] = useState<string>('')
      const [, setDragOver] = useState<boolean>(false)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const { uploadProgress, progress } = useUploadProgress({
        files: selectedFiles as File[],
        incident,
        id_incFiles,
      })
      const refInputFile = useRef<HTMLInputElement>(null)

      const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragOver(true)
        setErrSelectedItems('')
      }

      const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragOver(false)
      }

      const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setErrSelectedItems('')
        setDragOver(false)
        const files = Array.from(event.dataTransfer.files)
        if (files) {
          handleFile(files as File[])
        }
      }

      const handleFile = (files: File[]) => {
        setErrSelectedItems('')
        const checkFiles = fileValidation(files, selectedFiles as File[])
        if (!checkFiles.status) {
          setErrSelectedItems(checkFiles.error)
          return
        }
        const newList =
          selectedFiles && selectedFiles?.length > 0
            ? [...(selectedFiles as File[]), ...files]
            : files
        setSelectedFiles(newList)
        const names = Array.from(newList)
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
          if ((selectedFiles?.length as number) > 10) {
            setErrSelectedItems(
              `На каждый инцидент не более 10 файлов! Всего: ${selectedFiles?.length as number}`,
            )
            return
          }
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
            files: result.data,
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

      const onRemoveFile = (item: File) => {
        setErrSelectedItems('')
        const newList = selectedFiles?.filter(({ name }) => name !== item.name)
        const names = newList?.map(item => item.name).join(', ') as string
        setSelectedNameFiles(names)
        setSelectedFiles(newList)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onFocus={() => setErrSelectedItems('')}
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{`${title} ${incident}`}</Typography>
          <MuiDiv className={'w90_mt3'}>
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
                          <MuiDiv
                            className={`addActContainer w100 ${selectedFiles && selectedFiles?.length ? '' : 'noActs'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => refInputFile.current?.click()}>
                            {selectedFiles && selectedFiles?.length > 0 ? (
                              selectedFiles?.map((item: File) => (
                                <Chip
                                  key={`${item.name}_${item.size}`}
                                  label={`${item.name}`}
                                  onDelete={() => onRemoveFile(item)}
                                  sx={{ mx: 0.25 }}
                                />
                              ))
                            ) : (
                              <MuiDiv className="noActBox">
                                <CloudUploadOutlinedIcon className="noActIcon" />
                                Загрузите или перетащите сюда файлы
                              </MuiDiv>
                            )}
                            <MuiDiv
                              className={`addActBoxBackground ${selectedFiles && selectedFiles?.length < 3 ? '' : 'opacity005'}`}>
                              <CloudUploadOutlinedIcon className="noActIcon" />
                              Загрузите или перетащите сюда файлы
                            </MuiDiv>
                            <input
                              ref={refInputFile}
                              type="file"
                              accept="image/*,application/pdf"
                              hidden
                              onChange={({
                                target,
                              }: ChangeEvent<HTMLInputElement>) =>
                                handleFile(Array.from(target.files as FileList))
                              }
                              name="files[]"
                              multiple
                              style={{ display: 'none' }}
                            />
                          </MuiDiv>
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
                          className={`${name === 'spaceParts' ? 'textContainer_mt3' : 'textContainer_mt2'}`}
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
            sx={{ mt: '12px!important' }}
          />
        </BoxModal>
      )
    },
  ),
)
