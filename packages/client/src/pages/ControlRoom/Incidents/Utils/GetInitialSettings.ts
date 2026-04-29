import { SETTINGS_DEFAULT, SETTINGS_STORAGE_KEY } from '../data'
import { Settings } from '../interfaces'

export const getInitialSettings = (): Settings => {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
    return storedSettings ? JSON.parse(storedSettings) : SETTINGS_DEFAULT
  } catch (error) {
    return SETTINGS_DEFAULT
  }
}
