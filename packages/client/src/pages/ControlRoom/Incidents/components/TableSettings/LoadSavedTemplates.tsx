import { ListItemText, MenuItem, Modal } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useAuth } from 'hooks/auth/useAuth'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { ISavedTemplates } from 'store/slices/tableINC/interfaces'
import { ILoadSavedTemplates } from '../../interfaces'
import { DeleteButton, SaveButton } from 'components/Buttons'
import { createRef, useState } from 'react'
import { AnswerModal } from './AnswerModal'

export const LoadSavedTemplates = ({
  setSettingsMenuOpen,
}: ILoadSavedTemplates) => {
  const [{ user }, { changeUserAppOptions }] = useAuth()
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
    { setSettingsFromTemplate },
  ] = useTableINC()
  const modalRef = createRef()
  const [modal, setModal] = useState({
    title: '',
    status: false,
    type: '',
    label: '',
  })

  const _loadSavedTemplates = (item: ISavedTemplates) => {
    setSettingsFromTemplate(item)
    setSettingsMenuOpen(false)
  }

  const answerModal = (item: ISavedTemplates, type: string) => {
    if (type === 'save') {
      setModal({
        title: `Вы действительно хотите перезаписать текущий шаблон под именем "${item.label}"?`,
        status: true,
        type,
        label: item.label,
      })
    }
    if (type === 'delete') {
      setModal({
        title: `Вы действительно хотите удалить шаблон "${item.label}"?`,
        status: true,
        type,
        label: item.label,
      })
    }
  }

  const checkAnswerModal = (type: string, label: string, answer: boolean) => {
    if (type === 'save' && answer) {
      const newTemplate = {
        label: label,
        dense,
        order,
        orderBy,
        rowsPerPage,
        showCellBorders,
        showColumnBorders,
        timeInterval,
        filterListOptions,
      }
      if (user?.appOptions && user?.appOptions?.savedTemplates) {
        const _savedTemplates = user?.appOptions?.savedTemplates.map(item => {
          if (item.label === label) {
            return newTemplate
          }
          return item
        })
        const appOptions = {
          ...user.appOptions,
          savedTemplates: _savedTemplates,
        }
        changeUserAppOptions({ id: user.id as string, appOptions })
      }
    }
    if (type === 'delete' && answer) {
      if (user?.appOptions && user?.appOptions?.savedTemplates) {
        const _savedTemplates = user?.appOptions?.savedTemplates.filter(
          item => item.label !== label,
        )
        const appOptions = {
          ...user.appOptions,
          savedTemplates: _savedTemplates,
        }
        changeUserAppOptions({ id: user.id as string, appOptions })
      }
    }
  }

  if (
    user?.appOptions &&
    user?.appOptions?.savedTemplates &&
    user?.appOptions?.savedTemplates.length > 0
  ) {
    return (
      <>
        <Modal
          open={modal.status}
          onClose={() =>
            setModal({ title: '', status: false, type: '', label: '' })
          }
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <AnswerModal
            title={modal.title}
            type={modal.type}
            label={modal.label}
            answerFromModal={checkAnswerModal}
            handleModal={() =>
              setModal({ title: '', status: false, type: '', label: '' })
            }
            ref={modalRef}
          />
        </Modal>

        {user?.appOptions?.savedTemplates?.map(item => (
          <MuiDiv key={item.label} className="tableSettingTemplateBox">
            <MenuItem
              key={`${item.label}_${item.timeInterval}`}
              sx={{ width: '100%', borderRadius: 1 }}
              onClick={() => _loadSavedTemplates(item)}>
              <ListItemText className={'menuListText'} primary={item.label} />
            </MenuItem>
            <SaveButton handleClick={() => answerModal(item, 'save')} />
            <DeleteButton handleClick={() => answerModal(item, 'delete')} />
          </MuiDiv>
        ))}
      </>
    )
  }

  return (
    <MuiDiv className="savedTemplateNoElements">
      Нет сохраненных шаблонов
    </MuiDiv>
  )
}
