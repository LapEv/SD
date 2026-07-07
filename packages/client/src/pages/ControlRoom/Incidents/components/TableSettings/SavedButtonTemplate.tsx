import { Divider } from '@mui/material'
import { TextButton } from 'components/Buttons'
import { useAuth } from 'hooks/auth/useAuth'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect } from 'react'
import { ISavedButtonTemplate } from '../../interfaces'
import { useSystem } from 'hooks/system/useSystem'
import { useMessage } from 'hooks/message/useMessage'

export const SavedButtonTemplate = ({
  setSettingsMenuOpen,
}: ISavedButtonTemplate) => {
  const [
    {
      dense,
      order,
      orderBy,
      rowsPerPage,
      showColumnBorders,
      showCellBorders,
      timeInterval,
      filterListOptions,
    },
  ] = useTableINC()
  const [{ user }, { changeUserAppOptions }] = useAuth()
  const [{ modal }, { setModal }] = useTableINC()
  const [{ system }] = useSystem()
  const [, { setMessage }] = useMessage()

  const checkNameTemplate = () => {
    if (
      user?.appOptions &&
      user?.appOptions?.savedTemplates &&
      user?.appOptions?.savedTemplates.length >=
        system.incident.maxSavedTemplates
    ) {
      setMessage({
        type: 'warning',
        text: `Нельзя сохранить больше ${system.incident.maxSavedTemplates} ${user?.appOptions?.savedTemplates.length === 1 ? 'шаблона' : 'шаблонов'}!`,
      })
      return
    }
    setModal({ active: true, image: 'newSavedTemplate' })
  }

  useEffect(() => {
    if (modal.image === 'newSavedTemplate' && !modal.active && modal.id) {
      const newTemplate = {
        label: modal.id as string,
        dense,
        order,
        orderBy,
        rowsPerPage,
        showCellBorders,
        showColumnBorders,
        timeInterval,
        filterListOptions,
      }
      const _savedTemplates =
        user?.appOptions && user?.appOptions?.savedTemplates
          ? [...user.appOptions.savedTemplates, newTemplate]
          : [newTemplate]
      const appOptions = {
        ...user.appOptions,
        savedTemplates: _savedTemplates,
      }
      changeUserAppOptions({ id: user.id as string, appOptions })
      setModal({ ...modal, image: '', id: '' })
      setSettingsMenuOpen(false)
    }
  }, [modal])

  return (
    <>
      <Divider sx={{ width: '80%' }} />
      <TextButton variant="text" onClick={checkNameTemplate}>
        Сохранить текущий шаблон
      </TextButton>
      <Divider sx={{ width: '80%' }} />
    </>
  )
}
