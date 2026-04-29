import { SearchIconElement } from 'components/Icons'
import { ClearButton } from './ClearButton'
import { IClearSearchModalSection } from './interfaces'

export const ClearSearchModalSection = ({
  length,
  handleClick,
  className,
}: IClearSearchModalSection) => {
  return (
    <>
      {length > 0 ? (
        <ClearButton
          className={className}
          handleClick={handleClick}
          length={length}
        />
      ) : null}
      <SearchIconElement />
    </>
  )
}
