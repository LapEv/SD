import { makeStyles } from '@mui/styles'

export const userRotateStyles = makeStyles({
  iconButton: {
    transition: 'transform .2s',
    transform: 'rotate(180deg)',
    '&.expanded': {
      transform: 'rotate(0deg)',
    },
  },
})
