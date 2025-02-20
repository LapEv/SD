import PersonAdd from '@mui/icons-material/PersonAdd'
import Loupe from '@mui/icons-material/Loupe'
import Queue from '@mui/icons-material/Queue'
import LayersClear from '@mui/icons-material/LayersClear'
import DeleteSweep from '@mui/icons-material/DeleteSweep'
import DisplaySettings from '@mui/icons-material/DisplaySettings'
import Addchart from '@mui/icons-material/Addchart'
import GroupAdd from '@mui/icons-material/GroupAdd'
import Remove from '@mui/icons-material/Remove'
import GroupRemove from '@mui/icons-material/GroupRemove'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

export const menuData = [
  {
    name: 'addDivision',
    title: 'Добавить дивизион',
    icon: <Loupe fontSize="medium" />,
  },
  {
    name: 'addDepartments',
    title: 'Добавить отдел',
    icon: <Queue fontSize="medium" />,
  },
  {
    name: 'addUser',
    title: 'Добавить пользователя',
    icon: <PersonAdd fontSize="medium" />,
  },
  {
    name: 'addRole',
    title: 'Добавить роль',
    icon: <Addchart fontSize="medium" />,
  },
  {
    name: 'addRolesGroup',
    title: 'Добавить группу ролей',
    icon: <GroupAdd fontSize="medium" />,
  },
  {
    name: 'deleteDivision',
    title: 'Удалить дивизион',
    icon: <LayersClear fontSize="medium" />,
  },
  {
    name: 'deleteDepartments',
    title: 'Удалить отдел',
    icon: <DeleteSweep fontSize="medium" />,
  },
  {
    name: 'deleteUser',
    title: 'Удалить пользователя',
    icon: <PersonRemoveIcon fontSize="medium" />,
  },
  {
    name: 'deleteRole',
    title: 'Удалить роли',
    icon: <Remove fontSize="medium" />,
  },
  {
    name: 'deleteRolesGroup',
    title: 'Удалить группу ролей',
    icon: <GroupRemove fontSize="medium" />,
  },
  {
    name: 'changeRolesGroup',
    title: 'Изменить группу ролей',
    icon: <DisplaySettings fontSize="medium" />,
  },
  {
    name: 'ChangeNameRolesGroup',
    title: 'Изменить название группы ролей',
    icon: <DisplaySettings fontSize="medium" />,
  },
  {
    name: 'ChangeNameRole',
    title: 'Изменить название роли',
    icon: <DisplaySettings fontSize="medium" />,
  },
  {
    name: 'ChangeNameDivision',
    title: 'Изменить название дивизиона',
    icon: <DisplaySettings fontSize="medium" />,
  },
  {
    name: 'ChangeNameDepartment',
    title: 'Изменить название отдела',
    icon: <DisplaySettings fontSize="medium" />,
  },
]
