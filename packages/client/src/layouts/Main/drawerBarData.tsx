import {
  Main,
  Profile,
  ControlRoom,
  Users,
  Warehouse,
  Classifier,
  SLA,
} from 'layouts/Main/icons'
import { Routes } from 'utils/routes'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import AddCardIcon from '@mui/icons-material/AddCard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import EngineeringIcon from '@mui/icons-material/Engineering'

export const menuData = [
  {
    text: 'Диспетчерская',
    icon: <ControlRoom />,
    to: '',
    type: 'menu',
  },
  {
    text: 'Инженерская',
    icon: <EngineeringIcon />,
    to: Routes.EngineerRoom,
    type: 'component',
  },
  {
    text: 'Склад',
    icon: <Warehouse />,
    to: Routes.Warehouse,
    type: 'component',
  },
  {
    text: 'Классификатор',
    icon: <Classifier />,
    to: Routes.Classifier,
    type: 'component',
  },
  {
    text: 'Пользователи',
    icon: <Users />,
    to: Routes.Users,
    type: 'component',
  },
  {
    text: 'Клиенты',
    icon: <Diversity3Icon />,
    to: Routes.Clients,
    type: 'component',
  },
  {
    text: 'Уровни сервиса',
    icon: <SLA />,
    to: Routes.ServiceLevel,
    type: 'component',
  },
  {
    text: 'Профиль',
    icon: <Profile />,
    to: `/${Routes.Profile}`,
    type: 'component',
  },
]

export const DispatcherData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index, type: 'component' },
  {
    text: 'Диспетчерская',
    icon: <ControlRoom />,
    to: '',
    type: 'menu',
  },
  {
    text: 'Пользователи',
    icon: <Users />,
    to: Routes.Users,
    type: 'component',
  },
  {
    text: 'Профиль',
    icon: <Profile />,
    to: `/${Routes.Profile}`,
    type: 'component',
  },
]

export const FieldEngineersData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index, type: 'component' },
  {
    text: 'Инженерская',
    icon: <EngineeringIcon />,
    to: Routes.EngineerRoom,
    type: 'component',
  },
  {
    text: 'Пользователи',
    icon: <Users />,
    to: Routes.Users,
    type: 'component',
  },
  {
    text: 'Профиль',
    icon: <Profile />,
    to: `/${Routes.Profile}`,
    type: 'component',
  },
]

export const OtherData = [
  { text: 'Главная', icon: <Main />, to: Routes.Index, type: 'component' },
  {
    text: 'Пользователи',
    icon: <Users />,
    to: Routes.Users,
    type: 'component',
  },
  {
    text: 'Профиль',
    icon: <Profile />,
    to: `/${Routes.Profile}`,
    type: 'component',
  },
]

export const controlRoomMenuData = [
  { text: 'Инциденты', icon: <ListAltIcon />, to: Routes.Incidents },
  {
    text: 'Запросы',
    icon: <ConfirmationNumberIcon />,
    to: Routes.IncidentsConfirm,
  },
]

export const controlRoomCustomFilter = [
  {
    text: ' - Статус: Зарегистрирован',
    icon: <></>,
    to: Routes.Incidents,
    id: 'Зарегистрирован',
  },
  {
    text: ' - Статус: В работе',
    icon: <></>,
    to: Routes.Incidents,
    id: 'В работе',
  },
  {
    text: ' - Статус: Решён',
    icon: <></>,
    to: Routes.Incidents,
    id: 'Решён',
  },
  {
    text: ' - Статус: Закрыт',
    icon: <></>,
    to: Routes.Incidents,
    id: 'Закрыт',
  },
]

export const emptyRoomlistFilter = [
  {
    text: ' - Статус: Все',
    icon: <></>,
    to: Routes.Incidents,
    id: 'Все',
  },
]

export const clientData = [
  {
    text: 'Оставить заявку',
    icon: <AddCardIcon />,
    to: Routes.AddClientIncident,
    type: 'component',
  },
  {
    text: 'Статуст инцидента',
    icon: <AssignmentIcon />,
    to: Routes.CheckIncident,
    type: 'component',
  },
  {
    text: 'Написать',
    icon: <HelpCenterIcon />,
    to: Routes.toTechSupport,
    type: 'component',
  },
]

export const drawerWidth = 280
export const compressedWidth = 180
