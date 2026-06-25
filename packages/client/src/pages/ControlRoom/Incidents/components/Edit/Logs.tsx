import { MuiDiv, MuiSpan } from 'components/MUI'
import { IDataINC } from '../../interfaces'
import { convertTSToCurrentTZ } from 'utils/convertDate'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useSystem } from 'hooks/system/useSystem'

export const Logs = ({ newINC }: IDataINC) => {
  const [{ system }, { getSystem }] = useSystem()

  useEffect(() => {
    if (!system.id) {
      getSystem()
    }
  }, [])

  return (
    <MuiDiv className="editLogsContainer">
      {newINC?.logs?.map(({ time, User, log, id, isSystem }) => (
        <MuiDiv key={id}>
          <MuiSpan className="editINClogs" key={id}>
            {`${convertTSToCurrentTZ(time)}: ${isSystem ? system.general.name : User.shortName}: ${log}`}
          </MuiSpan>
          <Divider />
        </MuiDiv>
      ))}
    </MuiDiv>
  )
}
