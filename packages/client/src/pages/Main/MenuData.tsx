import { memo } from 'react'
import {
  DispatcherDataMainPage,
  FieldEngineersData,
  clientData,
  menuDataMainPage,
} from 'layouts/Main/drawerBarData'
import { MenuDataProps } from './interfaces'
import { MenuListItems } from './MenuListItems'

export const MenuData = memo(({ user }: MenuDataProps) => {
  if (
    user &&
    user.status === 'employee' &&
    user.RolesGroup?.group === 'Dispatcher'
  ) {
    return (
      <>
        {DispatcherDataMainPage.map(value => (
          <MenuListItems key={value.text} {...value} />
        ))}
      </>
    )
  }
  if (
    user &&
    user.status === 'employee' &&
    user.RolesGroup?.group === 'FieldEngineers'
  ) {
    return (
      <>
        {FieldEngineersData.map(value => (
          <MenuListItems key={value.text} {...value} />
        ))}
      </>
    )
  }
  if (
    user &&
    user.status === 'employee' &&
    (user.RolesGroup?.group === 'ADMIN' ||
      user.RolesGroup?.group === 'SUPERADMIN')
  ) {
    return (
      <>
        {menuDataMainPage.map(value => (
          <MenuListItems key={value.text} {...value} />
        ))}
      </>
    )
  }
  if (user && user.status === 'client') {
    return (
      <>
        {clientData.map(value => (
          <MenuListItems key={value.text} {...value} />
        ))}
      </>
    )
  }
  return (
    <>
      {/* {OtherData.map(value => (
        <MenuListItems key={value.text} {...value} />
      ))} */}
    </>
  )
})
