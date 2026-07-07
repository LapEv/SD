import { Theme, ThemeOptions } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'
import { IColorTheme } from 'storeAuth/interfaces'
import { TableINCState } from 'store/slices/tableINC/interfaces'

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
}

export const ThemeColor = {
  light: '#C1EEE1',
  lightBack: '#C1EEE1',
  dark: '#1E515D',
  darkBack: '#212121',
  error: red[400],
}

interface ThemeModeProps {
  mode: PaletteMode
  fontSize: string
  colorTheme: IColorTheme
  settings: TableINCState
}

export interface ITheme extends Theme {
  fontSize: string
  colorTheme: IColorTheme
}

export const ThemeConfig = ({
  mode,
  fontSize,
  colorTheme,
  settings,
}: ThemeModeProps) =>
  ({
    fontSize,
    colorTheme,
    typography: {
      fontFamily: 'Raleway',
      fontSize: fontSize === 'small' ? 12 : 16,
      color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      button: {
        textTransform: 'none',
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
      },
      body1: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 12 : 16,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      body2: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      body3: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 9 : 13,
        fontWeight: 'normal',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h6: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 22 : 30,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h5: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 20 : 28,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h4: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 18 : 26,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h3: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 16 : 24,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h2: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 14 : 22,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h1: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 12 : 20,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      subtitle1: {
        fontSize,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorTheme.colorLight : '#FFFFFF',
      },
      subtitle2: {
        fontFamily: 'Raleway',
        fontSize: fontSize === 'small' ? 11 : 15,
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
    },
    spacing: fontSize === 'large' ? 8 : 4,
    palette: {
      mode,
      ...(mode === ThemeMode.light
        ? {
            text: {
              primary: '#000000',
              secondary: colorTheme.colorDark,
            },
            green: {
              [64]: colorTheme.colorDark,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorTheme.colorLight,
              secondary: '#def0eb',
            },
            background: {
              default: colorTheme.colorLight,
              paper: colorTheme.colorLight,
              btn: '#7AB3A2',
            },
            primary: {
              main: colorTheme.colorLight,
              contrastText: colorTheme.colorDark,
            },
            secondary: {
              main: colorTheme.colorLight,
              light: 'rgba(33,127,100,0.5)',
            },
            error: {
              main: ThemeColor.error,
              height: 20,
            },
            input: {
              main: colorTheme.colorLight,
            },
            border: {
              default: '#000000',
            },
            info: {
              main: 'rgba(30,81,93,0.2)',
            },
          }
        : {
            text: {
              primary: '#E0E0E0',
              secondary: colorTheme.colorLight,
            },
            green: {
              [64]: colorTheme.colorLight,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorTheme.colorDark,
              secondary: '#def0eb',
            },
            background: {
              default: colorTheme.colorDark,
              paper: colorTheme.colorDark,
              btn: '#7AB3A2',
            },
            primary: {
              main: colorTheme.colorDark,
              contrastText: colorTheme.colorLight,
            },
            secondary: {
              main: colorTheme.colorDark,
              light: 'rgba(33,127,100,0.5)',
            },
            error: {
              main: ThemeColor.error,
              height: 20,
            },
            input: {
              main: colorTheme.colorDark,
            },
            border: {
              default: '#E0E0E0',
            },
            info: {
              main: 'rgba(193,238,225,0.2)',
            },
          }),
    },
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '&.dropdown': {
              width: '90%',
              height: fontSize === 'small' ? 30 : 40,
            },
            '&.dropdownINC': {
              width: 305,
              height: fontSize === 'small' ? 30 : 40,
            },
            '&.dropdownINConTable': {
              width: '100%',
              height:
                fontSize === 'small'
                  ? settings.dense
                    ? 21
                    : 28
                  : settings.dense
                    ? 28
                    : 38,
            },
            '&.dropdownINConEdit': {
              width: '60%',
              height:
                fontSize === 'small'
                  ? settings.dense
                    ? 17
                    : 24
                  : settings.dense
                    ? 24
                    : 34,
            },
            '&.dropdownModalList': {
              width: '100%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '8px' : '16px',
            },
            '&.dropdown_mt4': {
              marginTop: fontSize === 'small' ? '24px' : '32px',
            },
            '&.dropdown_mt3': {
              marginTop: fontSize === 'small' ? '16px' : '24px',
            },
            '&.multiline': {
              height: 'auto',
              // minHeight: fontSize === 'small' ? 30 : 40,
            },
            '&.dropdownCellsNewINC': {
              width: '90%',
              margin: '16px',
              marginTop: fontSize === 'small' ? '8px' : '16px',
              marginLeft: fontSize === 'small' ? '8px' : '8px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 30 : 40,
            '&.dropdownMultiple': {
              padding: 0,
              minHeight: fontSize === 'small' ? 30 : 40,
              height: 'auto',
              maxHeight: 200,
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              overflowY: 'hidden',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            },
            '&.textMultiCellsNewINC': {
              height: 90,
              padding: 10,
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            '&.pageListContainer': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'hidden',
              width: '90%',
              padding: '24px',
              borderColor: 'border.default',
              maxWidth: '1200px',
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 40 : 50,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.mainPageIconButton': {
              height: '100%',
              flexDirection: 'column',
              '& > .MuiListItemIcon-root': {
                minWidth: 0,
                justifyContent: 'center',
                width: '100%',
                height: 'auto',
                '& > svg': {
                  width: 100,
                  height: 100,
                },
              },
              '& > .MuiListItemText-root': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            '&.itemContainerLabel': {
              fontWeight: 'bold',
              fontSize: '1rem',
              width: '95%',
              height: fontSize === 'small' ? 30 : 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'space-between',
              marginTop: '16px',
            },
            '&.itemButtonCollapse': {
              fontWeight: 'bold',
              fontSize: '1rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'space-between',
              padding: 0,
            },
            '&.itemButtonCollapse1': {
              fontWeight: 'bold',
              fontSize: '1.9rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'space-between',
            },
            '&.height': {
              height: fontSize === 'small' ? 40 : 50,
            },
          },
        },
      },
      MuiCollapse: {
        styleOverrides: {
          root: {
            '&.collapseContainer': {
              fontWeight: 'bold',
              fontSize: '1rem',
              width: '85%',
              height: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'space-between',
              overflowY: 'auto',
              maxHeight: 250,
            },
            '&.profileAppOptionsContainer': {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '16px',
            },
            '&.width95': { width: '90%' },
            '&.width_100_height_auto': { width: '100%', height: 'auto' },
            '&.collapseList': {
              width: '100%',
              height: fontSize === 'small' ? 40 : 50,
            },
            '&.collapseList_p': {
              padding: '16px',
              paddingLeft: '40px',
              paddingRight: '40px',
            },
            '&.collapseQuickFilter': {
              width: 400,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            maxWidth: '100%!important',
            '&.separatorMove': {
              cursor: 'col-resize',
            },
            '&.mainHeaderForPages': {
              display: 'flex',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'hidden',
            },
            '&.mainPage': {
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '.MuiSvgIcon-root': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            fontFamily: 'Raleway',
            fontSize: fontSize === 'small' ? 12 : 15,
            '& .MuiTableCell-head': {
              fontWeight: 'bold',
              fontSize: fontSize === 'small' ? 12 : 15,
              height:
                fontSize === 'small'
                  ? settings.dense
                    ? 23
                    : 30
                  : settings.dense
                    ? 30
                    : 40,
              padding:
                fontSize === 'small'
                  ? settings.dense
                    ? '0px 10px'
                    : '0px 10px'
                  : settings.dense
                    ? '0px 9px'
                    : '2px 10px',
              borderBottomStyle: 'solid',
              borderBottomWidth: 2,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              backgroundColor: mode === ThemeMode.dark ? '#1d4751' : '#9ed3c4',
            },
            '& .MuiTableCell-body': {
              fontWeight: 'normal',
              fontSize: fontSize === 'small' ? 12 : 15,
              borderBottomStyle: 'solid',
              borderBottomWidth: settings.showCellBorders ? 1 : 0,
              borderRightStyle: 'solid',
              borderRightWidth: settings.showColumnBorders ? 1 : 0,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              height:
                fontSize === 'small'
                  ? settings.dense
                    ? 23
                    : 30
                  : settings.dense
                    ? 30
                    : 40,
              padding:
                fontSize === 'small'
                  ? settings.dense
                    ? '0px 10px'
                    : '0px 10px'
                  : settings.dense
                    ? '0px 9px'
                    : '2px 10px',
            },
            '& .MuiTableRow-root:nth-of-type(even)': {
              backgroundColor: mode === ThemeMode.dark ? '#5e8d8b' : '#b0e1d3',
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor: mode === ThemeMode.dark ? '#5e8d8b' : '#9ed3c4',
            },
            '& .MuiTableRow-root.Mui-selected': {
              backgroundColor: mode === ThemeMode.dark ? '#5e8d8b' : '#8fc4b8',
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
              borderBottomColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderTopStyle: 'solid',
              borderTopWidth: 1,
              borderTopColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '&.tableHeader': {
              position: 'sticky',
              pointerEvents: 'unset',
              boxSizing: 'border-box',
              overflow: 'inherit',
              // '&:has(.separatorContainer):hover': {
              //   borderStyle: 'solid',
              //   borderWidth: 2,
              //   borderColor:
              //     mode === ThemeMode.light
              //       ? colorTheme.colorDark
              //       : colorTheme.colorLight,
              // },
            },
            '&.cellStatusContainer': {
              padding:
                fontSize === 'small'
                  ? settings.dense
                    ? '1px 2px'
                    : '1px 2px'
                  : settings.dense
                    ? '1px 2px'
                    : '1px 2px',
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            '&.tableHeadToolbar': {
              height:
                fontSize === 'small' ? '35px!important' : '45px!important',
              minHeight:
                fontSize === 'small' ? '35px!important' : '45px!important',
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderStyle: 'solid',
              borderWidth: 2,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomWidth: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              paddingLeft: 0,
              paddingRight: '10px',
            },
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            m: 1,
            cursor: 'pointer',
            pointerEvents: 'unset',
            height: '100%',
            boxSizing: 'border-box',
            '&.resizeColumn': {
              cursor: 'col-resize',
            },
            '& > .headLabelBox': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            '&.editBox': {
              width: fontSize === 'small' ? 25 : 30,
              minWidth: fontSize === 'small' ? 25 : 30,
              justifyContent: 'center',
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 30 : 40,
            minHeight: fontSize === 'small' ? 30 : 40,
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            '.MuiTablePagination-toolbar': {
              minHeight: fontSize === 'small' ? 30 : 40,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.separator': {
              width: 2,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
            '&.editINC': {
              width: '100%',
              marginTop: fontSize === 'small' ? 8 : 16,
              marginBottom: fontSize === 'small' ? 6 : 12,
            },
            '&.editINCbox': {
              width: '100%',
              marginTop: fontSize === 'small' ? 4 : 8,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '&.textFieldViewColumns': {
              width: '95%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: '24px',
            },
            '&.searchFilter': {
              transition: ' width 0.2s ease-in-out',
              '& > .MuiInput-root': {
                fontSize: fontSize === 'small' ? 12 : 15,
                height: fontSize === 'small' ? 20 : 30,
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                '& > input': {
                  paddingTop: fontSize === 'small' ? 5 : 10,
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  color:
                    mode === ThemeMode.light
                      ? colorTheme.colorDark
                      : colorTheme.colorLight,
                },
              },
            },
            '&.modalTextContainer': {
              width: '90%',
              marginTop: '24px',
              height: 30,
              '& label': {
                top: fontSize === 'small' ? -6 : -10,
              },
              '& > .MuiInputBase-root': {
                width: '100%',
                height: '35px',
              },
            },
            '&.multiline': {
              height: 'auto',
            },
            '&.textCellsNewINC': {
              width: '90%',
              margin: '16px',
              marginTop: fontSize === 'small' ? '8px' : '16px',
              marginLeft: '8px',
            },
            '&.textMultiCellsNewINC': {
              width: '90%',
              margin: '8px',
              marginTop: fontSize === 'small' ? '8px' : '16px',
              height: 90,
            },
            '&.textMultiCellsCloseINC': {
              width: '100%',
              marginTop: fontSize === 'small' ? '32px' : '40px',
              height: 90,
            },

            '&.textMultiCellsEditINC': {
              width: '100%',
              margin: 0,
              marginTop: fontSize === 'small' ? '4px' : '8px',
              height: 95,
              '& > .MuiInputBase-root': {
                fontSize: fontSize === 'small' ? 11 : 14,
                fontWeight: 'bold',
              },
              '& > .MuiFormLabel-root': {
                fontSize: fontSize === 'small' ? 11 : 14,
              },
            },
          },
        },
      },
      BoxModal: {
        styleOverrides: {
          root: {
            '&.pageProfileContainer': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              overflowX: 'hidden',
              width: '90%',
              padding: '24px',
              borderColor: 'border.default',
              maxWidth: 1200,
              height: '100%',
            },
            '&.newINC': {
              minHeight: 500,
              width: '50%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            },
            '&.editINC': {
              minHeight: 500,
              maxWidth: 1250,
              width: '90%',
              paddingTop: fontSize === 'small' ? 0 : 1,
              paddingLeft: fontSize === 'small' ? '8px' : '16px',
              paddingRight: fontSize === 'small' ? '8px' : '16px',
              overflow: 'hidden',
            },
            '&.systemSectionContainer': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 24,
            },
          },
        },
      },
      MuiDiv: {
        styleOverrides: {
          root: {
            '&.logo_arrow': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              minHeight: fontSize === 'small' ? 40 : 55,
            },
            '&.sideBarBox': {
              width: '100%',
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 12,
            },
            '&.avatarBox': {
              background:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderRadius: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            '&.sideBarListBox': { mmarginTop: 18, height: 'auto' },
            '&.sideBarUserAuth': {
              width: '100%',
              height: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 0,
            },
            '&.headerForPages': {
              minHeight: fontSize === 'small' ? 40 : 55,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '40px',
              paddingRight: '16px',
              boxShadow:
                mode === ThemeMode.light
                  ? `0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)`
                  : `0px 3px 5px -1px rgba(255, 255, 255, 0.2), 0px 5px 8px 0px rgba(255, 255, 255, 0.14), 0px 1px 14px 0px rgba(255, 255, 255, 0.12)`,
            },
            '&.boxElementMainPage': {
              display: 'block',
              boxShadow: '0px 0px 9px 2px #1E515D',
              borderRadius: 2,
              width: 170,
              height: 170,
              margin: 20,
            },
            '&.mainTableStyle': {
              width: '100%',
              height: '100%',
              padding: '8px',
            },
            '&.tableBorder': {
              boxShadow: '0px 0px 9px #1E515D',
              borderRadius: '5px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            },
            '&.containerCollapse': {
              display: 'flex',
              borderRadius: '7px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: '16px',
              borderWidth: 2,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              borderStyle: 'solid',
              boxShadow:
                mode === ThemeMode.light
                  ? `0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)`
                  : `0px 3px 5px -1px rgba(255, 255, 255, 0.2), 0px 5px 8px 0px rgba(255, 255, 255, 0.14), 0px 1px 14px 0px rgba(255, 255, 255, 0.12)`,
              padding: '4px',
              '& > div': {
                height: fontSize === 'small' ? 35 : 60,
              },
            },
            '&.appLoading': {
              width: '100%',
              height: '100vh',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1999,
              backgroundColor: 'rgba(0,0,0,0.7)',
              position: 'fixed',
            },
            '&.tableContainer': {
              width: '100%',
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              height: '85%',
              flex: 1,
            },
            '&.selectedBoxStyle': {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 2,
              borderTopWidth: 0,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              width: '100%',
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              height: fontSize === 'small' ? 35 : 40,
              minHeight: fontSize === 'small' ? 35 : 40,
            },
            '&.tableHeaderCell': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              pointerEvents: 'unset',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              boxSizing: 'border-box',
            },
            '&.separatorContainer': {
              position: 'absolute',
              right: -5,
              top: '10%',
              height: '80%',
              width: 10,
              zIndex: 50,
              cursor: 'col-resize',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              '&: hover': {
                '& > .separator': {
                  width: 4,
                  borderRadius: 15,
                },
              },
              '&:active': {
                userSelect: 'none',
              },
            },
            '&.boxViewColumn': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: fontSize === 'small' ? 30 : 40,
            },
            '&.listViewColumn': {
              maxHeight: '35vH',
              overflowX: 'hidden',
              overflowY: 'auto',
              height: 'auto',
              marginTop: fontSize === 'small' ? 16 : 24,
            },
            '&.buttonsContainerFilter': {
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              margin: 0,
              '& > button': {
                width: '27%',
                fontWeight: 'bold',
              },
            },
            '&.searchFilterBox': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            '&.containerToPrint': {
              textAlign: 'center',
              display: 'none',
            },
            '&.printType': {
              textAlign: 'center',
            },
            '&.modalMainContainer': {
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '35%',
              top: '50%',
              left: '50%',
              height: 'auto',
              maxHeight: '95%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.default',
              borderWidth: 2,
              borderColor: 'border.default',
              borderStyle: 'solid',
              borderRadius: 3,
              boxShadow: 24,
              padding:
                fontSize === 'small' ? '20px!important' : '32px!important',
              paddingLeft: '25px',
              overflowY: 'auto',
              overflowX: 'hidden',
            },
            '&.heigth400': {
              height: 400,
            },
            '&.minHeight500': {
              minHeight: 500,
            },
            '&.newINC': {
              minHeight: 500,
              width: '80%',
            },
            '&.modalINCContainer': {
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '40%',
              top: '50%',
              left: '50%',
              height: 'auto',
              maxHeight: '95%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.default',
              borderWidth: 2,
              borderColor: 'border.default',
              borderStyle: 'solid',
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              overflowY: 'auto',
              overflowX: 'hidden',
            },
            '&.boxModalContainer': {
              width: '100%',
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            '&.incStatusesContainer': {
              marginTop: '16px',
              padding: '24px',
              paddingTop: '8px',
              paddingBottom: '8px',
              width: '100%',
              borderRadius: 5,
              fontWeight: 'normal',
              color: mode === ThemeMode.light ? '#FFFFFFFF' : '#00000000',
              cursor: 'pointer',
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
            '&.noDraggingINCStatuses': {
              color: mode === ThemeMode.light ? '#FFFFFF82' : '#00000082',
              cursor: 'default',
            },
            '&.boxDataModal': {
              marginTop: '16px',
              width: '100%',
              maxHeight: '65vH',
              height: '45vH',
              overflowX: 'hidden',
              overflowY: 'auto',
              paddingLeft: '24px',
            },
            '&.mt0': {
              marginTop: 0,
            },
            '&.h35Vh': {
              height: '35vH',
            },
            '&.modalError': {
              color: ThemeColor.error,
              height: '20px',
              marginTop: '8px',
              minHeight: '10px',
            },
            '&.modalErrorMT2': {
              color: ThemeColor.error,
              height: '20px',
              marginTop: '16px',
            },
            '&.modalErrorCloseCheckNC': {
              color: ThemeColor.error,
              height: '0px',
              marginTop: '4px',
              fontSize: fontSize === 'small' ? '8px' : '12px',
            },
            '&.modalErrorML5': {
              color: ThemeColor.error,
              height: '20px',
              marginLeft: '40px',
            },
            '&.listItemAddRole': {
              width: '85%',
              paddingLeft: '16px',
              paddingTop: '8px',
              height: 'auto',
              maxHeight: 300,
              overflowY: 'auto',
              overflowX: 'hidden',
            },
            '&.container_mt2_pl3_w100': {
              marginTop: '16px',
              width: '100%',
              paddingLeft: '24px',
            },
            '&.w90_mt3': {
              marginTop: fontSize === 'small' ? '16px' : '24px',
              width: '90%',
            },
            '&.w90_mt2': {
              marginTop: fontSize === 'small' ? '8px' : '16px',
              width: '90%',
            },
            '&.w90_mt1': {
              marginTop: fontSize === 'small' ? '6px' : '10px',
              width: '90%',
            },
            '&.boxIndicatorContainer': {
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            '&.boxIndicatorEditINCContainer': {
              marginRight: 20,
              marginLeft: 20,
            },

            '&.boxIndicator': {
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
              width: fontSize === 'small' ? '120%' : '100%',
            },
            '&.boxIndicatorContent': {
              position: 'absolute',
              zIndex: 1,
              width: 50,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: fontSize === 'small' ? 18 : 25,
              opacity: 0.85,
              fontSize: 13,
            },
            '&.profileAppOptionsContainer': {
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: 'auto',
              marginTop: '16px',
            },
            '&.flexColumn': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              width: '100%',
            },
            '&.width95_mt1': {
              width: '95%',
              marginTop: '8px',
            },
            '&.boxList_flexSC': {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: '8px',
            },
            '&.boxFilterChip': {
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              overflow: 'auto',
              marginRight: '2px',
              '& > .MuiStack-root': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 0.5,
                flex: 1,
                height: '35px',
                '& > .MuiChip-root': {
                  height: fontSize === 'small' ? '22px' : '24px',
                  fontSize: fontSize === 'small' ? 8 : 12,
                },
              },
            },
            '&.stackFilterBox': {
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            '&.editContainer': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            },
            '&.editTitle': {
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              borderBottomStyle: 'solid',
              borderBottomWidth: 2,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              padding: fontSize === 'small' ? '3px' : '5px',

              paddingLeft: fontSize === 'small' ? '8px' : '16px',
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
            '&.editDataContainer': {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingTop: 7,
            },
            '&.editLogsContainer': {
              width: '99.5%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: 7,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderRadius: 5,
              padding: fontSize === 'small' ? '6px' : '10px',
              overflowY: 'auto',
              maxHeight: 140,
              marginTop: fontSize === 'small' ? '6px' : '10px',
              marginLeft: 5,
            },
            '&.editButtonContainer': {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 10,
              '& > div': {
                '& > .MuiButtonBase-root': {
                  width: 210,
                  minWidth: 210,
                },
              },
            },

            '&.editDataBox': {
              width: '33.3333%',
              minWidth: '33.3333%',
              paddingLeft: fontSize === 'small' ? '2px' : '5px',
              paddingRight: fontSize === 'small' ? '2px' : '5px',
            },
            '&.editDataButtonBox': {
              width: '100%',
              minWidth: '100%',
            },
            '&.cellINCContainer': {
              display: 'flex',
              flexDirection: 'row',
              color:
                mode === ThemeMode.dark
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              width: '100%',
              margin: '3px',
            },
            '&.cellINCLabel': {
              width: 125,
              minWidth: 125,
              fontWeight: 'normal',
            },
            '&.cellINCValue': {
              fontSize: fontSize === 'small' ? '11px' : '14px',
              paddingTop: '2px',
              maxHeight: 100,
              overflow: 'auto',
            },
            '&.progressContainer': {
              width: '100%',
              height: 60,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'auto',
              userSelect: 'none',
            },
            '&.progressBox': {
              width: '80%',
              marginTop: 5,
              '& > .progressContent': {
                width: '100%',
              },
              '& > .MuiLinearProgress-root': {
                width: '100%',
              },
            },
            '&.buttonsModalSection': {
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: fontSize === 'small' ? '30px' : '24px',
              width: '100%',
            },
            '&.viewActContainer': {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            '&.viewActBox': {
              width: 'calc(100% - 140px)',
              maxHeight: '95%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              // '& > img': {
              //   maxWidth: '100%',
              // },
            },
            '&.viewButtonPanel': {
              position: 'absolute',
              width: 150,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              top: 5,
              right: 5,
              backgroundColor: 'rgba(0,0,0,1)',
            },
            '&.addActContainer': {
              borderWidth: 2,
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderStyle: 'solid',
              marginTop: fontSize === 'small' ? '12px' : '16px',
              width: '90%',
              borderRadius: 5,
              padding: 5,
              maxHeight: 200,
              minHeight: 200,
              height: 'auto',
              overflowY: 'auto',
              cursor: 'copy',
              position: 'relative',
              '& > .MuiChip-root': {
                fontSize: fontSize === 'small' ? 11 : 15,
                height: fontSize === 'small' ? 24 : 32,
                margin: 2,
                cursor: 'auto',
                zIndex: 3,
                color:
                  mode === ThemeMode.dark
                    ? colorTheme.colorLight
                    : colorTheme.colorDark,
              },
              '&.noActs': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
              },
            },
            '&.noActBox': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color:
                mode === ThemeMode.dark
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              fontSize: fontSize === 'small' ? '12px' : '16px',
            },
            '&.addActBoxBackground': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              opacity: 0.2,
              zIndex: 2,
              color:
                mode === ThemeMode.dark
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              fontSize: fontSize === 'small' ? '12px' : '16px',
            },
            '&.opacity005': {
              opacity: 0.05,
            },
            '&.w100': {
              width: '100%',
            },
            '&.filledContainer': {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 30,
              marginTop: fontSize === 'small' ? '5px' : '15px',
            },
            '&.arrowUpDownContainer': {
              position: 'absolute',
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            },
            '&.textFieldInputNumberBox': {
              width: 90,
              position: 'relative',
              display: 'flex',
            },
            '&.savedTemplateBox': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '&.savedTemplateNoElements': {
              opacity: 0.5,
              textAlign: 'center',
              marginTop: 10,
            },
          },
        },
      },
      MuiSpan: {
        styleOverrides: {
          root: {
            '.dropdown_span': {
              width: 14,
              height: 14,
              flexShrink: 0,
              borderRadius: '3px',
              marginRight: '8px',
              marginTop: '2px',
            },
            '&.editINClogs': {
              fontSize: fontSize === 'small' ? '11px' : '14px',
              color:
                mode === ThemeMode.dark
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
            '&.modalError': {
              color: ThemeColor.error,
              height: '20px',
              marginTop: '8px',
              minHeight: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: fontSize === 'small' ? '11px' : '14px',
            },
            '&.viewSpanPanel': {
              position: 'absolute',
              top: 5,
              left: 15,
              backgroundColor: 'rgba(0,0,0,1)',
              color: colorTheme.colorLight,
              fontSize: fontSize === 'small' ? 14 : 18,
            },
            '&.viewInfoPanel': {
              position: 'absolute',
              bottom: 10,
              left: 15,
              backgroundColor: 'rgba(0,0,0,1)',
              color: colorTheme.colorLight,
              fontSize: fontSize === 'small' ? 12 : 16,
            },
          },
        },
      },
      MuiLi: {
        styleOverrides: {
          root: {
            '&.dropdown_li': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              fontWeight: 'normal',
              fontSize: fontSize === 'small' ? 12 : 16,
              padding: fontSize === 'small' ? 4 : 4,
              paddingLeft: fontSize === 'small' ? 8 : 16,
              paddingRight: fontSize === 'small' ? 8 : 16,
              cursor: 'pointer',
              '&.dd_li_onedit': {
                fontSize: fontSize === 'small' ? 10 : 14,
                paddingLeft: fontSize === 'small' ? 5 : 12,
                paddingRight: fontSize === 'small' ? 5 : 12,
              },
              '&:hover': {
                fontWeight: 'bold',
              },
              '&.selected': {
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              '& > div': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
            },
            '&.dropdown_li_dark': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              fontWeight: 'normal',
              fontSize: fontSize === 'small' ? 12 : 16,
              padding: fontSize === 'small' ? 4 : 4,
              paddingLeft: fontSize === 'small' ? 8 : 16,
              paddingRight: fontSize === 'small' ? 8 : 16,
              cursor: 'pointer',
              '&:hover': {
                fontWeight: 'bold',
              },
              '&.selected': {
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              '& > div': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.selectedTextStyle': {
              paddingLeft: 10,
              fontWeight: 'bold',
              fontFamily: 'Raleway',
              fontSize: fontSize === 'small' ? 12 : 15,
              lineHeight: 1.43,
              width: 300,
            },
            '&.newINC': {
              margin: '0 auto',
            },
            '&.fontSize1rem': {
              fontSize: '1rem!important',
            },
            '&.progressTitle': {
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              fontSize: fontSize === 'small' ? 9 : 13,
              marginTop: 10,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          message: {
            fontWeight: 'bold',
            color:
              mode === ThemeMode.light
                ? colorTheme.colorDark
                : colorTheme.colorLight,
            '& > div': {
              fontWeight: 'bold',
              color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
            },
          },
          icon: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
          },
          root: {
            '&.MuiAlert-standard': {
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            zIndex: 99999,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 0px 9px 2px #1E515D',
            '&.paperFilterMenu': {
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              width: fontSize === 'small' ? 890 : 900,
              padding: 20,
              paddingLeft: 10,
              paddingRight: 10,
            },
            '&.DropDownPaper': {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              marginTop: fontSize === 'small' ? '29px' : '40px',
              '&.DropDownPaperDark': {
                backgroundColor:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
              },
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor:
                  mode === ThemeMode.light
                    ? colorTheme.colorLight
                    : colorTheme.colorDark,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
            '& .MuiPickersLayout-root': {
              '& > .MuiDialogActions-root': {
                '& button': {
                  color:
                    mode === ThemeMode.light
                      ? colorTheme.colorDark
                      : colorTheme.colorLight,
                },
              },
            },
            '&.dropdownINC': {
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '80vH',
              textOverflow: 'ellipsis',
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              '& > ul': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: 8,
                paddingBootom: 8,
              },
              '& > .MuiAutocomplete-noOptions': {
                fontWeight: 'normal',
              },
            },
            '&.dropdownDark': {
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '80vH',
              textOverflow: 'ellipsis',
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              '& > ul': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: 8,
                paddingBootom: 8,
              },
              '& > .MuiAutocomplete-noOptions': {
                fontWeight: 'normal',
              },
            },
            '&.dropdownINC_': {
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '80vH',
              textOverflow: 'ellipsis',
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              '& > ul': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: 8,
                paddingBootom: 8,
              },
              '& > .MuiAutocomplete-noOptions': {
                fontWeight: 'normal',
              },
            },
            '&.paperViewColumnsMenu': {
              padding: fontSize === 'small' ? '16px' : '24px',
            },
            '&.paperMessageAlert': {
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              borderRadius: 7,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
          },
        },
      },
      MuiMultiSectionDigitalClock: {
        styleOverrides: {
          root: {
            '& > .MuiList-root': {
              '& > .MuiButtonBase-root': {
                fontWeight: 'normal',
              },
              '& > .MuiButtonBase-root.Mui-selected': {
                fontWeight: 'bold',
                borderRadius: '50%',
                backgroundColor:
                  mode === ThemeMode.light
                    ? 'rgba(0,0,0,0.2)!important'
                    : 'rgba(255,255,255,0.2)!important',
              },
            },
          },
        },
      },
      MuiPopper: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === ThemeMode.light
                ? `0px 0px 13px 5px rgba(0, 0, 0, 0.5)`
                : `0px 0px 13px 5px rgba(255, 255, 255, 0.5)`,
            '&.MuiTooltip-popper': {
              boxShadow: 'none',
            },
            '&.poperViewColumnsMenu': {
              zIndex: 99,
              borderRadius: 15,
            },
            '&.poperFilterMenu': {
              zIndex: 99,
              borderRadius: 15,
            },
            '&.viewFileTooltip': {
              backgroundColor: 'rgba(97, 97, 97, 0.92)',
              color: '#FFF',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&.quickFilterpaper': {
              minWidth: '350px',
              width: '400px',
              '& > .MuiListItemText-root': {
                '& > span': {
                  fontSize: fontSize === 'small' ? 11 : 15,
                },
              },
            },
            '&.dropDownMenuItem': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
            '&:hover': {
              backgroundColor:
                mode === ThemeMode.light
                  ? 'rgba(30,81,93,0.2)'
                  : 'rgba(205, 219, 223, 0.2)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.viewColumnsIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.settingsIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.quickIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.filterIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.exportExcelIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.clearFilterIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
              margin: 0,
            },
            '&.editIconButton': {
              width: fontSize === 'small' ? 23 : 30,
              height: fontSize === 'small' ? 23 : 30,
              margin: 0,
            },
            '&.editINCIconButton': {
              width: fontSize === 'small' ? 24 : 30,
              height: fontSize === 'small' ? 24 : 30,
              margin: 0,
              position: 'absolute',
              right: 15,
            },
            '&.searchIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.attachIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.printIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.newIncidentIconButton': {
              width: fontSize === 'small' ? 29 : 35,
              height: fontSize === 'small' ? 29 : 35,
            },
            '&.menuINCIconButton': {
              width: fontSize === 'small' ? 23 : 30,
              height: fontSize === 'small' ? 23 : 30,
              borderRadius: '20%',
              marginLeft: '10px',
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
            '&.addIconButton': {
              marginTop: '8px',
              width: fontSize === 'small' ? 33 : 40,
              height: fontSize === 'small' ? 33 : 40,
              borderRadius: '20%',
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              boxShadow:
                mode === ThemeMode.light
                  ? `0px 0px 8px 1px rgba(0, 0, 0, 0.5)`
                  : `0px 0px 8px 1px rgba(255, 255, 255, 0.5)`,
              marginLeft: '40px',
              marginBottom: '8px',
            },
            '&.viewActIconButton': {
              width: fontSize === 'small' ? 19 : 25,
              height: fontSize === 'small' ? 19 : 25,
              borderRadius: '15%',
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
              boxShadow:
                mode === ThemeMode.light
                  ? `0px 0px 8px 1px rgba(0, 0, 0, 0.5)`
                  : `0px 0px 8px 1px rgba(255, 255, 255, 0.5)`,
              marginLeft: '5px',
            },
            '&.arrowIconButton': {
              width: 70,
              height: '100%',
              borderRadius: 0,
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
            '&.viewActButtons': {
              width: fontSize === 'small' ? 40 : 45,
              height: fontSize === 'small' ? 40 : 45,
              color: colorTheme.colorLight,
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            '&.viewColumnsIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.settingsIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.quickIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.filterIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.exportExcelIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.clearFilterIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.editINCIcon': {
              width: fontSize === 'small' ? 22 : 27,
              height: fontSize === 'small' ? 22 : 27,
            },
            '&.editIcon': {
              width: fontSize === 'small' ? 25 : 30,
              height: fontSize === 'small' ? 25 : 30,
            },
            '&.searchIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.attachIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.printIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.newIncidentIcon': {
              width: fontSize === 'small' ? 18 : 20,
              height: fontSize === 'small' ? 18 : 20,
            },
            '&.menuINCIcon': {
              width: fontSize === 'small' ? 23 : 25,
              height: fontSize === 'small' ? 23 : 25,
            },
            '&.colorForIconDark': {
              color:
                mode === ThemeMode.light
                  ? `${colorTheme.colorDark}!important`
                  : `${colorTheme.colorLight}!important`,
              margin: 0,
            },
            '&.colorForIconLight': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorLight
                  : colorTheme.colorDark,
            },
            '&.viewActIcon': {
              width: fontSize === 'small' ? 16 : 18,
              height: fontSize === 'small' ? 16 : 18,
            },
            '&.viewActCloseIcon': {
              width: fontSize === 'small' ? 30 : 35,
              height: fontSize === 'small' ? 30 : 35,
            },
            '&.noActIcon': {
              width: fontSize === 'small' ? 40 : 50,
              height: fontSize === 'small' ? 40 : 50,
            },
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            '&.stackFilterTrigger': {
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            },
            '&.newINC': {
              flexWrap: 'wrap',
              height: fontSize === 'small' ? 440 : 550,
              width: '52%',
              marginTop: '8px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            },
            '&.mainPageListBox': {
              flexWrap: 'wrap',
              width: '100%',
              height: '75%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            '&.selectFilterTrigger': {
              height: fontSize === 'small' ? 30 : 40,
              width: 205,
            },
            '&.selectLogicFilterTrigger': {
              height: fontSize === 'small' ? 30 : 40,
              width: 100,
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '&.formControlFilterTrigger': {
              width: 210,
              margin: 0,
            },
            '&.formControlLogicFilterTrigger': {
              width: 105,
              margin: 0,
              minWidth: 100,
            },
            '&.textContainerFilterTrigger': {
              margin: '0!important',
              width: 305,
              '& > div': {
                width: 305,
              },
            },
            '&.textContainerINC': {
              margin: '0!important',
              width: '100%',
              '& > div': {
                width: '100%',
              },
            },
            '&.textContainerINConTable': {
              margin: '0!important',
              width: '100%',
              height: '100%',
              '& > div': {
                width: '100%',
                height: '100%',
                '& > input': {
                  fontSize: fontSize === 'small' ? 12 : 15,
                  fontWeight: 'normal',
                  color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
                },
              },
            },
            '&.textContainerINConEdit': {
              margin: '0!important',
              width: '100%',
              height: '100%',
              '& > div': {
                width: '100%',
                height: '100%',
                paddingLeft: '0!important',
                '&.Mui-focused': {
                  '& fieldset': {
                    border: `0px solid ${
                      mode === ThemeMode.dark
                        ? colorTheme.colorLight
                        : colorTheme.colorDark
                    }! important`,
                    borderBottomWidth: '1px!important',
                  },
                },
                '& > input': {
                  fontSize: fontSize === 'small' ? 11 : 14,
                  fontWeight: 'bold',
                  color:
                    mode === ThemeMode.light
                      ? colorTheme.colorDark
                      : colorTheme.colorLight,
                  padding: '6.5px 0px 7.5px 0px !important',
                },
                '& > .MuiAutocomplete-endAdornment': {
                  right: 0,
                },
                '& > fieldset': {
                  borderWidth: 0,
                  borderRadius: 0,
                  borderColor:
                    mode === ThemeMode.dark
                      ? colorTheme.colorLight
                      : colorTheme.colorDark,
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                },
                '&:hover > fieldset': {
                  borderRadius: 0,
                  borderColor:
                    mode === ThemeMode.dark
                      ? colorTheme.colorLight
                      : colorTheme.colorDark,
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderStyle: 'solid',
                },
                '&:focus > fieldset': {
                  borderRadius: 0,
                  borderColor:
                    mode === ThemeMode.dark
                      ? colorTheme.colorLight
                      : colorTheme.colorDark,
                  borderWidth: '0!important',
                  borderBottomWidth: '1px!important',
                  borderStyle: 'solid',
                },
              },
            },
            '&.boxTextonEdit': {
              height: 24,
              width: '60%',
            },

            '&.datePickerFilter': {
              width: 305,
              margin: '0!important',
              height: fontSize === 'small' ? 30 : 40,
              '& label': {
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
              },
              '& > .MuiPickersInputBase-root': {
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                '& fieldset': {
                  borderColor:
                    mode === ThemeMode.light
                      ? `${colorTheme.colorDark}!important`
                      : `${colorTheme.colorLight}!important`,
                  borderWidth: 1,
                  borderStyle: 'solid',
                },
                '&: hover': {
                  '& fieldset': {
                    borderWidth: 2,
                  },
                },
                '&: focus': {
                  '& fieldset': {
                    borderColor:
                      mode === ThemeMode.light
                        ? colorTheme.colorDark
                        : colorTheme.colorLight,
                    borderStyle: 'solid',
                    borderWidth: 2,
                  },
                },
                '& > .MuiInputAdornment-root': {
                  '& > .MuiButtonBase-root': {
                    '& > .MuiSvgIcon-root': {
                      color:
                        mode === ThemeMode.light
                          ? colorTheme.colorDark
                          : colorTheme.colorLight,
                    },
                  },
                },
              },
            },
            '&.datePickerFilterEditINC': {
              width: '60%',
              margin: '0!important',
              height: fontSize === 'small' ? 20 : 24,
              '& label': {
                fontSize: fontSize === 'small' ? 11 : 14,
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
              },
              '& > .MuiPickersInputBase-root': {
                fontSize: fontSize === 'small' ? 11 : 14,
                height: fontSize === 'small' ? 20 : 24,
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                padding: 0,
                '& fieldset': {
                  borderColor:
                    mode === ThemeMode.light
                      ? `${colorTheme.colorDark}!important`
                      : `${colorTheme.colorLight}!important`,
                  borderWidth: 0,
                  borderStyle: 'solid',
                  borderRadius: 0,
                  padding: '9px 0px',
                },
                '&: hover': {
                  '& fieldset': {
                    borderBottomWidth: 2,
                  },
                },
                '&: focus': {
                  '& fieldset': {
                    borderColor:
                      mode === ThemeMode.light
                        ? colorTheme.colorDark
                        : colorTheme.colorLight,
                    borderStyle: 'solid',
                    borderBottomWidth: 2,
                  },
                },
                '& > .MuiPickersSectionList-root': {
                  padding: 0,
                },
                '& > .MuiInputAdornment-root': {
                  margin: 0,
                  '& > .MuiButtonBase-root': {
                    marginRight: '-6px',
                    '& > .MuiSvgIcon-root': {
                      color:
                        mode === ThemeMode.light
                          ? colorTheme.colorDark
                          : colorTheme.colorLight,
                      width: fontSize === 'small' ? 18 : 22,
                      height: fontSize === 'small' ? 18 : 22,
                    },
                  },
                },
              },
            },
            '&.datePicker': {
              width: '90%',
              marginTop: fontSize === 'small' ? '16px' : '24px',
              height: fontSize === 'small' ? 30 : 40,
              '& label': {
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                top: '-7px',
              },
              '& > .MuiPickersInputBase-root': {
                color:
                  mode === ThemeMode.dark
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                backgroundColor:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
                '& fieldset': {
                  borderWidth: 0,
                },
                '&: hover': {
                  '& fieldset': {
                    borderWidth: 0,
                  },
                },
                '&: focus': {
                  '& fieldset': {
                    borderWidth: 0,
                  },
                },
                '& > .MuiInputAdornment-root': {
                  '& > .MuiButtonBase-root': {
                    '& > .MuiSvgIcon-root': {
                      color:
                        mode === ThemeMode.dark
                          ? colorTheme.colorDark
                          : colorTheme.colorLight,
                    },
                  },
                },
              },
            },
            '&.newINC': {
              width: '90%',
              margin:
                fontSize === 'small' ? '16px!important' : '16px!important',
              marginTop:
                fontSize === 'small' ? '8px!important' : '16px!important',
              marginLeft: '8px!important',
            },

            '&.textContainer_mt2': {
              width: '100%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '20px' : '16px',
            },
            '&.textContainer_mt3': {
              width: '100%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '30px' : '24px',
            },
            '&.textContainer': {
              width: '100%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '24px' : '32px',
            },
            '&.textContainer_w90': {
              width: '90%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '24px' : '32px',
            },
            '&.textContainer_w90_mt3': {
              width: '90%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '16px' : '24px',
            },
            '&.textContainer_w90_mt2': {
              width: '90%',
              height: fontSize === 'small' ? 30 : 40,
              marginTop: fontSize === 'small' ? '8px' : '16px',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '&.itemsContaimer': {
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '8px',
              marginLeft: fontSize === 'small' ? '0px' : '0px',
            },
            '&.checkBoxContainer': {
              width: '85%',
              marginTop: fontSize === 'small' ? '8px' : '10px',
            },
            '&.listModalAddUser': {
              marginLeft: fontSize === 'small' ? '23px' : '48px',
              padding: '8px',
            },
            '&.listItemsChangeRolesGr': {
              padding: '2px',
            },
            '&.listItems': {
              padding: '2px',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            '&.listItemsTextContainer': {
              margin: 0,
              marginLeft: fontSize === 'small' ? '80px' : '40px',
            },
            '&.quickFilterText': {
              '& > span': {
                fontSize: fontSize === 'small' ? 10 : 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            },
          },
        },
      },
      MuiPickersInputBase: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 30 : 40,
          },
        },
      },
      MuiPickersLayout: {
        styleOverrides: {
          root: {
            '& > .MuiDialogActions': {
              '& button': {
                color:
                  mode === ThemeMode.light
                    ? colorTheme.colorDark
                    : colorTheme.colorLight,
              },
            },
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor:
                mode === ThemeMode.light
                  ? 'rgba(0,0,0,0.2)!important'
                  : 'rgba(255,255,255,0.2)!important',
              fontWeight: 'bold',
            },
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          root: {
            '& > .MuiDayCalendar-header': {
              '& > .MuiDayCalendar-weekDayLabel': {
                fontWeight: 'bold',
              },
            },
          },
        },
      },
      MuiYearCalendar: {
        styleOverrides: {
          root: {
            '& > button': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              fontWeight: 'normal',
              '&.Mui-selected': {
                fontWeight: 'bold',
              },
            },
          },
        },
      },
      MuiMonthCalendar: {
        styleOverrides: {
          root: {
            '& > button': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
              fontWeight: 'normal',
              '&.Mui-selected': {
                fontWeight: 'bold',
              },
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 3,
            width: 50,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: fontSize === 'small' ? 18 : 25,
            opacity: 0.85,
            '&.MuiLinearProgress-colorPrimary': {
              backgroundColor:
                mode === ThemeMode.light ? '#bdbdbd80' : '#bdbdbd80',
            },
            '&.MuiLinearProgress-bar': {},
          },
        },
      },
    },
  }) as ThemeOptions
