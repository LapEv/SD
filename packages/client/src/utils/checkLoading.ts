import { useAuth } from 'hooks/auth/useAuth'
import { useRoles } from 'hooks/roles/useRoles'
import { useStructure } from 'hooks/structure/useStructure'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { useClients } from 'hooks/clients/useClients'
import { useContracts } from 'hooks/contracts/useContracts'
import { useObjects } from 'hooks/objects/useObjects'
import { useSLA } from 'hooks/sla/useSLA'
import { useIncidents } from 'hooks/incidents/useINC'
import { useFiles } from 'hooks/files/useFiles'

export const checkLoading = () => {
  const [{ isLoadingAuth }] = useAuth()
  const [{ isLoadingAddress }] = useAddresses()
  const [{ isLoadingRoles }] = useRoles()
  const [{ isLoadingStructure }] = useStructure()
  const [{ isLoadingClassifier }] = useClassifier()
  const [{ isLoadingClients }] = useClients()
  const [{ isLoadingContracts }] = useContracts()
  const [{ isLoadingObjects }] = useObjects()
  const [{ isLoadingSLA }] = useSLA()
  const [{ isLoadingINC }] = useIncidents()
  const [{ isLoadingFiles }] = useFiles()

  if (
    isLoadingAuth ||
    isLoadingRoles ||
    isLoadingStructure ||
    isLoadingAddress ||
    isLoadingClassifier ||
    isLoadingClients ||
    isLoadingContracts ||
    isLoadingObjects ||
    isLoadingSLA ||
    isLoadingINC ||
    isLoadingFiles
  )
    return true
  return false
}
