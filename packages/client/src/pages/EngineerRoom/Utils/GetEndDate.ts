import { SettingsEngineer } from '../interfaces'

export const GetEndDate = (settingsStorage: SettingsEngineer) => {
  const currentDate = new Date()
  return currentDate.setDate(
    currentDate.getDate() - settingsStorage.timeInterval,
  )
}
