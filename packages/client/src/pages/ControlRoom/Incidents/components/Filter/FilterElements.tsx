import { Chip, Stack } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { columnData, operators, SETTINGS_DEFAULT } from '../../data'
import { overdueLabel } from '../../interfaces'

export const FilterElements = () => {
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()

  const onRemoveFilter = (_id: number) => {
    if (filterListOptions.length === 1) {
      setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
      return
    }

    const newFilter = filterListOptions
      .filter(({ id }) => id !== _id)
      .map((item, index) => {
        return { ...item, id: index + 1 }
      })
    setFilterListOptions(newFilter)
  }

  return (
    <MuiDiv className={'boxFilterChip'}>
      <Stack direction="row">
        {filterListOptions.map(
          ({
            columnLabel,
            column,
            value,
            id,
            operator,
            operatorLabel,
            logicOperatorLabel,
          }) => {
            if (column === columnData[34].id) {
              return (
                <Chip
                  key={`${value}_${id}`}
                  label={`${logicOperatorLabel ?? ''} ${columnLabel} "${value ? overdueLabel.true : overdueLabel.false}"`}
                  onDelete={() => onRemoveFilter(id)}
                  sx={{ mx: 0.25 }}
                />
              )
            }

            if (
              operator === operators[6].operator ||
              operator === operators[7].operator
            ) {
              return (
                <Chip
                  key={`${value}_${id}`}
                  label={`${logicOperatorLabel ?? ''} ${columnLabel} ${operatorLabel}`}
                  onDelete={() => onRemoveFilter(id)}
                  sx={{ mx: 0.25 }}
                />
              )
            }
            if ((value as string) !== '') {
              return (
                <Chip
                  key={`${value}_${id}`}
                  label={`${logicOperatorLabel ?? ''} ${columnLabel} ${operatorLabel} "${value}"`}
                  onDelete={() => onRemoveFilter(id)}
                  sx={{ mx: 0.25 }}
                />
              )
            }
          },
        )}
      </Stack>
    </MuiDiv>
  )
}
