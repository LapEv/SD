import { convertDateToStringFromDBT } from 'utils/convertDate'
import { IDataINC } from '../../interfaces'
import { CellINC } from './CellINC'

export const TimeData = ({ newINC }: IDataINC) => {
  return (
    <>
      <CellINC
        label={'Регистрация: '}
        value={convertDateToStringFromDBT(newINC?.timeRegistration)}
      />
      <CellINC
        label={'В работу: '}
        value={convertDateToStringFromDBT(newINC?.timeInWork)}
      />
      <CellINC
        label={'Решён: '}
        value={convertDateToStringFromDBT(newINC?.timeCloseCheck)}
      />
      <CellINC
        label={'Закрытие: '}
        value={convertDateToStringFromDBT(newINC?.timeClose)}
      />
    </>
  )
}
