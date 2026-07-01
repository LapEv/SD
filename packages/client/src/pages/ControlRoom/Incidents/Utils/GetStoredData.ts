import { SETTINGS_STORAGE_KEY } from '../data'
import { Settings } from '../interfaces'

export const GetStoredData = (): Settings | null => {
  const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
  return storedSettings ? JSON.parse(storedSettings) : null
}
