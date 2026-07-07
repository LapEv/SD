import { ListItemText, MenuItem } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useAuth } from 'hooks/auth/useAuth'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { ISavedTemplates } from 'store/slices/tableINC/interfaces'
import { ILoadSavedTemplates } from '../../interfaces'

export const LoadSavedTemplates = ({
  setSettingsMenuOpen,
}: ILoadSavedTemplates) => {
  const [{ user }] = useAuth()
  const [, { setSettingsFromTemplate }] = useTableINC()

  const _loadSavedTemplates = (item: ISavedTemplates) => {
    setSettingsFromTemplate(item)
    setSettingsMenuOpen(false)
  }

  if (
    user?.appOptions &&
    user?.appOptions?.savedTemplates &&
    user?.appOptions?.savedTemplates.length > 0
  ) {
    return user?.appOptions?.savedTemplates?.map(item => (
      <MenuItem
        key={`${item.label}_${item.timeInterval}`}
        sx={{ pl: 4 }}
        onClick={() => _loadSavedTemplates(item)}>
        <ListItemText primary={item.label} />
      </MenuItem>
    ))
  }

  return (
    <MuiDiv className="savedTemplateNoElements">
      Нет сохраненных шаблонов
    </MuiDiv>
  )
}
