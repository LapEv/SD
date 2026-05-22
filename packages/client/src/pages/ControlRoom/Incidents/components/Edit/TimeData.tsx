import { convertTSToCurrentTZ } from 'utils/convertDate'
import { IDataINC } from '../../interfaces'
import { CellINC } from './CellINC'

export const TimeData = ({ newINC }: IDataINC) => {
  return (
    <>
      <CellINC
        label={'Регистрация: '}
        value={convertTSToCurrentTZ(newINC?.timeRegistration)}
      />
      <CellINC
        label={'В работу: '}
        value={convertTSToCurrentTZ(newINC?.timeInWork)}
      />
      <CellINC
        label={'Решён: '}
        value={convertTSToCurrentTZ(newINC?.timeCloseCheck)}
      />
      <CellINC
        label={'Закрытие: '}
        value={convertTSToCurrentTZ(newINC?.timeClose)}
      />
    </>
  )
}
