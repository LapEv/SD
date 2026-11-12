import { Collapse, ListItemButton, ListItemText, Stack } from '@mui/material'
import { Controller } from 'react-hook-form'
import { RotateButton } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { ChangeEvent, memo, useState } from 'react'
import { IGeneralInfo } from 'pages/Clients/interfaces'
import { MuiDiv } from 'components/MUI'

export const GeneralInfo = memo(
  ({
    clientData,
    fieldsInfo,
    errors,
    control,
    checkForChange,
  }: IGeneralInfo) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <ListItemButton
          divider={open}
          className={'itemClientContainerLabel'}
          onClick={() => setOpen(!open)}>
          <ListItemText primary={'Информация'} sx={{ ml: 2 }} />
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          className={'collapseList collapseList_p'}
          in={open}
          timeout="auto"
          unmountOnExit>
          <MuiDiv className="boxClientGeneral">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              className="stackClientGeneral">
              {fieldsInfo.map(
                ({ id, name, label, validation, type, required }, index) => {
                  return (
                    <Controller
                      key={id}
                      control={control}
                      name={`listInfo.${index}.value`}
                      rules={validation}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          required={required ?? true}
                          variant="outlined"
                          className="textClientGeneralList"
                          margin="normal"
                          onChange={(event: ChangeEvent<HTMLInputElement>) => (
                            field.onChange(event.target.value),
                            checkForChange({
                              ...clientData,
                              ...{
                                [name]: event.target.value,
                              },
                            })
                          )}
                          error={
                            !!(errors?.listInfo ?? [])[index]?.value?.message
                          }
                          helperText={
                            (errors?.listInfo ?? [])[index]?.value?.message
                          }
                          inputProps={{ step: 1 }}
                        />
                      )}
                    />
                  )
                },
              )}
            </Stack>
          </MuiDiv>
        </Collapse>
      </>
    )
  },
)
