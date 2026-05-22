import { AnswerIndicatorData, IIndicatorCell } from '../interfaces'
import { colorIndicator } from '../data'
import { convertTime } from 'utils/convertTime'

export const GetIndicatorData = ({
  timeSLA,
  timeReg,
  timeCloseCheck,
  status,
}: IIndicatorCell): AnswerIndicatorData => {
  const now = Date.parse(new Date().toISOString())
  const sla = Date.parse(timeSLA)
  const reg = Date.parse(timeReg)
  if (timeCloseCheck && (status === 'Решён' || status === 'Закрыт')) {
    const close = Date.parse(timeCloseCheck)
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
  const diffReg = sla - reg
  const diffNow = sla - now
  const percent = 100 - (diffNow * 100) / diffReg
  const timeleftMin = Math.ceil(diffNow / 1000 / 60)
  const timeleft = diffNow > 0 ? convertTime(timeleftMin) : 'Просрочено'

  if (now > sla) {
    return {
      value: 100,
      percent: percent > 999 ? 999 : percent,
      indicator: colorIndicator.expired,
      timeleft,
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
    timeleft,
  }
}
