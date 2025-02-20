import { ButtonProps } from '@mui/material'
import { Button } from 'components/Buttons'
import { memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export const LinkButton = memo((props: ButtonProps & LinkProps) => {
  return <Button component={Link} {...props} />
})
