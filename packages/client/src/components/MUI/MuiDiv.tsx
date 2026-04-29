import { styled } from '@mui/material/styles'

export const MuiDiv = styled('div', {
  name: 'MuiDiv',
  overridesResolver: (props, styles) => {
    return [styles.root]
  },
})()
