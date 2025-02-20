import { UploadFiles } from 'store/slices/files/interfaces'

export interface FilesActions {
  getFiles: () => void
  getFile: (pathfile: string) => void
  getAvatar: (pathfile: string) => void
  uploadFiles: (data: UploadFiles) => void
  resetUploadFiles: () => void
}
