import { departmentStartData } from './department'
import { divisionStartData } from './division'
import { userStartData } from './user'
import { userStatusStartData } from './userStatus'
import {
  AddressesRepos,
  ClassifierEquipmentRepos,
  ClassifierModelsRepos,
  ClientsRepos,
  DepartmentRepos,
  DivisionRepos,
  // FilesRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  OLARepos,
  ObjectsRepos,
  RegionsRepos,
  SLARepos,
  ThroughModelRolesGroupRepos,
  ThroughModelTypMalfunctionsRepos,
  TypesCompletedWorkRepos,
  TypesOfWorkRepos,
  TypicalMalfunctionsRepos,
  UserStatusRepos,
  roleGroupRepos,
  roleRepos,
  sequelize,
  userRepos,
} from '../../db'
import bcrypt from 'bcryptjs'
import { rolesStartData } from './role'
import { rolesGroupStartData } from './rolesGroup'
import { addressesStartData, regionsStartData } from './addresses'
import {
  equipmentsStartData,
  modelsStartData,
  typ_malfunctionsStartData,
} from './classifier'
import { AZStartData, slaStartData } from './sla'
import { clientsStartData } from './clients'
import { objectsStartData } from './objects'
import {
  incStatusesStartData,
  typesOfWorkStartData,
  typesCompletedWorkStartData,
} from './incident'
import { IDivision } from '/models/divisions'
import {
  IClassifierEquipment,
  IClassifierModels,
  ITypicalMalfunctions,
} from '/models/classifier'
import { ITypesOfWork } from '/models/incidents'
import { IAddresses, IRegions } from '/models/adresses'
import { IDepartment } from '/models/departments'
import { RolesGroup, IRoles } from '/models/roles'

export const firstStart = async () => {
  try {
    const AllDelete = false
    if (AllDelete) {
      console.log('Full Delete!')
      await sequelize.drop({ cascade: true })
      return
    }

    console.log('Check for tables!')
    const rolesGroup = await roleGroupRepos.getAll()
    const roles = await roleRepos.getAll()
    const divisions = await DivisionRepos.getAll()
    const department = await DivisionRepos.getAll()
    const users = await userRepos.getAll()
    const regions = await RegionsRepos.getAll()
    const addresses = await AddressesRepos.getAll()
    const equipments = await ClassifierEquipmentRepos.getAll()
    const models = await ClassifierModelsRepos.getAll()
    const typ_malfunctions = await TypicalMalfunctionsRepos.getAll()
    const sla = await SLARepos.getAll()
    const ola = await OLARepos.getAll()
    const clients = await ClientsRepos.getAll()
    const incs = await IncidentRepos.getAll()
    const incStatuses = await IncidentStatusesRepos.getAll()
    const typesOfWork = await TypesOfWorkRepos.getAll()
    const typesCompletedWork = await TypesCompletedWorkRepos.getAll()
    // const files = await FilesRepos.getAll()

    console.log('End Check for tables!!')
    const deleteClients = false
    if (deleteClients) {
      console.log('Delete Clients')
      await ClientsRepos.drop({ cascade: true })
    } else {
      console.log('Check Clients')
      if (clients.length) {
        console.log(
          'Первый запуск таблиц Clients невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Create Clients')
        await ClientsRepos.bulkCreate(clientsStartData)
      }
    }

    const deleteAddress = false
    if (deleteAddress) {
      console.log('Delete Addresses')
      await AddressesRepos.drop({ cascade: true })
      await RegionsRepos.drop({ cascade: true })
      await ObjectsRepos.drop({ cascade: true })
    } else {
      console.log('Check Addresses')
      if (addresses.length || regions.length) {
        console.log(
          'Первый запуск таблиц Address и Regions невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Create Addresses')
        if (!regions.length) {
          const newRegions = (await RegionsRepos.bulkCreate(
            regionsStartData,
          )) as IRegions[]
          const newAddressesData = addressesStartData.map(value => {
            return { ...value, id_region: newRegions[0].id }
          })
          if (!addresses.length) {
            const newAddresses = (await AddressesRepos.bulkCreate(
              newAddressesData,
            )) as IAddresses[]
            const newClients = await ClientsRepos.getAll()
            const objectdata = objectsStartData.map((value, index) => {
              return {
                ...value,
                id_region: newRegions[0].id,
                id_address: newAddresses[index].id,
                id_client: newClients[0].id,
              }
            })
            await ObjectsRepos.bulkCreate(objectdata)
          }
        }
      }
    }

    // const deleteFiles = false
    // if (deleteFiles) {
    //   console.log('Delete Files!')
    //   await FilesRepos.drop({ cascade: true })
    // } else {
    //   console.log('Check Files')
    //   if (files.length) {
    //     console.log(
    //       'Первый запуск таблиц Files невозможен! Какая-то из таблиц уже существует!'
    //     )
    //   } else {
    //     console.log('Create Files!')
    //     await FilesRepos.bulkCreate(typesCompletedWorkStartData)
    //   }
    // }

    const deleteTypesCompletedWork = false
    if (deleteTypesCompletedWork) {
      console.log('Delete TypesCompletedWork!')
      await TypesCompletedWorkRepos.drop({ cascade: true })
    } else {
      console.log('Check TypesCompletedWork')
      if (typesCompletedWork.length) {
        console.log(
          'Первый запуск таблиц TypesCompletedWork невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Create TypesCompletedWork!')
        await TypesCompletedWorkRepos.bulkCreate(typesCompletedWorkStartData)
      }
    }

    const deleteINC = false
    if (deleteINC) {
      console.log('Delete INC!')
      await IncidentRepos.drop({ cascade: true })
      await IncidentStatusesRepos.drop({ cascade: true })
    } else {
      console.log('Check INC')
      if (incs.length || incStatuses.length) {
        console.log(
          'Первый запуск таблиц INC, INCStatuses невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Create INC')
        await IncidentStatusesRepos.bulkCreate(incStatusesStartData)
      }
    }
    console.log('End delete Clients! ')

    const deleteSLA = false
    if (deleteSLA) {
      console.log('Delete SLA')
      await SLARepos.drop({ cascade: true })
      await OLARepos.drop({ cascade: true })
      await TypesOfWorkRepos.drop({ cascade: true })
    } else {
      console.log('Check SLA')
      if (sla.length || ola.length || typesOfWork.length) {
        console.log(
          'Первый запуск таблиц SLA, OLA, TypesOfWork невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Create SLA')
        const typesWork = (await TypesOfWorkRepos.bulkCreate(
          typesOfWorkStartData,
        )) as ITypesOfWork[]
        const newSLA = slaStartData.map((item, index) => {
          return {
            ...item,
            id_typeOfWork: index === 5 ? typesWork[4].id : typesWork[index].id,
          }
        })
        // const newOLA = olaStartData.map((item, index) => {
        //   return {
        //     ...item,
        //     id_typeOfWork: index <= 0 ? typesWork[index].id : typesWork[1].id,
        //   }
        // })
        await SLARepos.bulkCreate(newSLA)
        await SLARepos.create({
          ...AZStartData[0],
          id_typeOfWork: typesWork[0].id,
        })
        await SLARepos.create({
          ...AZStartData[1],
          id_typeOfWork: typesWork[0].id,
        })
        await SLARepos.create({
          ...AZStartData[2],
          id_typeOfWork: typesWork[0].id,
        })

        // await OLARepos.bulkCreate(newOLA)
      }
    }

    console.log('End delete SLA!')

    const deleteClassifier = false
    if (deleteClassifier) {
      console.log('Delete Classifier')
      await ClassifierEquipmentRepos.drop({ cascade: true })
      await ClassifierModelsRepos.drop({ cascade: true })
      await TypicalMalfunctionsRepos.drop({ cascade: true })
    } else {
      if (equipments.length || models.length || typ_malfunctions.length) {
        console.log(
          'Первый запуск таблиц ClassifierEquipment, ClassifierModels и TypicalMalfunctions невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        const newEquipments = (await ClassifierEquipmentRepos.bulkCreate(
          equipmentsStartData,
        )) as IClassifierEquipment[]
        const newModelsStartData = modelsStartData.map((item, index) => {
          return {
            ...item,
            id_equipment: index < 3 ? newEquipments[0].id : newEquipments[1].id,
          }
        })

        const newModels = (await ClassifierModelsRepos.bulkCreate(
          newModelsStartData,
        )) as IClassifierModels[]

        const newTypicalMalfunctionStartData = typ_malfunctionsStartData.map(
          (item, index) => {
            return {
              ...item,
              id_equipment:
                index < 3 ? newEquipments[0].id : newEquipments[1].id,
            }
          },
        )

        const newTypicalMalfunction =
          (await TypicalMalfunctionsRepos.bulkCreate(
            newTypicalMalfunctionStartData,
          )) as ITypicalMalfunctions[]

        const newThroughModelTypMalfunction = newModels.map((item, index) => {
          const temp = newTypicalMalfunction.map((value, i) => {
            if (index < 3 && i < 3) {
              return {
                id_model: item.id,
                id_typicalMalfunction: value.id,
              }
            }
            if (index >= 3 && i >= 3) {
              return {
                id_model: item.id,
                id_typicalMalfunction: value.id,
              }
            }
            return {
              id_model: null,
              id_typicalMalfunction: null,
            }
          })
          const temp2 = temp.filter(
            item => item.id_model && item.id_typicalMalfunction,
          )
          return temp2
        })

        const newArr = newThroughModelTypMalfunction.reduce((acc, arr) => [
          ...acc,
          ...arr,
        ])
        await ThroughModelTypMalfunctionsRepos.bulkCreate(newArr)
      }
    }

    const deleteRoles = false
    if (deleteRoles) {
      await roleRepos.drop({ cascade: true })
      await roleGroupRepos.drop({ cascade: true })
    } else {
      if (roles.length || rolesGroup.length) {
        console.log(
          'Первый запуск таблиц Roles, RolesGroup невозможен! Какая-то из таблиц уже существует!',
        )
      } else {
        console.log('Start create Roles DB')
        const newRolesGroup = (await roleGroupRepos.bulkCreate(
          rolesGroupStartData,
        )) as RolesGroup[]
        const newRolesData = rolesStartData.map(({ role, nameRole }) => {
          return { role, nameRole, active: true }
        })
        const newRoles = (await roleRepos.bulkCreate(newRolesData)) as IRoles[]

        const newthroughRoles = rolesStartData
          .map(({ group, role }) => {
            return group?.map(item => {
              const id_rolesGroup = newRolesGroup.find(
                ({ group }) => group === item,
              )?.id
              const id_roles = newRoles.find(item => item.role === role)?.id
              return {
                id_rolesGroup,
                id_roles,
              }
            })
          })
          .flat(1)
          .filter(item => item) as []
        await ThroughModelRolesGroupRepos.bulkCreate(newthroughRoles)
      }
    }

    const del = false
    if (del) {
      console.log('Delete Users & Divisions')
      await DepartmentRepos.drop({ cascade: true })
      await DivisionRepos.drop({ cascade: true })
      await userRepos.drop({ cascade: true })
      await UserStatusRepos.drop({ cascade: true })
      return
    }

    if (divisions.length || department.length || users.length) {
      console.log(
        'Первый запуск таблиц невозможен! Какая-то из таблиц уже существует!',
      )
    } else {
      console.log('Create Div, Dep, Users, UserStatusses!')
      const newDivision = (await DivisionRepos.bulkCreate(
        divisionStartData,
      )) as IDivision[]
      const newDepartmentData = departmentStartData.map(value => {
        return {
          ...value,
          id_division: newDivision.find(
            item => item.division === value.division,
          )?.id,
        }
      })
      const newDepartment = (await DepartmentRepos.bulkCreate(
        newDepartmentData,
      )) as IDepartment[]
      await UserStatusRepos.bulkCreate(userStatusStartData)
      const rolesGroup = (await roleGroupRepos.findAll({})) as RolesGroup[]
      const newuserStartData = userStartData.map(value => {
        const hashPassword = bcrypt.hashSync(value.password, 7)
        return {
          ...value,
          password: hashPassword,
          active: true,
          theme: 'light',
          id_division: newDivision.find(
            item => item.division === value.division,
          )?.id,
          id_department: newDepartment.find(
            item => item.department === value.department,
          )?.id,
          id_rolesGroup: rolesGroup.find(
            item => item.group === value.rolesGroup,
          )?.id,
        }
      })
      const userData = newuserStartData.map(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        ({ department, division, rolesGroup, ...obj }) => obj,
        /* eslint-enable @typescript-eslint/no-unused-vars */
      )
      await userRepos.bulkCreate(userData)
      console.log('Create Div, Dep, Users, UserStatusses completed!')
    }
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
