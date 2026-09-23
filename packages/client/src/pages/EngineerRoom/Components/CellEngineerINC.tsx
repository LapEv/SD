import { MuiDiv } from 'components/MUI'
import { ICellEngineerINC } from '../interfaces'

export const CellEngineerINC = ({ label, value }: ICellEngineerINC) => {
  return (
    <MuiDiv className="cellEngineerINCContainer">
      <MuiDiv className="cellINCLabel">{label}</MuiDiv>
      <MuiDiv className="cellEngineerINCValue">{value ?? ''}</MuiDiv>
    </MuiDiv>
  )
}
