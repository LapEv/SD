export interface FilesData {
  id: string
  name: string
  size: string
  mimetype: string
  path: string
  src?: string
}

export interface UploadFiles {
  files: FileList
  incident?: string
  id_incFiles: string
}

export interface AnswerUploaded {
  data: FilesData[]
  type: string
}

export type FilesState = {
  filesData: FilesData[]
  files: string
  isLoadingFiles: boolean
  uploadedFiles: FilesData[]
  error?: string
  viewFiles: IViewFiles
  viewFilePanel: boolean
}

export interface IViewFiles {
  idINC: string
  files: FilesData[] | undefined
}

export interface IGetViewFile {
  pathfile: string
  id: string
}
