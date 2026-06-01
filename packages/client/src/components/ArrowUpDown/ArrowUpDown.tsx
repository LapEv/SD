import { MuiDiv } from 'components/MUI'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { IArrowUpDown } from './interfaces'

export const ArrowUpDown = ({ value, onChange }: IArrowUpDown) => {
  return (
    <MuiDiv className="arrowUpDownContainer">
      <KeyboardArrowUpOutlinedIcon
        sx={{
          width: 18,
          height: 18,
        }}
        onClick={() => onChange((value as number) + 1)}
      />
      <KeyboardArrowDownOutlinedIcon
        sx={{
          width: 18,
          height: 18,
        }}
        onClick={() => onChange((value as number) - 1)}
      />
    </MuiDiv>
  )
}
