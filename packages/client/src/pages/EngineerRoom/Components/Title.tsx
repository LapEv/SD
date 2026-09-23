import { MuiDiv } from 'components/MUI'
import { IEngineerTitle } from '../interfaces'

export const Title = ({ incident, status }: IEngineerTitle) => {
  return (
    <MuiDiv className="engineerTitleBox">
      {incident}
      <MuiDiv sx={{ marginLeft: '30px', fontWeight: 'bold' }}>
        Статус: {status}
      </MuiDiv>
    </MuiDiv>
  )
}
