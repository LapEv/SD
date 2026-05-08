import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { useAppDispatch } from 'store/hooks'
import { FilesState } from 'store/slices/files/interfaces'
import { FilesActions } from './filesActions'
import {
  getFilesData,
  uploadFiles,
  getFile,
  getAvatar,
  getViewFile,
} from 'api/files'
import {
  resetUploadFiles,
  setViewFiles,
  setViewFilePanel,
} from 'store/slices/files'

export function useFiles(): [FilesState, FilesActions] {
  const files = useSelector((state: RootState) => state.files)
  const dispatch = useAppDispatch()

  return [
    files,
    {
      getFilesData() {
        dispatch(getFilesData())
      },
      getFile(pathfile) {
        dispatch(getFile(pathfile))
      },
      getViewFile(data) {
        dispatch(getViewFile(data))
      },
      getAvatar(pathfile) {
        dispatch(getAvatar(pathfile))
      },
      uploadFiles(data) {
        dispatch(uploadFiles(data))
      },
      resetUploadFiles() {
        dispatch(resetUploadFiles())
      },
      setViewFiles(data) {
        dispatch(setViewFiles(data))
      },
      setViewFilePanel(data) {
        dispatch(setViewFilePanel(data))
      },
    },
  ]
}
