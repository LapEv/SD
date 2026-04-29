import { useState } from 'react'
import { UploadFiles } from 'store/slices/files/interfaces'
import { ApiEndPoints, authFileHost } from './config'

export const useUploadProgress = ({
  files,
  incident,
  id_incFiles,
}: UploadFiles) => {
  const [progress, setProgress] = useState(0)

  const uploadProgress = async () => {
    try {
      const formData = new FormData()
      Array.from(files).map(file => {
        formData.append('files', file, file.name)
        formData.append('filesName', file.name)
      })
      formData.append('incident', incident as string)
      formData.append('id_incFiles', id_incFiles)
      return await authFileHost.post(ApiEndPoints.Files.uploadFiles, formData, {
        onUploadProgress: progressEvent => {
          const progress = (progressEvent.loaded / progressEvent.total!) * 100
          setProgress(progress)
        },
      })
    } catch (error) {
      setProgress(0)
    }
  }

  return { uploadProgress, progress }
}
