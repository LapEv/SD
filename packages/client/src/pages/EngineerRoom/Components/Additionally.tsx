import { convertTSToCurrentTZ } from 'utils/convertDate'
import { IEngineerINC } from '../interfaces'
import { CellEngineerINC } from './CellEngineerINC'
import { MultiTextFieldIncident } from 'components/TextFields'
import { CellEngineerINCActs } from './CellEngineerINCActs'

export const Additionally = ({ item }: IEngineerINC) => {
  return (
    <>
      <CellEngineerINC label={'Координаты: '} value={item.coordinates} />
      <CellEngineerINC label={'Номер Кл: '} value={item.clientINC} />
      <CellEngineerINC label={'Заявитель: '} value={item.applicant} />
      <CellEngineerINC label={'Контакты: '} value={item.applicantContacts} />
      <CellEngineerINC label={'Классификатор: '} value={item.equipment} />
      <CellEngineerINC label={'Модель: '} value={item.model} />
      <CellEngineerINC label={'Проблема: '} value={item.typicalMalfunction} />
      <MultiTextFieldIncident
        label={'Описание заказчика'}
        variant="outlined"
        className={'textMultiCellsEngineerINC'}
        margin="normal"
        multiline
        maxRows={6}
        defaultValue={item.description ?? 'Нет  описания'}
        disabled
      />
      <MultiTextFieldIncident
        label={'Комментарий диспетчера'}
        variant="outlined"
        className={'textMultiCellsEngineerINC notFirst'}
        margin="normal"
        multiline
        maxRows={6}
        defaultValue={item.comment ?? 'Нет  комментариев'}
        disabled
      />
      <CellEngineerINC
        label={'Регистрация: '}
        value={convertTSToCurrentTZ(item.timeRegistration)}
      />
      <CellEngineerINC
        label={'Назначен: '}
        value={convertTSToCurrentTZ(item.timeInWork)}
      />
      {item.status !== 'В работе' && (
        <CellEngineerINC
          label={'Выполнено: '}
          value={convertTSToCurrentTZ(item.timeDone)}
        />
      )}
      {item.status !== 'В работе' && (
        <CellEngineerINC
          label={'Решён: '}
          value={convertTSToCurrentTZ(item.timeCloseCheck)}
        />
      )}
      {item.status !== 'В работе' && (
        <CellEngineerINC
          label={'Закрыт: '}
          value={convertTSToCurrentTZ(item.timeClose)}
        />
      )}
      <CellEngineerINC label={'Принял: '} value={item.userAccepted} />
      <CellEngineerINC label={'Ответственный: '} value={item.responsible} />
      {item.status !== 'В работе' && (
        <CellEngineerINC label={'Закрыл: '} value={item.userClosing} />
      )}
      {item.status !== 'В работе' && (
        <CellEngineerINC
          label={'Тип решения: '}
          value={item.typeCompletedWork}
        />
      )}
      {item.status !== 'В работе' && (
        <CellEngineerINCActs
          label={'Акты: '}
          value={item.act && item.act.length > 0 ? item.act.join(', ') : ''}
          files={item.Files}
          idINC={item.id}
          incident={item.incident}
          inc={item}
        />
      )}
      {item.status !== 'В работе' && (
        <CellEngineerINC
          label={'ЗИП: '}
          value={
            item.spaceParts && item.spaceParts.length > 0
              ? item.spaceParts.join(', ')
              : ''
          }
        />
      )}
      {item.status !== 'В работе' && (
        <MultiTextFieldIncident
          label={'Комментарий к выполнению'}
          variant="outlined"
          className={'textMultiCellsEngineerINC'}
          margin="normal"
          multiline
          maxRows={6}
          defaultValue={item.commentCloseCheck ?? 'Нет  комментариев'}
          disabled
        />
      )}
    </>
  )
}
