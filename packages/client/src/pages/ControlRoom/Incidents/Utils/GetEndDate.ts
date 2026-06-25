import { Settings } from '../interfaces'

export const GetEndDate = (settingsStorage: Settings) => {
  const currentDate = new Date()
  return currentDate.setDate(
    currentDate.getDate() - settingsStorage.timeInterval,
  )
}
