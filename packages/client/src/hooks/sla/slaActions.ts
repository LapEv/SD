import {
  AddOLA,
  AddSLA,
  ChangeOLA,
  ChangeSLA,
} from 'store/slices/sla/interfaces'

export interface SLAActions {
  getSLA: () => void
  getOLA: () => void
  newSLA: (data: AddSLA) => void
  newOLA: (data: AddOLA) => void
  deleteSLA: (data: string[]) => void
  deleteOLA: (data: string[]) => void
  changeSLA: (data: ChangeSLA) => void
  changeOLA: (data: ChangeOLA) => void
  setActiveSLA: (id: string) => void
  setActiveList: (id: string) => void
}
