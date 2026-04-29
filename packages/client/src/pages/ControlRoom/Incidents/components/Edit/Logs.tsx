import { MuiDiv, MuiSpan } from 'components/MUI'
import { IDataINC } from '../../interfaces'
import { convertDateToStringFromDBT } from 'utils/convertDate'

export const Logs = ({ newINC }: IDataINC) => {
  return (
    <MuiDiv className="editLogsContainer">
      {newINC?.logs?.map(({ time, User, log, id }) => (
        <MuiSpan className="editINClogs" key={id}>
          {`${convertDateToStringFromDBT(time)}: ${User.shortName}: ${log}`}
        </MuiSpan>
      ))}
    </MuiDiv>
  )
}
