import { MuiDiv } from 'components/MUI'
import { CellINC } from './CellINC'
import { IEditDataINC } from '../../interfaces'
import { TextFieldIncidents } from 'components/TextFields'

export const ClientData = ({ newINC, setNewINC }: IEditDataINC) => {
  return (
    <MuiDiv className="editDataBox">
      <CellINC label={'Номер: '} value={newINC.numberINC.toString()} />
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Номер Кл: '}</MuiDiv>
        <TextFieldIncidents
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              clientINC: target.value,
            })
          }
          type="text"
          variant="outlined"
          className={'textContainerINConEdit boxTextonEdit'}
          value={newINC?.clientINC ?? ''}
        />
      </MuiDiv>
      <CellINC
        label={'Родительский: '}
        value={
          newINC.parentalIncident && newINC.parentalIncident !== ''
            ? newINC.parentalIncident
            : 'нет'
        }
      />
      <CellINC
        label={'Связанный: '}
        value={
          newINC.relatedIncident && newINC.relatedIncident !== ''
            ? newINC.parentalIncident
            : 'нет'
        }
      />
      <CellINC label={'Клиент: '} value={newINC.client} />
      <CellINC label={'Клиент ЮЛ: '} value={newINC.legalName} />
      <CellINC label={'Объект: '} value={newINC.object} />
      <CellINC label={'Адрес: '} value={newINC.address} />
      <CellINC label={'Регион: '} value={newINC.region} />
      <CellINC label={'Координаты: '} value={newINC.coordinates} />
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Заявитель: '}</MuiDiv>
        <TextFieldIncidents
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              applicant: target.value,
            })
          }
          type="text"
          variant="outlined"
          className={'textContainerINConEdit boxTextonEdit'}
          value={newINC?.applicant ?? ''}
        />
      </MuiDiv>
      <MuiDiv className="cellINCContainer">
        <MuiDiv className="cellINCLabel">{'Контакты: '}</MuiDiv>
        <TextFieldIncidents
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              applicantContacts: target.value,
            })
          }
          type="text"
          variant="outlined"
          className={'textContainerINConEdit boxTextonEdit'}
          value={newINC?.applicantContacts ?? ''}
        />
      </MuiDiv>
    </MuiDiv>
  )
}
