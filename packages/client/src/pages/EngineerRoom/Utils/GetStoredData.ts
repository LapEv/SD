import { SettingsEngineer } from '../interfaces'
import { SETTINGS_STORAGE_KEY } from '../data'

export const GetStoredData = (): SettingsEngineer | null => {
  const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
  return storedSettings ? JSON.parse(storedSettings) : null
}
