import {
  emailValidation,
  emailValidationNoRequired,
  numberValidation,
  nameValidationNoRequired,
  NoRequiredValidation,
  passwordValidation,
  passwordValidationNew,
  passwordValidationConfrim,
} from 'utils/validatorRules'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'

export const sections = [
  {
    label: 'Общие настройки',
    id: 'general',
  },
  {
    label: 'Авторизация',
    id: 'auth',
  },
  {
    label: 'Почтовый сервер',
    id: 'emailServer',
  },
  {
    label: 'Инциденты',
    id: 'incident',
  },
  {
    label: 'Дополнительные настройки',
    id: 'additional',
  },
]

export const chooseMapFields = (id: string) => {
  if (id === 'general') return MapGeneralSystemInputFields
  if (id === 'auth') return MapAuthSystemInputFields
  if (id === 'emailServer') return MapEmailServerSystemInputFields
  if (id === 'incident') return MapIncidentSystemInputFields
  if (id === 'additional') return MapAdditionalSystemInputFields
  return []
}

export const MapGeneralSystemInputFields = [
  {
    name: 'name',
    label: 'Наименование системы',
    validation: nameValidationNoRequired,
    value: '',
    type: 'text',
    required: false,
  },
  {
    name: 'emailSystem',
    label: 'Email системы',
    validation: emailValidationNoRequired,
    value: '',
    type: 'text',
    required: false,
  },
]

export const MapAuthSystemInputFields = [
  {
    name: 'passwordMinLength',
    label: 'Минимальная длина пароля пользователя',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
  {
    name: 'passwordMaxLength',
    label: 'Максимальная длина пароля пользователя',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
]

export const MapEmailServerSystemInputFields = [
  {
    name: 'timeZoneForNotification',
    label: 'Смещение времени для внешних уведомлений',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
  {
    name: 'host',
    label: 'Host почтового сервера',
    validation: NoRequiredValidation,
    value: '',
    type: 'text',
    required: false,
  },
  {
    name: 'port',
    label: 'Порт почтового сервера',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: false,
  },
  {
    name: 'email',
    label: 'Email почтового сервера',
    validation: emailValidationNoRequired,
    value: '',
    type: 'text',
    required: false,
  },
  {
    name: 'password',
    label: 'Пароль почтового сервера',
    validation: NoRequiredValidation,
    value: '',
    type: 'password',
    required: false,
  },
]

export const MapIncidentSystemInputFields = [
  {
    name: 'daysForClose',
    label: 'Дней для автоматического закрытия инцидентов',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
  {
    name: 'emailTechnicalSupport',
    label: 'Email технической поддержки',
    validation: emailValidation,
    value: '',
    type: 'text',
    required: true,
  },
  {
    name: 'maxSavedTemplates',
    label: 'Максимальное количество сохраненных шаблонов',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
]

export const MapAdditionalSystemInputFields = [
  {
    name: 'maxSizeFileUpload',
    label: 'Максимальный размер файлов для загрузки на сервер',
    validation: numberValidation,
    value: '',
    type: 'number',
    required: true,
  },
]

export const ModalTitles = {
  changePassword: 'Изменить пароль SuperAdmin',
}

export const MapPasswordInputFields = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    validation: passwordValidation,
    type: 'password',
    required: true,
  },
  {
    name: 'newPassword',
    label: 'New Password',
    validation: passwordValidationNew,
    type: 'password',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    validation: passwordValidationConfrim,
    type: 'password',
    required: true,
  },
]

export const menuData = [
  {
    name: 'changePassword',
    title: 'Изменить пароль SuperUser',
    icon: <LockResetOutlinedIcon fontSize="medium" />,
  },
]
