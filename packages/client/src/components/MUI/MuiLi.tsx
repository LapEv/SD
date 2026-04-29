import { styled } from '@mui/material/styles'

export const MuiLi = styled('li', {
  name: 'MuiLi',
  overridesResolver: (props, styles) => {
    return [styles.root]
  },
})()
