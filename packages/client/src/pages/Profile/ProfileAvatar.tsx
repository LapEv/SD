import { Box, IconButton, TextField, useTheme } from '@mui/material'
import { Button } from 'components/Buttons'
import { AvatarBox } from 'components/AvatarBox'
import { ProfileAvatarProps } from './interfaces'
import {
  memo,
  useCallback,
  useState,
  DragEvent,
  ChangeEvent,
  useRef,
} from 'react'
import { FileProps } from 'storeAuth/interfaces'
import { fileValidation } from 'utils/validatorRules'
import { useMessage } from 'hooks/message/useMessage'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const ProfileAvatar = memo(
  ({
    id,
    avatar,
    changeAvatar,
    deleteAvatar,
    setAvatar,
  }: ProfileAvatarProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<FileProps>({
      data: '',
      info: undefined,
    })
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
    const [, setDragOver] = useState<boolean>(false)
    const [, { setMessage }] = useMessage()
    const theme = useTheme() as ITheme

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragOver(true)
    }, [])

    const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragOver(false)
    }, [])

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
      readFile(files)
    }

    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const files = target?.files as FileList
      const checkFiles = fileValidation(target?.files as FileList)
      if (!checkFiles.status) {
        setMessage({
          type: 'error',
          text: checkFiles.error,
        })
        return
      }
      readFile(files)
    }

    const readFile = (files: FileList) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (!files) return
        setSelectedFile({ info: files[0], data: reader.result })
        setBtnDisabled(false)
      }
      files instanceof FileList
        ? reader.readAsDataURL(files[0])
        : setSelectedFile({ data: '', info: undefined })
    }

    const saveAvatar = () => {
      changeAvatar({
        id_avatarFiles: id,
        id,
        selectedFile,
      })
      setAvatar(JSON.stringify(selectedFile))
      setSelectedFile({ data: '', info: undefined })
      setBtnDisabled(true)
    }

    const clearAvatar = () => {
      setSelectedFile({ data: '', info: undefined })
      setBtnDisabled(true)
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
        inputFileRef.current.type = 'text'
        inputFileRef.current.type = 'file'
      }
    }

    const chooseFile = () => {
      inputFileRef?.current?.click()
    }

    const deleteFile = () => {
      deleteAvatar(id)
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <TextField
          type={'text'}
          sx={{
            width: 100,
            height: 100,
            p: 0,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          margin="normal"
          value={selectedFile.info?.name || ''}
          InputProps={{
            fullWidth: true,
            sx: { p: 0, width: 100, height: 100 },
            startAdornment: (
              <IconButton component="label" sx={{ p: 0 }}>
                <AvatarBox
                  src={
                    (selectedFile.info
                      ? selectedFile.data
                      : `${avatar.data}`) as string
                  }
                  sx={{
                    width: '100px',
                    height: '100px',
                    bgcolor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="file"
                  ref={inputFileRef}
                  accept="image/jpeg,application/pdf"
                  hidden
                  onChange={handleFileChange}
                  name="file"
                  multiple
                  style={{ display: 'none' }}
                />
              </IconButton>
            ),
          }}
        />
        <Box sx={{ ml: 2 }}>
          <TextField
            variant="standard"
            type={'text'}
            sx={{
              width: 'auto',
              color:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
            }}
            margin="normal"
            value={selectedFile.info?.name || ''}
            InputProps={{
              sx: {
                height: 30,
                mt: 1,
                color:
                  theme.palette.mode === ThemeMode.light
                    ? (theme as ITheme).colorTheme.colorDark
                    : (theme as ITheme).colorTheme.colorLight,
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 210,
            }}>
            <Button
              onClick={btnDisabled ? chooseFile : saveAvatar}
              sx={{ width: 100, fontWeight: 'bold' }}>
              {btnDisabled ? (avatar ? 'Изменить' : 'Загрузить') : 'Сохранить'}
            </Button>
            <Button
              onClick={
                btnDisabled ? (avatar ? deleteFile : clearAvatar) : clearAvatar
              }
              sx={{ width: 100, fontWeight: 'bold' }}
              // disabled={btnDisabled ?? true}
            >
              {btnDisabled ? (avatar ? 'Удалить' : 'Очистить') : 'Очистить'}
            </Button>
          </Box>
        </Box>
      </Box>
    )
  },
)
