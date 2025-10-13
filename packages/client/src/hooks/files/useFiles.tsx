import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { FilesState } from 'store/slices/files/interfaces'
import { FilesActions } from './filesActions'
import { getFiles, uploadFiles, getFile, getAvatar } from 'api/files'
import { resetUploadFiles } from 'store/slices/files'

export function useFiles(): [FilesState, FilesActions] {
  const files = useSelector((state: RootState) => state.files)
  const dispatch = useAppDispatch()

  return [
    files,
    {
      getFiles() {
        dispatch(getFiles())
      },
      getFile(pathfile) {
        dispatch(getFile(pathfile))
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
    },
  ]
}
