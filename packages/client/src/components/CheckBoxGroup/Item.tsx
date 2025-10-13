import { useState, ChangeEvent, useEffect, memo } from 'react'
import { Checkbox, FormControlLabel, ListItemText } from '@mui/material'
import { IItem } from './interface'
import { useTheme } from '@emotion/react'
import { ITheme } from 'themes/themeConfig'

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
  }: IItem) => {
    const [checked, setChecked] = useState<boolean>(
      (initChecked as boolean) ?? false,
    )
    const theme = useTheme() as ITheme
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

    // useEffect(() => {
    //   console.log('initChecked = ', initChecked)
    //   console.log('name = ', name)
    //   setChecked(initChecked as boolean)
    // }, [initChecked])

    useEffect(() => {
      setChecked(initChecked as boolean)
    }, [initChecked])

    // useEffect(() => {
    //   if (noEmpty) {
    //     setChecked(false as boolean)
    //   }
    // }, [noEmpty])

    return (
      <>
        <FormControlLabel
          label={name}
          id={id}
          name={`${name}`}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            p: 1,
            ml: theme.fontSize === 'small' ? 5 : 0,
            ...props,
          }}
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
            sx={{ ml: theme.fontSize === 'small' ? 10 : 5, ...props }}
          />
        )}
        {comment2?.length && (
          <ListItemText
            secondary={comment2}
            sx={{ ml: theme.fontSize === 'small' ? 10 : 5, ...props }}
          />
        )}
      </>
    )
  },
)
