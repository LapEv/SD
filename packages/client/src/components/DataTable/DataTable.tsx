import { styled } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import { IDataTable } from './interface'
import { memo } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'

const StyledDataTable = styled(MUIDataTable)(({ theme }) => ({
  '.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? '#7fa99d!important'
        : '#9ed3c4!important',
  },
  '.Mui-checked+.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? '#033f17!important'
        : '#179b75!important',
  },
  '&.MuiTableCell-head, .MuiTableCell-paddingNone': {
    padding: '5px!important',
  },
}))

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: Record<string, unknown>
  }
}
export const DataTable = memo(
  ({ title, data, options, columns }: IDataTable) => {
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
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                },
              },
              MUIDataTable: {
                styleOverrides: {
                  paper: {
                    width: '100%',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderStyle: 'solid',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorLight}!important`
                        : `${(theme as ITheme).colorTheme.colorDark}!important`,
                    boxShadow:
                      theme.palette.mode === ThemeMode.light
                        ? `1px 2px 16px 3px ${(theme as ITheme).colorTheme.colorDark}`
                        : `0px 0px 6px 0px ${(theme as ITheme).colorTheme.colorLight}`,
                  },
                },
              },
              MUIDataTableHead: {
                styleOverrides: {
                  main: {
                    width: '100%',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                    height: 10,
                    minHeight: 10,
                  },
                },
              },
              MUIDataTableHeadCell: {
                styleOverrides: {
                  root: {
                    height: 10,
                    minHeight: 10,
                    padding: '10px!important',
                    paddingLeft: 5,
                    // display: 'block',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    // width: '100%!important',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.dark
                        ? '#1d4751'
                        : '#9ed3c4',
                    borderTopWidth: 2,
                    borderTopColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderTopStyle: 'solid',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderBottomStyle: 'solid',
                    borderLeftWidth: 1,
                    borderLeftColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderLeftStyle: 'solid',
                    // fontSize: '0.935rem',
                    fontWeight: 'bold',
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                  data: {
                    // fontSize: '0.935rem',
                    fontWeight: 'bold',
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                  sortAction: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // fontSize: 15,
                  },
                  sortActive: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    textDecoration: 'underLine',
                  },
                  tooltip: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                  toolButton: {
                    padding: 0,
                    paddingLeft: 10,
                  },
                },
              },
              MuiTableCell: {
                styleOverrides: {
                  paddingNone: {
                    padding: 3,
                  },
                  paddingCheckbox: {
                    padding: 0,
                  },
                  root: {
                    padding: 10,
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    borderLeftWidth: 1,
                    borderLeftColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderLeftStyle: 'solid',
                    borderBottomWidth: 1,
                    borderBottomColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderBottomStyle: 'solid',
                    borderTopWidth: 1,
                    borderTopColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderTopStyle: 'solid',
                  },
                },
              },
              MUIDataTableSelectCell: {
                styleOverrides: {
                  headerCell: {
                    backgroundColor:
                      theme.palette.mode === ThemeMode.dark
                        ? '#1d4751'
                        : '#9ed3c4',
                    borderTopWidth: 2,
                    borderTopColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderTopStyle: 'solid',
                    borderBottomWidth: 2,
                    borderBottomColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderBottomStyle: 'solid',
                  },
                  checkboxRoot: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  checked: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                },
              },
              MUIDataTableHeadRow: {
                styleOverrides: {
                  root: {
                    height: 10,
                    minHeight: 10,
                  },
                },
              },
              MUIDataTableBodyCell: {
                styleOverrides: {
                  root: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    fontWeight: 'normal',
                  },
                },
              },
              MUIDataTableToolbar: {
                styleOverrides: {
                  root: {
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                    height: (theme as ITheme).fontSize === 'small' ? 29 : 39,
                    minHeight: (theme as ITheme).fontSize === 'small' ? 29 : 39,
                    maxHeight: (theme as ITheme).fontSize === 'small' ? 29 : 39,
                  },
                  titleText: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    fontSize: (theme as ITheme).fontSize === 'small' ? 20 : 28,
                  },
                  icon: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    '&:hover': {
                      color: theme.palette.secondary.light,
                    },
                  },
                  iconActive: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    backgroundColor: theme.palette.secondary.light,
                    width: (theme as ITheme).fontSize === 'small' ? 28 : 38,
                    height: (theme as ITheme).fontSize === 'small' ? 28 : 38,
                  },
                  actions: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                },
              },
              MUIDataTableToolbarSelect: {
                styleOverrides: {
                  root: {
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    height: 39,
                    minHeight: 39,
                    maxHeight: 39,
                  },
                  iconButton: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                },
              },
              MUIDataTablePagination: {
                styleOverrides: {
                  root: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                  },
                  toolbar: {
                    minHeight: 38,
                    height: 38,
                    overflow: 'hidden',
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    '& div': {
                      '& svg': {
                        color:
                          theme.palette.mode === ThemeMode.light
                            ? (theme as ITheme).colorTheme.colorDark
                            : (theme as ITheme).colorTheme.colorLight,
                      },
                    },
                  },
                },
              },
              MUIDataTableResize: {
                styleOverrides: {
                  resizer: {
                    borderColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderWidth: 0,
                  },
                },
              },
              MUIDataTableViewCol: {
                styleOverrides: {
                  root: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                    boxShadow:
                      theme.palette.mode === ThemeMode.light
                        ? `1px 2px 16px 3px ${(theme as ITheme).colorTheme.colorDark}`
                        : `0px 0px 6px 0px ${(theme as ITheme).colorTheme.colorLight}`,
                    borderWidth: 2,
                    borderColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    borderStyle: 'solid',
                    borderRadius: 5,
                  },
                  title: {
                    fontSize: '0.935rem',
                    fontWeight: 'bold',
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                  },
                  checked: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  checkbox: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  label: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                },
              },
              MUIDataTableSearch: {
                styleOverrides: {
                  clearIcon: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  searchIcon: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  searchText: {
                    '& div': {
                      color:
                        theme.palette.mode === ThemeMode.light
                          ? '#000000'
                          : '#FFFFFF',
                      '&:before': {
                        borderBottom:
                          theme.palette.mode === ThemeMode.light
                            ? `2px solid ${(theme as ITheme).colorTheme.colorDark}`
                            : `2px solid ${(theme as ITheme).colorTheme.colorLight}`,
                      },
                      '&:after': {
                        borderBottom:
                          theme.palette.mode === ThemeMode.light
                            ? `2px solid ${(theme as ITheme).colorTheme.colorDark}`
                            : `2px solid ${(theme as ITheme).colorTheme.colorLight}`,
                      },
                    },
                  },
                },
              },
              MUIDataTableFilter: {
                styleOverrides: {
                  root: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    backgroundColor:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorLight
                        : (theme as ITheme).colorTheme.colorDark,
                  },
                  title: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    fontSize: '0.935rem',
                    fontWeight: 'bold',
                  },
                  checkbox: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                  },
                  checked: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                  },
                  resetLink: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  checkboxIcon: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? `${(theme as ITheme).colorTheme.colorDark}!important`
                        : `${(theme as ITheme).colorTheme.colorLight}!important`,
                  },
                  gridListTile: {
                    '& div': {
                      color:
                        theme.palette.mode === ThemeMode.light
                          ? (theme as ITheme).colorTheme.colorDark
                          : (theme as ITheme).colorTheme.colorLight,
                      '& label': {
                        color:
                          theme.palette.mode === ThemeMode.light
                            ? (theme as ITheme).colorTheme.colorDark
                            : (theme as ITheme).colorTheme.colorLight,
                        '&.Mui-focused': {
                          color:
                            theme.palette.mode === ThemeMode.light
                              ? (theme as ITheme).colorTheme.colorDark
                              : (theme as ITheme).colorTheme.colorLight,
                        },
                      },
                      '&.MuiInputBase-root': {
                        '&:before': {
                          borderBottom:
                            theme.palette.mode === ThemeMode.light
                              ? `2px solid ${(theme as ITheme).colorTheme.colorDark}`
                              : `2px solid ${(theme as ITheme).colorTheme.colorLight}`,
                        },
                        '&:after': {
                          borderBottom:
                            theme.palette.mode === ThemeMode.light
                              ? `2px solid ${(theme as ITheme).colorTheme.colorDark}`
                              : `2px solid ${(theme as ITheme).colorTheme.colorLight}`,
                        },
                        '& svg': {
                          color:
                            theme.palette.mode === ThemeMode.light
                              ? (theme as ITheme).colorTheme.colorDark
                              : (theme as ITheme).colorTheme.colorLight,
                        },
                      },
                    },
                  },
                },
              },
              MUIDataTableFilterList: {
                styleOverrides: {
                  chip: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? (theme as ITheme).colorTheme.colorDark
                        : (theme as ITheme).colorTheme.colorLight,
                    backgroundColor:
                      theme.palette.mode === ThemeMode.dark
                        ? '#1d4751'
                        : '#9ed3c4',
                  },
                  root: {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    paddingBottom: 5,
                    marginLeft: 5,

                    '& div': {
                      margin: 0,
                      marginRight: 5,
                    },
                  },
                },
              },
            },
          })
        }>
        <StyledDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    )
  },
)
