import {
  NoRequiredValidation,
  commentINCValidation,
  coordinatesValidation,
  emailValidationNoRequired,
  lightTextValidation,
  lightTextValidationNoReq,
  loginValidationNoReq,
  passwordValidationNoReq,
  phoneValidationNoReq,
  textValidation,
  textValidationlowercaseSymbols,
  textValidationlowercaseSymbolsNoReq,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newClient',
    title: 'Добавить клиента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newContract',
    title: 'Создать контракт',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newObject',
    title: 'Добавить объект',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newAddress',
    title: 'Добавить адрес',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newRegion',
    title: 'Добавить регион',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'changeObject',
    title: 'Изменить объект',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeAddress',
    title: 'Изменить адрес',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeRegion',
    title: 'Изменить регион',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'deleteObject',
    title: 'Удалить объект',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteAddress',
    title: 'Удалить адрес',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteRegion',
    title: 'Удалить регион',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
]
export const ModalTitles = {
  newClient: 'Новый клиент',
  newContract: 'Новый контракт',
  newObject: 'Новый объект',
  newAddress: 'Новый адрес',
  newRegion: 'Новый регион',
  newContact: 'Новый контакт',
  deleteObject: 'Удалить объект',
  deleteAddress: 'Удалить адрес',
  deleteRegion: 'Удалить регион',
  changeObject: 'Изменить объект',
  changeAddress: 'Изменить адрес',
  changeRegion: 'Изменить регион',
}
export const MapObjectInputFields = [
  {
    name: 'object',
    label: 'Введите название нового объекта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'internalClientID',
    label: 'Введите клиентский номер объекта',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'internalClientName',
    label: 'Введите клиентское название объекта',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
]

export const MapAddressInputFields = [
  {
    name: 'address',
    label: 'Введите новый адрес',
    validation: textValidationlowercaseSymbols,
    type: 'text',
    required: true,
  },
  {
    name: 'coordinates',
    label: 'Введите координаты точки',
    validation: coordinatesValidation,
    type: 'text',
    required: true,
  },
]

export const MapNewAddressModalInputFields = [
  {
    name: 'address',
    label: 'Введите новый адрес',
    validation: textValidationlowercaseSymbols,
    type: 'text',
    required: true,
    value: '',
  },
  {
    name: 'coordinates',
    label: 'Введите координаты точки',
    validation: coordinatesValidation,
    type: 'text',
    required: true,
    value: '',
  },
]

export const MapRegionInputFields = [
  {
    name: 'region',
    label: 'Введите новый регион',
    validation: textValidation,
    type: 'text',
    required: true,
  },
]

export const MapClientInputFields = [
  {
    name: 'client',
    label: 'Введите внутренние наименование клиента',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'legalName',
    label: 'Введите юридическое наименование клиента',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapNewContractInputFields = [
  {
    name: 'contract',
    label: 'Введите название контракта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'number',
    label: 'Введите номер контракта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  // {
  //   name: 'date',
  //   label: 'Введите дату заключения контракта',
  //   validation: NoRequiredValidation,
  //   type: 'date',
  //   required: true,
  // },
]

export const MapContractInputFields = [
  {
    name: 'number',
    label: 'Введите номер контракта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'date',
    label: 'Введите дату заключения контракта',
    validation: NoRequiredValidation,
    type: 'date',
    required: true,
  },
  {
    name: 'notificationEmail',
    label: 'Введите email для уведомлений',
    validation: emailValidationNoRequired,
    type: 'text',
    required: false,
  },
]

export const MapClientGeneralInfoInputFields = [
  {
    name: 'client',
    label: 'Введите внутренние наименование клиента',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'legalName',
    label: 'Введите юридическое наименование клиента',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'office',
    label: 'Введите адрес офиса клиента',
    validation: textValidationlowercaseSymbolsNoReq,
    type: 'text',
    required: false,
  },
  {
    name: 'officePhone',
    label: 'Введите телефон офиса клиента',
    validation: phoneValidationNoReq,
    type: 'text',
    required: false,
  },
]

export const MapClientGeneralContactsInputFields = [
  {
    name: 'active',
    label: 'Статус контакта',
    validation: NoRequiredValidation,
    type: 'boolean',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Введите фамилию контакта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Введите имя контакта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Введите отчество контакта',
    validation: lightTextValidationNoReq,
    type: 'text',
    required: false,
  },
  {
    name: 'post',
    label: 'Введите должность контакта',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'phone',
    label: 'Введите телефон контакта',
    validation: phoneValidationNoReq,
    type: 'text',
    required: false,
  },
  {
    name: 'email',
    label: 'Введите email контакта',
    validation: emailValidationNoRequired,
    type: 'text',
    required: false,
  },
  {
    name: 'comment',
    label: 'Введите комментарий контакта',
    validation: commentINCValidation,
    type: 'text',
    required: false,
  },
]

export const MapClientGeneralWebInputFields = [
  {
    name: 'login',
    label: 'Введите логин',
    validation: loginValidationNoReq,
    type: 'text',
    required: false,
  },
  {
    name: 'password',
    label: 'Введите пароль',
    validation: passwordValidationNoReq,
    type: 'text',
    required: false,
  },
]

export const EmptyContact = {
  id: 'newContact',
  lastName: '',
  firstName: '',
  middleName: '',
  post: '',
  phone: '',
  email: '',
  comment: '',
  id_client: '',
}

export const menuFilterActive = ['Все', 'Активные', 'Неактивные']
