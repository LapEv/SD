import { styled } from '@mui/material/styles'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { Typography, Box } from '@mui/material'
import { memo } from 'react'

export const StyledLinearProgress = styled(LinearProgress)(({ theme, sx }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    ...sx,
  },
}))

export const LinearProgressWithLabel = memo(
  (
    props: LinearProgressProps & {
      value: number
      percent: number
      sx?: Record<string, unknown>
    },
  ) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <StyledLinearProgress
            variant="determinate"
            {...props}
            sx={props.sx}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.primary">{`${Math.floor(
            props.percent,
          )}%`}</Typography>
        </Box>
      </Box>
    )
  },
)
