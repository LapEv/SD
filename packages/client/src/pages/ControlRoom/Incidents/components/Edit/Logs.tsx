import { MuiDiv, MuiSpan } from 'components/MUI'
import { IDataINC } from '../../interfaces'
import { convertTSToCurrentTZ } from 'utils/convertDate'
import { Divider } from '@mui/material'

export const Logs = ({ newINC }: IDataINC) => {
  return (
    <MuiDiv className="editLogsContainer">
      {newINC?.logs?.map(({ time, User, log, id }) => (
        <MuiDiv key={id}>
          <MuiSpan className="editINClogs" key={id}>
            {`${convertTSToCurrentTZ(time)}: ${User.shortName}: ${log}`}
          </MuiSpan>
          <Divider />
        </MuiDiv>
      ))}
    </MuiDiv>
  )
}
