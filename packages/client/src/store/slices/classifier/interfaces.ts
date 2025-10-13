export interface ClassifierEquipment {
  id?: string
  equipment: string
  active?: boolean
  ClassifierModels?: ClassifierModels[]
  TypicalMalfunctions?: TypicalMalfunctions[]
}
export interface ClassifierModels {
  id?: string
  model: string
  id_equipment: string
  active?: boolean
  TypicalMalfunctions?: TypicalMalfunctions[]
  ClassifierEquipment?: ClassifierEquipment
  typicalModels?: TypicalMalfunctions[]
}

export interface TypicalMalfunctions {
  id?: string
  typicalMalfunction: string
  id_equipment: string
  active?: boolean
  ClassifierEquipment?: ClassifierEquipment
}

export interface AddClassifierModels {
  model: string
  id_equipment: string
  selectedTypicalMalfunctions: string[]
}

export interface AddTypicalMalfunctions {
  id?: string
  typicalMalfunction: string
  id_equipment: string
  active?: boolean
  selectedModels: string[]
}

export interface AnswerClassifierEquipment {
  data: ClassifierEquipment[]
  type: string
}

export interface AnswerClassifierModels {
  data: ClassifierModels[]
  type: string
}

export interface AnswerTypicalMalfunctions {
  data: TypicalMalfunctions[]
  type: string
}

export type ClassifierState = {
  equipments: ClassifierEquipment[]
  models: ClassifierModels[]
  typicalMalfunctions: TypicalMalfunctions[]
  activeEquipment: string
  activeModel: string
  isLoadingClassifier: boolean
  error?: string
}

export interface ChangeClassifierEquipment {
  equipment: string
  id: string
}

export interface ChangeClassifierModel {
  model: string
  id: string
  selectedTypicalMalfunctions?: string[]
}

export interface ChangeTypicalMalfunction {
  typicalMalfunction: string
  id: string
}

export interface ShortTypicalMalfunctions {
  models: string[]
  id: string
}

export interface ChangeModelsInTypicalMalfunction {
  newTypicalMalfunction: ShortTypicalMalfunctions[]
  id_equipment: string
}

export interface ClassifierEquipmentForINC {
  id: string
  equipment: string
  active: boolean
}

export interface ClassifierModelForINC {
  id: string
  model: string
  active: boolean
}

export interface TypicalMalfunctionForINC {
  id: string
  typicalMalfunction: string
  active: boolean
}
