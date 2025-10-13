import {
  NoRequiredValidation,
  coordinatesValidation,
  lightTextValidation,
  textValidationlowercase,
} from 'utils/validatorRules'

export const MapNewAddressInputFields = [
  {
    name: 'address',
    label: 'Введите новый адрес',
    validation: textValidationlowercase,
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

export const MapNewRegionInputFields = [
  {
    name: 'region',
    label: 'Введите новый регион',
    validation: textValidationlowercase,
    type: 'text',
    required: true,
  },
]

export const MapNewObjectInputFields = [
  {
    name: 'object',
    label: 'Введите новый объект',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'internalClientID',
    label: 'Введите новый клиентский номер объекта',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'internalClientName',
    label: 'Введите новое клиентское название объекта',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
]

export const filterFirstElement = 'Все'
