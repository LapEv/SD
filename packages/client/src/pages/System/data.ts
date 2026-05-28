import { emailValidation, textValidation } from 'utils/validatorRules'

export const sections = [
  {
    label: 'Общие настройки',
    id: 'general',
  },
]

export const MapSystemInputFields = [
  {
    name: 'name',
    label: 'Наименование',
    validation: textValidation,
    value: '',
    required: true,
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
    required: true,
  },
]
