import { AppConst } from '../data/const'

export const getNewINC = (numberINC: number) => {
  const newINC = numberINC + 1
  const numberZeros =
    newINC >= 10000
      ? '0000'
      : newINC >= 100000
        ? '000'
        : newINC >= 1000000
          ? '00'
          : newINC >= 10000000
            ? '0'
            : newINC >= 100000000
              ? ''
              : '????'
  const incident = `${AppConst.attrINC}${numberZeros}${newINC}`
  AppConst.numberINC = newINC
  AppConst.incident = incident
}
