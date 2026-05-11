import React, {
  useState,
  useCallback,
  DragEvent,
  memo,
  useRef,
  ChangeEvent,
} from 'react'
import { AddActProps } from '../interfaces'
import { Chip, Typography } from '@mui/material'
import { ButtonsSection } from 'components/Buttons'
import { colorIndicator } from '../data'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { fileValidation } from 'utils/validatorRules'
import { BoxModal, MuiDiv } from 'components/MUI'
import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { useUploadProgress } from 'api/useUploadProgress'

export const AddAct = memo(
  React.forwardRef<unknown, AddActProps>(
    (
      { handleModalAddAct, title, incident, id_incFiles, files }: AddActProps,
      ref,
    ) => {
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

      const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragOver(true)
        setErrSelectedItems('')
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
        setErrSelectedItems('')
        setDragOver(false)
        const files = Array.from(event.dataTransfer.files)
        if (files) {
          handleFile(files as File[])
        }
      }, [])

      const handleFile = (files: File[]) => {
        const checkFiles = fileValidation(files)
        if (!checkFiles.status) {
          setErrSelectedItems(checkFiles.error)
          return
        }
        const newList =
          selectedFiles && selectedFiles?.length > 0
            ? [...(selectedFiles as File[]), ...files]
            : files
        setSelectedFiles(newList)
        const names = Array.from(newList as File[])
          .map(item => item.name)
          .join(', ')
        setSelectedNameFiles(names)
      }

      const changeData = async () => {
        const checkFilesLength =
          (selectedFiles?.length as number) + (files?.length as number)
        if (checkFilesLength > 10) {
          setErrSelectedItems(
            `На каждый инцидент не более 10 файлов! Было: ${selectedFiles?.length}, всего: ${(selectedFiles?.length as number) + (files?.length as number)}`,
          )
        }
        if (selectedFiles?.length) {
          const result = await uploadProgress()
          if (result?.status !== 200) {
            setErrSelectedItems(
              'Ошибка загрузки актов! Пробуйте заново или обратитесь к администратору.',
            )
            return
          }
          handleModalAddAct({
            state: true,
            files: result?.data,
            act: [selectedNameFiles],
            incident,
            id_incFiles,
          })
          return
        }
      }

      const onRemoveFile = (item: File) => {
        setErrSelectedItems('')
        const newList = selectedFiles?.filter(({ name }) => name !== item.name)
        const names = newList?.map(item => item.name).join(', ') as string
        setSelectedNameFiles(names)
        setSelectedFiles(newList)
      }

      console.log('selectedFiles = ', selectedFiles)

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="div"
          onFocus={() => setErrSelectedItems('')}>
          <Typography variant={'h1'}>{title}</Typography>
          <MuiDiv
            className={`addActContainer ${selectedFiles && selectedFiles?.length ? '' : 'noActs'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
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
                <CloudUploadOutlinedIcon
                  className="noActIcon"
                  onClick={() => refInputFile.current?.click()}
                />
                Загрузите или перетащите сюда файлы
                <input
                  ref={refInputFile}
                  type="file"
                  accept="image/jpeg,application/pdf"
                  hidden
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    handleFile(Array.from(target.files as FileList))
                  }
                  name="files[]"
                  multiple
                  style={{ display: 'none' }}
                />
              </MuiDiv>
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
          <ButtonsSection
            btnSecondHandle={() =>
              handleModalAddAct({ state: false, incident, id_incFiles })
            }
            btnName="Сохранить"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
            onClick={changeData}
          />
        </BoxModal>
      )
    },
  ),
)
