import React, { memo, useEffect, useState } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Modal,
  useTheme,
} from '@mui/material'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component, popoverIcon } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { SearchIconElement } from 'components/Icons'
import { ModalTitles } from '../ControlRoom/Incidents/data'
import { useIncidents } from 'hooks/incidents/useINC'
import { NewIncidentStatus } from 'pages/ControlRoom/Incidents/Modals'
import { IIncStatussesList } from './interfaces'
import { ITheme } from 'themes/themeConfig'

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
    const theme = useTheme() as ITheme

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
      <Box sx={{ width: '95%', mt: 1 }}>
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
          sx={{
            ...classifierChild2Component,
            height: theme.fontSize === 'small' ? 30 : 40,
          }}
          onClick={openIncStatussesList}>
          <ListItemText primary={'Уведолмения по статусам'} sx={{ ml: 2 }} />
          <RotateButton open={openIncStatus} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
          in={openIncStatus}
          timeout="auto"
          unmountOnExit>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: theme.fontSize === 'small' ? 30 : 40,
              mt: 1,
            }}>
            <TextField
              variant="outlined"
              sx={{
                width: '90%',
                mt: 2,
                height: theme.fontSize === 'small' ? 30 : 40,
              }}
              label="Введите фильтр"
              margin="normal"
              value={filterText || ''}
              onChange={e => setFilterText(e.target.value ?? '')}
              InputProps={{
                endAdornment: <SearchIconElement />,
              }}
            />
            {admin && (
              <IconPopoverButton
                popover={'Добавить статус по инцидентам'}
                onClick={AddNewIncStatus}
                icon={<AddCircleOutlineIcon />}
                propsPopover={{ ml: -1 }}
                sx={{
                  ...popoverIcon,
                  width: theme.fontSize === 'small' ? 30 : 40,
                  height: theme.fontSize === 'small' ? 30 : 40,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              maxHeight: '35vH',
              overflowX: 'hidden',
              overflowY: 'auto',
              height: 'auto',
              mt: 2,
            }}>
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
          </Box>
        </Collapse>
      </Box>
    )
  },
)
