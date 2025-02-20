import { convertINCStringToDateTime } from 'utils/convertDate'
import { AnswerIndicatorData, IIndicatorCell } from '../interfaces'
import { colorIndicator } from '../data'

export const GetIndicatorData = ({
  timeSLA,
  timeReg,
  timeCloseCheck,
  status,
}: IIndicatorCell): AnswerIndicatorData => {
  const now = new Date().getTime()
  const sla = new Date(convertINCStringToDateTime(timeSLA)).getTime()
  const reg = new Date(convertINCStringToDateTime(timeReg)).getTime()

  if (timeCloseCheck && (status === 'Решён' || status === 'Закрыт')) {
    const close = new Date(convertINCStringToDateTime(timeCloseCheck)).getTime()
    const diff = sla - reg
    const closeDiff = sla - close
    const percent = 100 - (closeDiff * 100) / diff
    return {
      value: 100,
      percent: percent > 999 ? 999 : percent,
      indicator:
        percent >= 100 ? colorIndicator.expired : colorIndicator.notExpired,
    }
  }
  const diff = sla - reg
  const nowDiff = sla - now
  const percent = 100 - (nowDiff * 100) / diff
  if (now > sla) {
    return {
      value: 100,
      percent: percent > 999 ? 999 : percent,
      indicator: colorIndicator.expired,
    }
  }
  return {
    value: percent >= 100 ? 100 : percent,
    percent,
    indicator:
      percent >= 95
        ? colorIndicator.inProgress.more95
        : percent >= 75
        ? colorIndicator.inProgress.more75
        : percent >= 50
        ? colorIndicator.inProgress.more50
        : colorIndicator.notExpired,
  }
}
