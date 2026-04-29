import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newIncidentStatus',
    title: 'Добавить новый статус инцидента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypesOfWork',
    title: 'Добавить тип работ',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypeCompletedWork',
    title: 'Добавить тип выполненных работ',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteIncidentStatuses',
    title: 'Удалить статус инцидента',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypesOfWork',
    title: 'Удалить тип работ',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypesCompletedWork',
    title: 'Удалить тип выполненных работ',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeIncidentStatuses',
    title: 'Изменить статус инцидента',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeTypesOfWork',
    title: 'Изменить тип работ',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeTypesCompletedWork',
    title: 'Изменить тип выполненных работ',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeStateStatuses',
    title: 'Изменить порядок статусов ',
    icon: <EditIcon fontSize="medium" />,
  },
]
