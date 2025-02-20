import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  textValidation,
  textValidationENGlowercase,
} from 'utils/validatorRules'

export const ModalTitles = {
  addDivision: 'Новое подразделение',
  addDepartments: 'Новый отдел',
  addUser: 'Новый пользователь',
  addRole: 'Новая роль',
  addRolesGroup: 'Новая группа ролей',
  deleteDivision: 'Удалить дивизионы',
  deleteDepartment: 'Удалить отделы',
  deleteRole: 'Удалить роли',
  deleteRolesGroup: 'Удалить группу ролей',
  deleteUser: 'Удалить пользователя',
  changeRolesGroup: 'Изменить группу ролей',
  сhangeNameRolesGroup: 'Изменить название группы ролей',
  сhangeNameRole: 'Изменить название роли',
  changeNameDivision: 'Изменить название дивизиона',
  changeNameDepartment: 'Изменить название отдела',
}

export const MapRoleInputFields = [
  {
    name: 'nameRole',
    label: 'Введите новую роль',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    label: 'Введите идентификатор роли',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapRolesGroupInputFields = [
  {
    name: 'nameRolesGroup',
    label: 'Введите новую группу ролей',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    label: 'Введите идентификатор группы ролей',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapDivisionInputFields = [
  {
    name: 'newDivisionName',
    label: 'Введите новое подразделение',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDivisionId',
    label: 'Введите идентификатор нового подразделения',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapDepartmentInputFields = [
  {
    name: 'newDepartment',
    label: 'Введите новый отдел',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDepartmentId',
    label: 'Введите идентификатор нового отдела',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapProfileInputFieldsAdmin = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
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
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'username',
    label: 'Логин',
    validation: loginValidation,
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
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
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
    name: 'password',
    label: 'Пароль',
    validation: passwordValidation,
    value: '',
    required: true,
  },
]

export const MapProfileInputFieldsAdminWithoutPassword = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
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
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'username',
    label: 'Логин',
    validation: loginValidation,
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
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
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
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
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
    name: 'post',
    label: 'Должность',
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
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
    required: true,
  },
]

export const MapNewRolesGroupInputFields = [
  {
    name: 'newRolesGroup',
    label: 'Введите новое название группы ролей',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newRolesGroupID',
    label: 'Введите новый идентификатор группы ролей',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapNewRolesInputFields = [
  {
    name: 'newRoles',
    label: 'Введите новое название роли',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newRolesID',
    label: 'Введите новый идентификатор роли',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapNewDivisionNameInputFields = [
  {
    name: 'newDivision',
    label: 'Введите новое название дивизиона',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDivisionID',
    label: 'Введите новый идентификатор дивизиона',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapNewDepartmentNameInputFields = [
  {
    name: 'newDepartment',
    label: 'Введите новое название отдела',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDepartmentID',
    label: 'Введите новый идентификатор отдела',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]
