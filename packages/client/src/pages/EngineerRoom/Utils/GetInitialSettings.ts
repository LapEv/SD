import { IEngineerOptions, SettingsEngineer } from '../interfaces'
import { SETTINGS_DEFAULT, SETTINGS_STORAGE_KEY } from '../data'

export const GetInitialSettings = (
  engineerOptions: IEngineerOptions | undefined,
): SettingsEngineer => {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
    const checkEngineerOptions = engineerOptions ?? SETTINGS_DEFAULT
    if (storedSettings) {
      storedSettings
    }
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(checkEngineerOptions),
    )
    return checkEngineerOptions
  } catch (error) {
    return SETTINGS_DEFAULT
  }
}
