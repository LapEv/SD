import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import {
  ClearSearchModalSection,
  IconPopoverButton,
  RotateButton,
} from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ModalTitles } from '../ControlRoom/Incidents/data'
import { useIncidents } from 'hooks/incidents/useINC'
import { NewIncidentStatus } from 'pages/ControlRoom/Incidents/Modals'
import { IIncStatussesList } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ContractIncStatussesList = memo(
  ({ incStatussesID, onChooseItems }: IIncStatussesList) => {
    const modalRef = React.createRef()
    const [modal, setModal] = useState<boolean>(false)
    const [{ admin }] = useAuth()
    const [{ incStatuses }, { getIncidentStatuses }] = useIncidents()
    const [incStatusesData, setIncStatusesData] = useState<DataList[]>([])
    const [openIncStatus, setOpenIncStatus] = useState(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredData = useFilteredData<DataList>(
      incStatusesData,
      filterText,
      ['name'],
    )

    const openIncStatussesList = () => {
      setOpenIncStatus(!openIncStatus)
      getIncidentStatuses()
    }

    useEffect(() => {
      const listData = incStatuses.map(({ statusINC, id }) => {
        return {
          name: statusINC,
          id: id as string,
          initChecked: incStatussesID?.find(item => item === id) ? true : false,
        }
      })
      setIncStatusesData(listData)
    }, [incStatuses, incStatussesID])

    const AddNewIncStatus = () => {
      setModal(true)
    }

    const handleModal = (bool: boolean) => {
      setModal(bool)
    }

    return (
      <MuiDiv className={'flexColumn'}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <NewIncidentStatus
            ref={modalRef}
            handleModal={handleModal}
            title={ModalTitles.newIncidentStatus}
          />
        </Modal>
        <ListItemButton
          divider={openIncStatus}
          className={'itemContainerLabel'}
          onClick={openIncStatussesList}>
          <ListItemText primary={'Уведолмения по статусам'} sx={{ ml: 2 }} />
          <RotateButton open={openIncStatus} />
        </ListItemButton>
        <Collapse
          className={'collapseList collapseList_p'}
          in={openIncStatus}
          timeout="auto"
          unmountOnExit>
          <MuiDiv className={'boxList_flexSC'}>
            <TextField
              variant="outlined"
              className={'textContainer_w90_mt2'}
              label="Введите фильтр"
              margin="normal"
              value={filterText || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value ?? '')
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <ClearSearchModalSection
                      length={filterText.length}
                      handleClick={() => setFilterText('')}
                    />
                  ),
                },
              }}
            />
            {admin && (
              <IconPopoverButton
                popover={'Добавить статус по инцидентам'}
                onClick={AddNewIncStatus}
                icon={<AddCircleOutlineIcon />}
                propsPopover={{ ml: -1 }}
                className={'addIconButton'}
              />
            )}
          </MuiDiv>
          <MuiDiv className={'listViewColumn'}>
            {filteredData?.map(({ name, id, initChecked, comment }) => (
              <Item
                name={name}
                id={`${id}`}
                props={{ ml: 2 }}
                comment={comment}
                groupChecked={null}
                onChooseItems={onChooseItems}
                initChecked={initChecked}
                key={id as string}
              />
            ))}
          </MuiDiv>
        </Collapse>
      </MuiDiv>
    )
  },
)
