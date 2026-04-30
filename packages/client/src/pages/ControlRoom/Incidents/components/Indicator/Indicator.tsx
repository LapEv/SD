import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { IIndicatorCell } from '../../interfaces'
import { GetIndicatorData } from 'pages/ControlRoom/Incidents/utils/GetIndicatorData'
import { MuiDiv } from 'components/MUI'

export const Indicator = ({
  timeSLA,
  timeReg,
  timeCloseCheck,
  inc,
  status,
  classContainer,
}: IIndicatorCell) => {
  const { percent, indicator, value } = GetIndicatorData({
    timeSLA,
    timeReg,
    timeCloseCheck,
    inc,
    status,
  })

  return (
    <MuiDiv className={`boxIndicatorContainer ${classContainer}`}>
      <LinearProgressWithLabel
        variant="determinate"
        sx={{ backgroundColor: indicator ?? '#000000' }}
        indicator={indicator}
        percent={percent}
        value={value}
      />
    </MuiDiv>
  )
}
