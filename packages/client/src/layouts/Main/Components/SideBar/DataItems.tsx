import { memo } from 'react'
import {
  DispatcherData,
  FieldEngineersData,
  OtherData,
  clientData,
  menuData,
} from 'layouts/Main/drawerBarData'
import { DataItemsProps } from 'layouts/Main/interfaces'
import { NanListItem } from 'layouts/Main/Components/SideBar/NanListItem'

export const DataItems = memo(
  ({ user, open, closeMobileMenu }: DataItemsProps) => {
    if (
      user &&
      user.status === 'employee' &&
      user.RolesGroup?.group === 'Dispatcher'
    ) {
      return (
        <>
          {DispatcherData.map(value => (
            <NanListItem
              key={value.text}
              {...value}
              isExpanded={open}
              closeMobileMenu={closeMobileMenu as () => void}
            />
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
            <NanListItem
              key={value.text}
              {...value}
              isExpanded={open}
              closeMobileMenu={closeMobileMenu as () => void}
            />
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
          {menuData.map(value => (
            <NanListItem
              key={value.text}
              {...value}
              isExpanded={open}
              closeMobileMenu={closeMobileMenu as () => void}
            />
          ))}
        </>
      )
    }
    if (user && user.status === 'SUPERADMIN') {
      return (
        <>
          {menuData.map(value => (
            <NanListItem
              key={value.text}
              {...value}
              isExpanded={open}
              closeMobileMenu={closeMobileMenu as () => void}
            />
          ))}
        </>
      )
    }
    if (user && user.status === 'client') {
      return (
        <>
          {clientData.map(value => (
            <NanListItem
              key={value.text}
              {...value}
              isExpanded={open}
              closeMobileMenu={closeMobileMenu as () => void}
            />
          ))}
        </>
      )
    }
    return (
      <>
        {OtherData.map(value => (
          <NanListItem
            key={value.text}
            {...value}
            isExpanded={open}
            closeMobileMenu={closeMobileMenu as () => void}
          />
        ))}
      </>
    )
  },
)
