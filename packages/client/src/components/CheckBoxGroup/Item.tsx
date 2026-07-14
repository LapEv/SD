import { useState, ChangeEvent, useEffect, memo } from 'react'
import { Checkbox, FormControlLabel, ListItemText } from '@mui/material'
import { IItem } from './interface'

export const Item = memo(
  ({
    name,
    id,
    groupChecked,
    onChooseItems,
    comment,
    comment2,
    initChecked,
    oneChecked,
    props,
    noEmpty,
    className,
    classItemText,
  }: IItem) => {
    const [checked, setChecked] = useState<boolean>(
      (initChecked as boolean) ?? false,
    )
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (oneChecked && noEmpty && checked) {
        if (!event.target.checked) {
          return
        }
      }
      setChecked(event.target.checked)
      onChooseItems(event.target.checked, id)
    }

    useEffect(() => {
      if (groupChecked === null) return
      groupChecked ? setChecked(true) : setChecked(false)
    }, [groupChecked])

    useEffect(() => {
      if (!oneChecked) {
        setChecked(false)
      }
    }, [oneChecked])

    useEffect(() => {
      setChecked(initChecked as boolean)
    }, [initChecked])

    return (
      <>
        <FormControlLabel
          label={name}
          id={id}
          name={`${name}`}
          sx={{ ...props }}
          className={`itemsContaimer  ${className}`}
          control={
            <Checkbox
              sx={{
                p: 0,
                pr: 1,
              }}
              checked={checked || false}
              onChange={handleChange}
            />
          }
        />
        {comment?.length && (
          <ListItemText
            secondary={comment}
            className={classItemText}
            sx={props}
          />
        )}
        {comment2?.length && (
          <ListItemText
            secondary={comment2}
            sx={props}
            className={classItemText}
          />
        )}
      </>
    )
  },
)
