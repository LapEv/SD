import { MuiDiv } from 'components/MUI'
import { IEditDataINC } from '../../interfaces'
import { MultiTextFieldIncident } from 'components/TextFields'

export const CommentsData = ({ newINC, setNewINC }: IEditDataINC) => {
  return (
    <MuiDiv className="editDataContainer">
      <MuiDiv className="editDataBox">
        <MultiTextFieldIncident
          label={'Описание заказчика'}
          variant="outlined"
          className={'textMultiCellsEditINC'}
          margin="normal"
          multiline
          maxRows={4}
          value={newINC?.description || ''}
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              description: target.value,
            })
          }
        />
      </MuiDiv>
      <MuiDiv className="editDataBox">
        <MultiTextFieldIncident
          label={'Комментарий'}
          variant="outlined"
          className={'textMultiCellsEditINC'}
          margin="normal"
          multiline
          maxRows={4}
          value={newINC?.comment || ''}
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              comment: target.value,
            })
          }
        />
      </MuiDiv>
      <MuiDiv className="editDataBox">
        <MultiTextFieldIncident
          label={'Комментарий к закрытию'}
          variant="outlined"
          className={'textMultiCellsEditINC'}
          margin="normal"
          multiline
          maxRows={4}
          value={newINC?.commentCloseCheck || ''}
          onChange={({ target }) =>
            setNewINC({
              ...newINC,
              commentCloseCheck: target.value,
            })
          }
        />
      </MuiDiv>
    </MuiDiv>
  )
}
