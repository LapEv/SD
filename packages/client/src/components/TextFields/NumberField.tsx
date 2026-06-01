import { MuiDiv } from 'components/MUI'
import { TextFieldFilledNumber } from 'components/TextFields'
import { ChangeEvent, useState } from 'react'
import { ControllerRenderProps, FieldErrors } from 'react-hook-form'
import { ISystemValues } from 'store/slices/system/interfaces'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

export interface INumberField {
  field: ControllerRenderProps<ISystemValues, `list.${number}.value`>
  name: string
  type: string
  required: boolean
  index: number
  errors: FieldErrors<ISystemValues>
  checkForChange: (newData: Record<never, never>) => void
}

export const NumberField = ({
  field,
  name,
  type,
  required,
  index,
  errors,
  checkForChange,
}: INumberField) => {
  const [value, setValue] = useState(field.value)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    checkForChange({
      [name]: event.target.value,
    })
  }

  const onClick = (type: string) => {
    const newValue = type === 'plus' ? Number(value) + 1 : Number(value) - 1
    setValue(newValue)
    checkForChange({
      [name]: newValue,
    })
  }

  return (
    <MuiDiv className="textFieldInputNumberBox">
      <TextFieldFilledNumber
        {...field}
        inputRef={field.ref}
        type={type}
        required={required ?? false}
        variant="filled"
        onChange={onChange}
        error={!!(errors?.list ?? [])[index]?.value?.message}
        helperText={(errors?.list ?? [])[index]?.value?.message}
        value={value}
      />
      <MuiDiv className="arrowUpDownContainer">
        <KeyboardArrowUpOutlinedIcon
          sx={{
            width: 18,
            height: 18,
          }}
          onClick={() => onClick('plus')}
        />
        <KeyboardArrowDownOutlinedIcon
          sx={{
            width: 18,
            height: 18,
          }}
          onClick={() => onClick('minus')}
        />
      </MuiDiv>
    </MuiDiv>
  )
}
