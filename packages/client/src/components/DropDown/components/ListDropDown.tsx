import { MuiDiv, MuiLi, MuiSpan } from 'components/MUI'
import { Options } from '../interface'
import { HTMLAttributes } from 'react'

export interface IListDropDown {
  value: string | Options[] | undefined
  props: HTMLAttributes<HTMLLIElement>
  option: Options
  classNameLi?: string
}

export const ListDropDown = ({
  value,
  props,
  option,
  classNameLi,
}: IListDropDown) => {
  if (!value) {
    props['aria-selected'] = 'false'
  }

  const selected = value === option.label ? 'selected' : ''

  return (
    <>
      <MuiLi
        aria-selected="false"
        {...props}
        className={`${classNameLi} ${selected}`}>
        <MuiSpan className={'dropdown_span'} />
        <MuiDiv sx={{ flexGrow: 1 }}>
          {(option as Options).label}
          {(option as Options).description && (
            <div>
              <span>{(option as Options).description}</span>
            </div>
          )}
          {(option as Options).descriptionID && (
            <div>
              <span>{(option as Options).descriptionID}</span>
            </div>
          )}
        </MuiDiv>
      </MuiLi>
    </>
  )
}
