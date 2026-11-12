import { Collapse, ListItemButton, ListItemText, Stack } from '@mui/material'
import { Controller } from 'react-hook-form'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { ChangeEvent, memo, useState } from 'react'
import { IGeneraWeb } from 'pages/Clients/interfaces'
import { MuiDiv } from 'components/MUI'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useSystem } from 'hooks/system/useSystem'

export const GeneralWeb = memo(
  ({ clientData, fieldsWeb, errors, control, checkForChange }: IGeneraWeb) => {
    const [, { generatePassword }] = useSystem()
    const [open, setOpen] = useState(false)

    return (
      <>
        <ListItemButton
          divider={open}
          className={'itemClientContainerLabel'}
          onClick={() => setOpen(!open)}>
          <ListItemText primary={'Доступ к личному кабинету'} sx={{ ml: 2 }} />
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
              className="stackClientWeb">
              {fieldsWeb.map(
                ({ id, name, label, validation, type, required }, index) => {
                  return (
                    <Controller
                      key={id}
                      control={control}
                      name={`listWeb.${index}.value`}
                      rules={validation}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          required={required ?? true}
                          variant="outlined"
                          className="textClientGeneralListWeb"
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
                            !!(errors?.listWeb ?? [])[index]?.value?.message
                          }
                          helperText={
                            (errors?.listWeb ?? [])[index]?.value?.message
                          }
                          inputProps={{ step: 1 }}
                        />
                      )}
                    />
                  )
                },
              )}
              <IconPopoverButton
                className={'addIconButton generatePassAddIconButton'}
                popover={'Сгенерировать пароль'}
                onClick={() => generatePassword(12)}
                icon={<LockResetIcon />}
                propsPopover={{ ml: 0.5 }}
                horizontal={'right'}
                horizontal2={'left'}
              />
            </Stack>
          </MuiDiv>
        </Collapse>
      </>
    )
  },
)
