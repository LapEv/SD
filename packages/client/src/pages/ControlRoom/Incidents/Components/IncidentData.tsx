import React, { memo, useEffect, useState } from 'react'
import { Box, Divider, styled, useTheme } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { useApp } from 'hooks/app/useApp'
import { MultiTextFieldIncident } from 'components/TextFields'
import { Button } from 'components/Buttons'
import { CellProps, CellPropsComments, IncidentDataProps } from './interfaces'
import { checkCommentINCValidation } from 'utils/validatorRules'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { statusSLATitles } from '../data'

const Cell = ({ label, value }: CellProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        color:
          theme.palette.mode === ThemeMode.dark
            ? (theme as ITheme).colorTheme.colorLight
            : (theme as ITheme).colorTheme.colorDark,
        width: '100%',
        margin: '3px',
      }}>
      <Box sx={{ width: 120, minWidth: 120 }}>{label}</Box>
      <Tooltip
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement="top-start"] .${tooltipClasses.tooltip}`]:
                {
                  margin: 0,
                },
            },
          },
        }}
        arrow
        title={value ?? ''}
        placement="top-start">
        <StyledBox>{value ?? ''}</StyledBox>
      </Tooltip>
    </Box>
  )
}

const DescriptionCell = ({ label, value }: CellProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        color:
          theme.palette.mode === ThemeMode.dark
            ? (theme as ITheme).colorTheme.colorLight
            : (theme as ITheme).colorTheme.colorDark,
        width: '100%',
        margin: '3px',
      }}>
      <Box sx={{ width: 120, minWidth: 120 }}>{label}</Box>
      <StyledDescription
        sx={{
          overflowY: 'auto',
          height: 75,
          scrollbarColor: '#6b6b6b #2b2b2b',
          scrollbarWidth: 'thin',
          lineHeight: '18px',
          webkitLineClamp: 2,
          webkitBoxOrient: 'vertical',
          textAlign: 'left',
          verticalAlign: 'bottom',
          whiteSpace: 'pre-line',
        }}>
        {value ?? ''}
      </StyledDescription>
    </Box>
  )
}

const DescriptionCellComment = ({
  label,
  value,
  onSaveComments,
}: CellPropsComments) => {
  const theme = useTheme()
  const [comment, setComment] = useState<string>(value)
  const [disabledSaveComment, setDisabledSaveComment] = useState<boolean>(true)
  const [errors, setErrors] = useState<boolean>(false)
  const [errorLabel, setErrorLabel] = useState<string>('')

  const setComments = (text: string) => {
    const checkValidation = checkCommentINCValidation(text)
    if (checkValidation) {
      setErrors(true)
      setErrorLabel(checkValidation)
      return
    }
    setErrors(false)
    setErrorLabel('')
    setComment(text)
    if (text !== value) {
      setDisabledSaveComment(false)
      return
    }
    setDisabledSaveComment(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        color:
          theme.palette.mode === ThemeMode.dark
            ? (theme as ITheme).colorTheme.colorLight
            : (theme as ITheme).colorTheme.colorDark,
        width: 'auto',
        margin: '3px',
      }}>
      <Box
        sx={{
          width: 120,
          minWidth: 120,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box>{label}</Box>
        <Button
          sx={{ width: '70%', mt: 1 }}
          disabled={disabledSaveComment}
          onClick={() => onSaveComments(comment)}>
          Сохранить
        </Button>
      </Box>
      <MultiTextFieldIncident
        variant="outlined"
        sx={{ width: 500 }}
        multiline
        maxRows={4}
        value={comment || ''}
        onChange={e => setComments(e.target.value ?? '')}
        error={errors}
        helperText={errors ? errorLabel : ''}
      />
    </Box>
  )
}

const StyledBox = styled(Box)(() => ({
  '&.MuiBox-root': {
    fontWeight: 'normal',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      backgroundColor: '#2b2b2b',
      borderRadius: 8,
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
      border: '3px solid #2b2b2b',
    },
  },
}))

const StyledDescription = styled(Box)(() => ({
  '&.MuiBox-root': {
    fontWeight: 'normal',
    width: '100%',
    '&::-webkit-scrollbar': {
      backgroundColor: '#2b2b2b',
      borderRadius: 8,
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
      border: '3px solid #2b2b2b',
    },
  },
}))

export const IncidentData = memo(
  ({ values, setHeight, onSaveComments, newTask }: IncidentDataProps) => {
    const boxRef = React.createRef<HTMLDivElement>()
    const [{ dataWidth }] = useApp()

    useEffect(() => {
      const height = (boxRef?.current?.clientHeight as number) + 10
      setHeight(height ?? 0)
    }, [])

    return (
      <Box
        ref={boxRef}
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: dataWidth,
          pl: 1,
          pt: 1,
          pb: 2,
          pr: 5,
        }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Box sx={{ width: 420, minWidth: 420 }}>
            <Cell
              label={'Статус SLA: '}
              value={values.overdue ? statusSLATitles.yes : statusSLATitles.no}
            />
            <Cell label={'Инцидент: '} value={values.incident} />
            <Cell label={'Номер: '} value={values.numberINC.toString()} />
            <Cell label={'Номер клиента: '} value={values.clientINC} />
            <Cell label={'Клиент: '} value={values.legalName} />
            <Cell label={'Клиент (кратко): '} value={values.client} />
            <Cell label={'Контракт: '} value={values.contract} />
            <Cell label={'Объект: '} value={values.object} />
            <Cell label={'Регион: '} value={values.region} />
            <Cell label={'Регион: '} value={values.address} />
            <Cell label={'Координаты: '} value={values.coordinates} />
          </Box>
          <Box sx={{ width: 370, minWidth: 370 }}>
            <Cell label={'Категория: '} value={values.equipment} />
            <Cell label={'Модель: '} value={values.model} />
            <Cell label={'Проблема: '} value={values.typicalMalfunction} />
            <Cell label={'Заявитель: '} value={values.applicant} />
            <Cell label={'Контакты: '} value={values.applicantContacts} />
            <Cell label={'Исполнитель: '} value={values.executor} />
            <Cell label={'Кто принял: '} value={values.userAccepted} />
            <Cell label={'Ответственный: '} value={values.responsible} />
            <Cell label={'SLA: '} value={values.timeSLA} />
            <Cell label={'Регистрация: '} value={values.timeRegistration} />
            <Cell label={'Время в работу: '} value={values.timeInWork} />
          </Box>
          <Box sx={{ width: 'auto' }}>
            <Cell label={'Выполнение: '} value={values.timeCloseCheck} />
            <Cell label={'Перевел: '} value={values.userClosingCheck} />
            <Cell label={'Комментарии: '} value={values.commentCloseCheck} />
            <Cell label={'Акты: '} value={values.act} />
            <Cell label={'ЗИП: '} value={values.spaceParts} />
            <Cell label={'Закрытие: '} value={values.timeClose} />
            <Cell label={'Закрыл: '} value={values.userClosing} />
            <Cell label={'Комментарии: '} value={values.commentClose} />
            <Cell label={'Оценка: '} value={values.rating} />
            <Cell label={'Родительский: '} value={values.parentalIncident} />
            <Cell label={'Связанный: '} value={values.relatedIncident} />
          </Box>
        </Box>
        <Divider sx={{ width: dataWidth, mt: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
          <Box sx={{ width: (dataWidth - 100) / 3.2, minWidth: 420 }}>
            <DescriptionCell label={'Описание: '} value={values.description} />
          </Box>

          <Box sx={{ width: 'auto', minWidth: 520, ml: 1 }}>
            <DescriptionCellComment
              label={'Комментарии: '}
              value={values.comment ?? ''}
              onSaveComments={comment =>
                onSaveComments({ id: values.id, comment: comment })
              }
            />
          </Box>
        </Box>
        <Divider sx={{ width: dataWidth, mt: 1 }} />
        <Button
          onClick={() => newTask({ id: values.id, incident: values.incident })}
          sx={{ width: 210, minWidth: 210, mt: 2 }}>
          Создать запрос
        </Button>
      </Box>
    )
  },
)
