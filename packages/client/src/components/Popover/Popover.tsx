import { Popover as MuiPopover, PopoverProps, styled } from '@mui/material'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import { memo } from 'react'

const StyledPopover = styled(MuiPopover)(() => ({
  // '&.MuiPopover-root': {
  //   backgroundColor: 'rgba(0,0,0,0)',
  // },
}))

export const PopoverINC = memo((props: PopoverProps) => {
  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            MuiPopover: {
              styleOverrides: {
                paper: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderRadius: 5,
                  boxShadow: 'none',
                  marginTop: 27,
                },
              },
            },
          },
        })
      }>
      <StyledPopover {...props} />
    </ThemeProvider>
  )
})
