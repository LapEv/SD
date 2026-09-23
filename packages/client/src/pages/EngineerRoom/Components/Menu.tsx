import { MuiDiv } from 'components/MUI'
import { RotateButton } from 'components/Buttons'
import { IMenu } from '../interfaces'

export const Menu = ({ open, setOpen }: IMenu) => {
  return (
    <MuiDiv className="engineerMenuBox">
      <RotateButton
        open={open}
        handleClick={() => setOpen(!open)}
        sx={{ ml: 1 }}
      />
    </MuiDiv>
  )
}
