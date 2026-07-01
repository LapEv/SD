import { IDispatcherOptions } from 'store/slices/tableINC/interfaces'
import { SETTINGS_DEFAULT, SETTINGS_STORAGE_KEY } from '../data'
import { Settings } from '../interfaces'

export const getInitialSettings = (
  dispatcherOptions: IDispatcherOptions | undefined,
): Settings => {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
    const checkDispatcherOptions = dispatcherOptions ?? SETTINGS_DEFAULT
    if (storedSettings) {
      storedSettings
    }
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(checkDispatcherOptions),
    )
    return checkDispatcherOptions
  } catch (error) {
    return SETTINGS_DEFAULT
  }
}
