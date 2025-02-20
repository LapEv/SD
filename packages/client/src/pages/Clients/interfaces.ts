export interface IEquipmentList {
  equipmentID: string[]
  modelID: string[]
  onChooseGroup: (data: string[]) => void
  onChooseItems: (data: string[]) => void
  clearChanges?: boolean
  onClearChanges?: (clearChanges: boolean) => void
}

export interface IIncStatussesList {
  incStatussesID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export interface IObjectList {
  objectID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export interface ISLAList {
  slaID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}
