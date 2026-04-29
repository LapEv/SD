import { MuiDiv } from 'components/MUI'
import { Indicator } from '../Indicator/Indicator'
import { ITitleINC, overdueLabel } from '../../interfaces'
import { ClearButton } from 'components/Buttons'

export const TitleINC = ({ newINC, handleModal }: ITitleINC) => {
  return (
    <MuiDiv className="editTitle">
      {newINC.incident}
      <Indicator
        timeSLA={newINC.timeSLA}
        timeReg={newINC.timeRegistration}
        timeCloseCheck={newINC?.timeCloseCheck}
        status={newINC.status}
        classContainer="boxIndicatorEditINCContainer"
      />
      {newINC.overdue ? overdueLabel.true : overdueLabel.false}
      <ClearButton
        handleClick={() => handleModal(false)}
        length={1}
        classNameBox="editINCIconButton"
        className="editINCIcon"
      />
    </MuiDiv>
  )
}
