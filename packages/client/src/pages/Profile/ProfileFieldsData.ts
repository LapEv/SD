import {
  emailValidation,
  // loginValidation,
  nameValidation,
  passwordValidation,
  passwordValidationNew,
  passwordValidationConfrim,
  phoneValidation,
  textValidation,
} from 'utils/validatorRules'

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

export const MapProfileInputFields = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'post',
    label: 'Должность',
    validation: textValidation,
    value: '',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
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
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
    required: true,
  },
  {
    name: 'post',
    label: 'Должность',
    validation: textValidation,
    value: '',
    required: true,
  },
]
