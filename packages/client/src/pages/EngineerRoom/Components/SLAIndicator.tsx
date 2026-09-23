import { MuiDiv } from 'components/MUI'
import { Indicator } from 'pages/ControlRoom/Incidents'
import { CountdownSLA } from './Countdown'
import { ITheme } from 'themes/themeConfig'
import { useTheme } from '@mui/material'
import { IEngineerINC } from '../interfaces'

export const SLAIndicator = ({ item }: IEngineerINC) => {
  const theme = useTheme() as ITheme
  return (
    <MuiDiv className="engineerIndicatorSLABox">
      <Indicator
        timeSLA={item.timeSLA}
        timeReg={item.timeRegistration}
        timeCloseCheck={item?.timeCloseCheck}
        status={item.status}
        classContainer="boxIndicatorEngineerContainer"
        theme={theme.palette.mode}
      />
      {item.status === 'В работе' && (
        <MuiDiv sx={{ ml: 1 }}>
          <CountdownSLA timeSLA={item.timeSLA} />
        </MuiDiv>
      )}
    </MuiDiv>
  )
}
