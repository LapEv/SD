import { styled } from '@mui/material/styles'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { memo } from 'react'
import { MuiDiv } from 'components/MUI'

export const StyledLinearProgress = styled(LinearProgress)(({ sx }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    ...sx,
  },
}))

export const LinearProgressWithLabel = memo(
  (
    props: LinearProgressProps & {
      value: number
      percent: number
      indicator: string
      classNameBox?: string
      classNameContent?: string
    },
  ) => {
    return (
      <MuiDiv className={`boxIndicator ${props.classNameBox}`}>
        <MuiDiv
          className={`boxIndicatorContent ${props.classNameContent}`}
          sx={{
            fontWeight: props.value === 100 ? 'normal' : 'bold',
          }}>
          {`${Math.floor(props.percent)}%`}
        </MuiDiv>

        <StyledLinearProgress
          variant="determinate"
          sx={{ backgroundColor: props.indicator ?? '#000000' }}
          value={props.value}
        />
      </MuiDiv>
    )
  },
)
