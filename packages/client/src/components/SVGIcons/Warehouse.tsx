import { SvgIcon, SvgIconProps } from '@mui/material'
import { memo } from 'react'

export const Warehouse = memo((props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <path d="m271.422 393.521h82.588v82.588h-82.588z"></path>
      <path d="m214.706 280.933h82.588v82.588h-82.588z"></path>
      <path d="m157.99 393.521h82.588v82.588h-82.588z"></path>
      <path d="m0 136.341v340.148h60.1v-294.975h391.8v294.975h60.1v-340.148l-256-100.83z"></path>
      <path d="m90.1 476.11h37.89v-112.589h56.716v-112.588h142.588v112.588h56.716v112.589h37.89v-264.596h-331.8z"></path>
    </SvgIcon>
  )
})
