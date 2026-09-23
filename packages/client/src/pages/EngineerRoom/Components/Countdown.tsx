import { MuiDiv } from 'components/MUI'
import Countdown from 'react-countdown'
import { checkDaysToString } from 'utils/checkDaysToString'
import { ICountdown, ICountdownRender } from '../interfaces'

export const CountdownSLA = ({ timeSLA }: ICountdown) => {
  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
    days,
  }: ICountdownRender) => {
    if (completed) {
      return <MuiDiv>Просрочен</MuiDiv>
    }
    return (
      <MuiDiv>
        Осталось: {checkDaysToString(days)}
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </MuiDiv>
    )
  }

  return <Countdown date={timeSLA} renderer={renderer} />
}
