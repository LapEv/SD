import {
  lightTextValidation,
  textValidation,
  textValidationlowercase,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newClassifierEquipment',
    title: 'Добавить классификатор',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newClassifierModel',
    title: 'Добавить модель',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypicalMalfunction',
    title: 'Добавить типовую неисправность',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteClassifierEquipment',
    title: 'Удалить классификатор оборудования',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteClassifierModel',
    title: 'Удалить модель',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypicalMalfunction',
    title: 'Удалить типовую неисправность',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeTypicalMalfunction',
    title: 'Изменить типовую неисправность',
    icon: <EditIcon fontSize="medium" />,
  },
]
export const ModalTitles = {
  newClassifierEquipment: 'Новый классификатор',
  newClassifierModel: 'Новая модель',
  newTypicalMalfunction: 'Новая типовую неисправность',
  deleteClassifierEquipment: 'Удалить классификатор',
  deleteClassifierModel: 'Удалить модель',
  deleteTypicalMalfunction: 'Удалить типовую неисправность',
  changeClassifierEquipment: 'Изменить классификатор',
  changeClassifierModel: 'Изменить модель',
  changeTypicalMalfunction: 'Изменить типовую неисправность',
}

export const MapClassifierInputFields = [
  {
    name: 'classifier',
    label: 'Введите новую классификацию оборудования',
    validation: textValidationlowercase,
    type: 'text',
    required: true,
  },
]

export const MapModelsInputFields = [
  {
    name: 'model',
    label: 'Введите новую модель',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapTypMalfunctionInputFields = [
  {
    name: 'model',
    label: 'Введите новую типовую неисправность',
    validation: textValidation,
    type: 'text',
    required: true,
  },
]

export const MapNewTypicalMalfunctionsInputFields = [
  {
    name: 'typicalMalfunctions',
    label: 'Введите новую типовую неисправность',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const EmptyTypicalMalfunctions = [
  {
    models: [''],
    id: '',
    id_equipment: '',
  },
]
