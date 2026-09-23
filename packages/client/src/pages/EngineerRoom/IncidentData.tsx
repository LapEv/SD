import { convertTSToCurrentTZ } from 'utils/convertDate'
import { CellEngineerINC } from './Components/CellEngineerINC'
import { MuiDiv } from 'components/MUI'
import { IIncidentData } from './interfaces'
import { Menu } from './Components/Menu'
import { Title } from './Components/Title'
import { SLAIndicator } from './Components/SLAIndicator'
import { Additionally } from './Components/Additionally'
import { useState } from 'react'
import { Button } from 'components/Buttons'
import { AddEngineerActsModal } from './Modal/AddEngineerActsModal'
import { CloseEngineerINCModal } from './Modal/CloseEngineerINCModal'

export const IncidentData = ({ item }: IIncidentData) => {
  const [open, setOpen] = useState(false)
  const [openCloseINCModal, setOpenCloseINCModal] = useState(false)

  const closeINC = () => {
    setOpenCloseINCModal(true)
  }

  return (
    <MuiDiv
      key={item.id}
      className={`${item.status === 'В работе' ? 'engineerContainerData' : 'engineerContainerData heightCloseDataBoxNoOpen'} ${open ? (item.status === 'В работе' ? 'heightDataBox' : 'heightCloseDataBox') : ''}`}>
      <AddEngineerActsModal />
      <CloseEngineerINCModal
        openCloseINCModal={openCloseINCModal}
        setOpenCloseINCModal={setOpenCloseINCModal}
        inc={item}
      />
      <Menu open={open} setOpen={setOpen} />
      <Title incident={item.incident} status={item.status} />
      <MuiDiv className="engineerSLABox">
        SLA: {convertTSToCurrentTZ(item.timeSLA)}
      </MuiDiv>
      <SLAIndicator item={item} />
      <MuiDiv className="engineerCellDataBox">
        {open && <CellEngineerINC label={'Клиент: '} value={item.client} />}
        {open && (
          <CellEngineerINC label={'Клиент ЮЛ: '} value={item.legalName} />
        )}
        <CellEngineerINC label={'Объект: '} value={item.object} />
        <CellEngineerINC label={'Адрес: '} value={item.address} />
        {open && <Additionally item={item} />}
      </MuiDiv>

      <MuiDiv
        className={`enginerrButtonBox ${item.status !== 'В работе' ? 'flexEndDataBox' : ''}`}>
        {item.status === 'В работе' && (
          <Button onClick={closeINC}>Закрыть заявку</Button>
        )}
        {open && <Button onClick={() => setOpen(!open)}>Свернуть</Button>}
      </MuiDiv>
    </MuiDiv>
  )
}
