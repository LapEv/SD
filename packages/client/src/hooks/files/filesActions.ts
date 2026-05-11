import {
  AddActsModal,
  IGetViewFile,
  IViewFiles,
  UploadFiles,
} from 'store/slices/files/interfaces'

export interface FilesActions {
  getFilesData: () => void
  getFile: (pathfile: string) => void
  getViewFile: (data: IGetViewFile) => void
  getAvatar: (pathfile: string) => void
  uploadFiles: (data: UploadFiles) => void
  resetUploadFiles: () => void
  setViewFiles: (data: IViewFiles) => void
  setAddAct: (data: AddActsModal) => void
  setViewFilePanel: (data: boolean) => void
}
