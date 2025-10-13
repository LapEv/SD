import { createSlice } from '@reduxjs/toolkit'
import {
  changeNameRole,
  changeNameRolesGroup,
  changeRolesGroup,
  deleteRoles,
  deleteRolesGroup,
  newRole,
  newRolesGroup,
} from 'api/roles'
import {
  changeNameDepartment,
  changeNameDivision,
  deleteDepartment,
  deleteDivision,
  newDepartment,
  newDivision,
} from 'api/structure'
import { MessageState } from './interfaces'
import {
  ChangeAvatar,
  changePassword,
  updateProfile,
  deleteUser,
  signin,
  signup,
  updateUser,
  newUser,
  deleteAvatar,
  changeUserAppOptions,
} from 'api/user'
import {
  changeAddress,
  changeRegion,
  deleteAddress,
  deleteRegion,
  newAddress,
  newRegion,
} from 'api/address'
import {
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteClassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
  changeModelsInTypicalMalfunction,
} from 'api/classifier'
import {
  changeOLA,
  changeSLA,
  deleteOLA,
  deleteSLA,
  newOLA,
  newSLA,
} from 'api/sla'
import {
  changeClient,
  changeClientGroup,
  deleteClient,
  deleteClientGroup,
  newClient,
  newClientGroup,
} from 'api/clients'
import {
  changeContract,
  deleteContract,
  newContract,
  newContractName,
} from 'api/contracts'
import { changeObject, deleteObjects, newObject } from 'api/objects'
import {
  changeINC,
  changeIncidentStatuses,
  deleteIncidentStatuses,
  newINC,
  newIncidentStatuses,
  newTypeOfWork,
  deleteTypesOfWork,
  changeTypesOfWork,
  changeExecutor,
  changeResponsible,
  changeUserClosingCheck,
  changeUserClosing,
  changeStatus,
  newTypeCompletedWork,
  deleteTypesCompletedWork,
  changeTypesCompletedWork,
  changeComment,
  changeStateIncidentStatuses,
} from 'api/incidents'
import { uploadFiles } from 'api/files'

const initialState: MessageState = {
  text: '',
  type: null,
  isLoadingMessage: false,
  error: '',
}

export const messageSlise = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage(state) {
      state.text = ''
      state.type = null
    },
    setMessage(state, action) {
      state.text = action.payload.text
      state.type = action.payload.type
    },
  },
  extraReducers: builder => {
    builder.addCase(newDivision.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newDivision.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newDivision.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newDepartment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newDepartment.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteDivision.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteDivision.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteDivision.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteDepartment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteDepartment.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeNameDivision.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeNameDivision.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeNameDivision.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })

    builder.addCase(changeNameDepartment.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeNameDepartment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeNameDepartment.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newRole.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newRole.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newRole.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newRolesGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteRoles.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteRoles.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteRoles.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteRolesGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeRolesGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeNameRolesGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeNameRolesGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeNameRolesGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeNameRole.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeNameRole.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeNameRole.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(signin.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(signin.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(signup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newUser.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newUser.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newUser.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })

    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(updateProfile.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(ChangeAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(ChangeAvatar.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(ChangeAvatar.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteAvatar.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteAvatar.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeUserAppOptions.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeUserAppOptions.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeUserAppOptions.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changePassword.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changePassword.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteUser.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(updateUser.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newAddress.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newAddress.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newAddress.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteAddress.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteAddress.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteAddress.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeAddress.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeAddress.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeAddress.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newRegion.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newRegion.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newRegion.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteRegion.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteRegion.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteRegion.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeRegion.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeRegion.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeRegion.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newClassifierEquipment.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newClassifierEquipment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newClassifierEquipment.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      deleteClassifierEquipment.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(deleteClassifierEquipment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(
      deleteClassifierEquipment.rejected,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.type = 'error'
        state.text = payload as string
      },
    )
    builder.addCase(
      changeClassifierEquipment.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(changeClassifierEquipment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(
      changeClassifierEquipment.rejected,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.type = 'error'
        state.text = payload as string
      },
    )
    builder.addCase(newClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newClassifierModel.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteClassifierModel.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeClassifierModel.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeClassifierModel.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeClassifierModel.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newTypicalMalfunction.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newTypicalMalfunction.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      deleteTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(deleteTypicalMalfunction.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      changeTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(changeTypicalMalfunction.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeTypicalMalfunction.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      changeModelsInTypicalMalfunction.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(changeModelsInTypicalMalfunction.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(
      changeModelsInTypicalMalfunction.rejected,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.type = 'error'
        state.text = payload as string
      },
    )
    builder.addCase(newSLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newSLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newSLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteSLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteSLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteSLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeSLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeSLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeSLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newOLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newOLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newOLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteOLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteOLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteOLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeOLA.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeOLA.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeOLA.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newTypeOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newTypeOfWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newTypeOfWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteTypesOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteTypesOfWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteTypesOfWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeTypesOfWork.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeTypesOfWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeTypesOfWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newTypeCompletedWork.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newTypeCompletedWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newTypeCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      deleteTypesCompletedWork.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(deleteTypesCompletedWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteTypesCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      changeTypesCompletedWork.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(changeTypesCompletedWork.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeTypesCompletedWork.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newClientGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newClientGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteClientGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteClientGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeClientGroup.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeClientGroup.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeClientGroup.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newClient.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newClient.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newClient.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteClient.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteClient.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteClient.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeClient.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeClient.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeClient.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newContract.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newContract.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newContract.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newContractName.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newContractName.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newContractName.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteContract.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteContract.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteContract.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeContract.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeContract.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeContract.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newObject.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newObject.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newObject.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteObjects.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteObjects.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteObjects.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeObject.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeObject.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeObject.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newINC.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newINC.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newINC.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeINC.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeINC.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeINC.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeExecutor.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeExecutor.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeExecutor.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeResponsible.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeResponsible.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeResponsible.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeStatus.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeStatus.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeUserClosingCheck.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeUserClosingCheck.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeUserClosingCheck.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeUserClosing.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeUserClosing.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeUserClosing.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeComment.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeComment.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeComment.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(newIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(newIncidentStatuses.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(newIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(deleteIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(deleteIncidentStatuses.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(deleteIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(changeIncidentStatuses.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(changeIncidentStatuses.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(changeIncidentStatuses.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
    builder.addCase(
      changeStateIncidentStatuses.fulfilled,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.text = payload?.message.text as string
        state.type = payload?.message.type as string
      },
    )
    builder.addCase(changeStateIncidentStatuses.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(
      changeStateIncidentStatuses.rejected,
      (state, { payload }) => {
        state.isLoadingMessage = false
        state.type = 'error'
        state.text = payload as string
      },
    )
    builder.addCase(uploadFiles.fulfilled, (state, { payload }) => {
      state.isLoadingMessage = false
      state.text = payload?.message.text as string
      state.type = payload?.message.type as string
    })
    builder.addCase(uploadFiles.pending, state => {
      state.isLoadingMessage = true
    })
    builder.addCase(uploadFiles.rejected, (state, { payload }) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = payload as string
    })
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
