import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { IIndicatorCell } from '../../interfaces'
import { GetIndicatorData } from 'pages/ControlRoom/Incidents'
import { MuiDiv } from 'components/MUI'
import { useTheme } from '@mui/material'
import { ITheme } from 'themes/themeConfig'

export const Indicator = ({
  timeSLA,
  timeReg,
  timeCloseCheck,
  inc,
  status,
  classContainer,
}: IIndicatorCell) => {
  const theme = useTheme() as ITheme
  const { percent, indicator, value } = GetIndicatorData({
    timeSLA,
    timeReg,
    timeCloseCheck,
    inc,
    status,
    theme: theme.palette.mode,
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
