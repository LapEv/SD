import { MuiDiv } from 'components/MUI'
import { ICellINC } from '../../interfaces'

export const CellINC = ({ label, value }: ICellINC) => {
  return (
    <MuiDiv className="cellINCContainer">
      <MuiDiv className="cellINCLabel">{label}</MuiDiv>
      <MuiDiv className="cellINCValue">{value ?? ''}</MuiDiv>
    </MuiDiv>
  )
}
