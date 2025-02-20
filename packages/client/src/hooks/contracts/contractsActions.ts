import {
  ChangeContract,
  Contracts,
  NewContractName,
} from 'store/slices/contracts/interfaces'

export interface ContractsActions {
  getContracts: () => void
  getContractsByClientID: (id_client: string) => void
  newContract: (data: Contracts) => void
  newContractName: (data: NewContractName) => void
  deleteContract: (data: string[]) => void
  changeContract: (data: ChangeContract) => void
  setActiveContract: (id: string) => void
  resetContracts: () => void
}
