import { styled } from '@mui/material/styles'

export const MuiSpan = styled('span', {
  name: 'MuiSpan',
  overridesResolver: (props, styles) => {
    return [styles.root]
  },
})()
