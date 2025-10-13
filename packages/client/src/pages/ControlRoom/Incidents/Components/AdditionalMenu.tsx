import { useAuth } from 'hooks/auth/useAuth'
import { memo } from 'react'
import { menuData } from '../data'
import { DropDownMenuToolTip } from 'components/DropDownButtonMenu'
import { IconToolTipButton } from 'components/Buttons'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'
import { PrintBar } from './PrintBar'
import { DenseTable } from './DenseTable'
import { DragTable } from './DragTable'
import { AdditionalMenuProps } from './interfaces'

export const AdditionalMenu = memo(
  ({
    denseTable,
    setDenseTableFunc,
    onPrint,
    checkClickMenu,
    dragTable,
    setDragTable,
  }: AdditionalMenuProps) => {
    const [{ admin }] = useAuth()
    return (
      <>
        <PrintBar onPrint={onPrint} />
        <DenseTable denseTable={denseTable} setDenseTable={setDenseTableFunc} />
        <IconToolTipButton
          title={'Создать инцидент'}
          onClick={() => checkClickMenu('newIncident')}
          icon={<AddCircleOutlineIcon />}
        />
        <IconToolTipButton
          title={'Создать запрос'}
          onClick={() => checkClickMenu('newRequest')}
          icon={<ControlPointDuplicateIcon />}
        />
        {dragTable && (
          <DragTable dragTable={dragTable} setDragTable={setDragTable} />
        )}
        {admin && (
          <DropDownMenuToolTip
            title={'Добавить/Удалить'}
            data={menuData}
            divider={[3, 6, 9]}
            onClick={checkClickMenu}
          />
        )}
      </>
    )
  },
)
