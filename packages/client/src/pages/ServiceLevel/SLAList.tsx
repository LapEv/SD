import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { ModalChangeName } from 'components/ModaQuestions'
import { useSLA } from 'hooks/sla/useSLA'
import { IServiceListData } from 'store/slices/sla/interfaces'
import { SLAPage } from './'
import { useAuth } from 'hooks/auth/useAuth'
import { MuiDiv } from 'components/MUI'

export const SLAList = memo(
  ({
    sla,
    ola,
    days,
    time,
    timeStart,
    timeEnd,
    id,
    id_typeOfWork,
    TypesOfWork,
    height,
  }: IServiceListData) => {
    const [{ admin }] = useAuth()
    const [{ activeSLA }, { setActiveSLA, changeSLA, changeOLA }] = useSLA()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState<boolean>(false)

    const handleClick = () => {
      setOpen(!open)
      setActiveSLA(id as string)
    }

    const editSLA = (event: SyntheticEvent<EventTarget>) => {
      event.stopPropagation()
      setModal(true)
    }

    const changeServiceLevel = (answer: boolean, text: string) => {
      setModal(false)
      if (!answer) return
      if (sla) {
        changeSLA({
          sla: text,
          id,
          days,
          time,
          timeStart,
          timeEnd,
          id_typeOfWork,
        })
        return
      }
      if (ola) {
        changeOLA({
          ola: text,
          id,
          days,
          time,
          timeStart,
          timeEnd,
          id_typeOfWork,
        })
        return
      }
    }

    useEffect(() => {
      if (activeSLA !== id) {
        setOpen(false)
      }
    }, [activeSLA])

    return (
      <MuiDiv className={'containerCollapse'}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalChangeName
            answer={changeServiceLevel}
            handleModal={setModal}
            ref={modalRef}
            question={`Введите новое наименование ${sla ? 'SLA' : 'OLA'}`}
          />
        </Modal>
        <ListItemButton
          divider={open}
          className={'itemButtonCollapse1 height'}
          sx={{ height }}
          onClick={handleClick}>
          <ListItemText
            primary={sla ?? ola}
            secondary={TypesOfWork.typeOfWork}
          />
          {admin ? <EditButton handleClick={editSLA} /> : <></>}
          <RotateButton open={open} handleClick={handleClick} />
        </ListItemButton>
        <Collapse
          className={'width_100_height_auto'}
          in={open}
          timeout="auto"
          unmountOnExit>
          <SLAPage
            sla={sla}
            ola={ola}
            days={days}
            time={time}
            timeStart={timeStart}
            timeEnd={timeEnd}
            id_typeOfWork={id_typeOfWork}
            id={id as string}
            TypesOfWork={TypesOfWork}
            key={`${id}`}
          />
        </Collapse>
      </MuiDiv>
    )
  },
)
