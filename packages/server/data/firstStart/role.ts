export const rolesStartData = [
  {
    role: 'SUPERADMIN',
    group: ['SUPERADMIN'],
    nameRole: 'Все права',
  },
  {
    role: 'ADMIN',
    group: ['ADMIN'],
    nameRole: 'Права Администратора',
  },
  {
    role: 'newUser',
    group: ['ADMIN'],
    nameRole: 'Добавления нового пользователя',
  },

  {
    role: 'getUsers',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA', 'FieldEngineers'],
    nameRole: 'Получение списка пользователей',
  },
  {
    role: 'getFieldEngineers',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка выездных инженеров',
  },
  {
    role: 'getDispatchers',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка диспетчеров',
  },
  {
    role: 'getRoles',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка ролей',
  },
  {
    role: 'getRolesGroup',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка групп ролей',
  },
  {
    role: 'getRolesGroupByID',
    group: ['ADMIN'],
    nameRole: 'Получение группы ролей по ID',
  },
  {
    role: 'getRolesGroupNotRoles',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка групп ролей без списка ролей',
  },
  {
    role: 'changeNameRolesGroup',
    group: ['ADMIN'],
    nameRole: 'Изменение названия группы ролей',
  },
  {
    role: 'changeNameRole',
    group: ['ADMIN'],
    nameRole: 'Изменение названия роли',
  },
  {
    role: 'getDivisions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка дивизионов',
  },
  {
    role: 'getAllDivisions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка дивизионов',
  },
  {
    role: 'getDepartments',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка отделов',
  },
  {
    role: 'getAllDepartments',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка отделов',
  },
  {
    role: 'deleteDivision',
    group: ['ADMIN'],
    nameRole: 'Перемещение дивизиона в архив',
  },
  {
    role: 'pullDivisionFromArchive',
    group: ['ADMIN'],
    nameRole: 'Восстановление дивизиона из архива',
  },
  {
    role: 'deleteDepartment',
    group: ['ADMIN'],
    nameRole: 'Перемещение отдела в архив',
  },
  {
    role: 'pullDepartmentFromArchive',
    group: ['ADMIN'],
    nameRole: 'Восстановление отдела из архива',
  },

  {
    role: 'addNewRole',
    group: [],
    nameRole: 'Добавление новой роли',
  },
  {
    role: 'addNewRolesGroup',
    group: [],
    nameRole: 'Добавление новой группы ролей',
  },
  {
    role: 'deleteRole',
    group: [],
    nameRole: 'Удаление ролей',
  },
  {
    role: 'deleteRolesGroup',
    group: [],
    nameRole: 'Удаление группы ролей',
  },
  {
    role: 'changeRolesGroup',
    group: [],
    nameRole: 'Изменение ролей в группы ролей',
  },
  {
    role: 'newDivision',
    group: ['ADMIN'],
    nameRole: 'Добавление нового дивизиона',
  },
  {
    role: 'updateDivision',
    group: ['ADMIN'],
    nameRole: 'Изменение данных дивизиона',
  },
  {
    role: 'changeNameDivision',
    group: ['ADMIN'],
    nameRole: 'Изменение названия дивизиона',
  },

  {
    role: 'newDepartment',
    group: ['ADMIN'],
    nameRole: 'Добавление нового отдела',
  },
  {
    role: 'updateDepartment',
    group: ['ADMIN'],
    nameRole: 'Изменение данных отдела',
  },
  {
    role: 'changeNameDepartment',
    group: ['ADMIN'],
    nameRole: 'Изменение названия отдела',
  },

  {
    role: 'updateUser',
    group: ['ADMIN'],
    nameRole: 'Изменение данных пользователя',
  },
  {
    role: 'fullDeleteUser',
    group: [],
    nameRole: 'Полное удаление пользователя',
  },
  {
    role: 'deleteUser',
    group: ['ADMIN'],
    nameRole: 'Перемещение пользователя в архив',
  },
  {
    role: 'pullUserInArchive',
    group: [],
    nameRole: 'Вытащить пользователя из архива',
  },
  {
    role: 'getClientGroups',
    group: ['ADMIN'],
    nameRole: 'Получения списка групп клиентов',
  },
  {
    role: 'newClientGroup',
    group: ['ADMIN'],
    nameRole: 'Создание группы клиентов',
  },
  {
    role: 'deleteClientGroup',
    group: ['ADMIN'],
    nameRole: 'Удаление группы клиентов',
  },
  {
    role: 'changeClientGroup',
    group: ['ADMIN'],
    nameRole: 'Изменение группы клиентов',
  },
  {
    role: 'getAllObjects',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка всех объектов',
  },
  {
    role: 'getActiveObjects',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка всех активных объектов',
  },
  {
    role: 'newObject',
    group: ['ADMIN'],
    nameRole: 'Создание нового объекта',
  },
  {
    role: 'deleteObject',
    group: ['ADMIN'],
    nameRole: 'Перемещение объекта в архив',
  },
  {
    role: 'fulldeleteObject',
    group: [],
    nameRole: 'Удаление объекта',
  },
  {
    role: 'changeObject',
    group: ['ADMIN'],
    nameRole: 'Изменение объекта',
  },
  {
    role: 'pullObjectFromArchive',
    group: [],
    nameRole: 'Вытащить объект из архива',
  },
  {
    role: 'getAllClients',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка всех клиентов',
  },
  {
    role: 'getClients',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка всех активных клиентов',
  },
  {
    role: 'newClient',
    group: ['ADMIN'],
    nameRole: 'Создание нового клиента',
  },
  {
    role: 'deleteClient',
    group: ['ADMIN'],
    nameRole: 'Перемещение клиента в архив',
  },
  {
    role: 'fulldeleteClient',
    group: [],
    nameRole: 'Удаление клиента',
  },
  {
    role: 'changeClient',
    group: ['ADMIN'],
    nameRole: 'Изменение данных клиента',
  },
  {
    role: 'pullClientFromArchive',
    group: [],
    nameRole: 'Вытащить клиента из архива',
  },
  {
    role: 'getAddresses',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных адресов',
  },
  {
    role: 'getAllAddresses',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка адресов',
  },
  {
    role: 'newAddress',
    group: ['ADMIN'],
    nameRole: 'Создание нового адреса',
  },
  {
    role: 'deleteAddress',
    group: ['ADMIN'],
    nameRole: 'Перемещение адреса в архив',
  },
  {
    role: 'changeAddress',
    group: ['ADMIN'],
    nameRole: 'Изменение данных адреса',
  },
  {
    role: 'getRegions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных регионов',
  },
  {
    role: 'getAllRegions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка регионов',
  },
  {
    role: 'newRegion',
    group: ['ADMIN'],
    nameRole: 'Создание нового региона',
  },
  {
    role: 'deleteRegion',
    group: ['ADMIN'],
    nameRole: 'Перемещение региона в архив',
  },
  {
    role: 'changeRegion',
    group: ['ADMIN'],
    nameRole: 'Изменение данных региона',
  },
  {
    role: 'getClassifierEquipments',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных позиций классификатора оборудования',
  },
  {
    role: 'getAllClassifierEquipments',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка классификатора оборудования',
  },
  {
    role: 'newClassifierEquipment',
    group: ['ADMIN'],
    nameRole: 'Создание нового классификатора оборудования',
  },
  {
    role: 'deleteClassifierEquipment',
    group: ['ADMIN'],
    nameRole: 'Перемещение классификатора оборудования в архив',
  },
  {
    role: 'changeClassifierEquipment',
    group: ['ADMIN'],
    nameRole: 'Изменение данных классификатора оборудования',
  },
  {
    role: 'getClassifierModels',
    nameRole: 'Получение списка активных позиций классификатора моделей',
  },
  {
    role: 'getAllClassifierModels',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка классификатора моделей',
  },
  {
    role: 'getClassifierModelsById',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole:
      'Получение полного списка классификатора активных моделей по ID оборудования',
  },
  {
    role: 'newClassifierModel',
    group: ['ADMIN'],
    nameRole: 'Создание нового классификатора моделей',
  },
  {
    role: 'deleteClassifierModel',
    group: ['ADMIN'],
    nameRole: 'Перемещение классификатора моделей в архив',
  },
  {
    role: 'changeClassifierModel',
    group: ['ADMIN'],
    nameRole: 'Изменение данных классификатора моделей',
  },
  {
    role: 'getTypicalMalfunctions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных позиций типовых неисправностей',
  },
  {
    role: 'getAllTypicalMalfunctions',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение полного списка типовых неисправностей',
  },
  {
    role: 'getTypicalMalfunctionsById',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole:
      'Получение полного списка активных типовых неисправностей по ID оборудования',
  },
  {
    role: 'newTypicalMalfunction',
    group: ['ADMIN'],
    nameRole: 'Создание нового типовых неисправностей',
  },
  {
    role: 'deleteTypicalMalfunction',
    group: ['ADMIN'],
    nameRole: 'Перемещение типовых неисправностей в архив',
  },
  {
    role: 'changeTypicalMalfunction',
    group: ['ADMIN'],
    nameRole: 'Изменение данных типовых неисправностей',
  },
  {
    role: 'changeModelsInTypicalMalfunction',
    group: ['ADMIN'],
    nameRole: 'Изменение данных типовых неисправностей по моделям',
  },
  {
    role: 'getSLA',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных SLA',
  },
  {
    role: 'newSLA',
    group: ['ADMIN'],
    nameRole: 'Создание нового SLA',
  },
  {
    role: 'deleteSLA',
    group: ['ADMIN'],
    nameRole: 'Перемещение SLA в архив',
  },
  {
    role: 'changeSLA',
    group: ['ADMIN'],
    nameRole: 'Изменение данных SLA',
  },
  {
    role: 'getOLA',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных OLA',
  },
  {
    role: 'newOLA',
    group: ['ADMIN'],
    nameRole: 'Создание нового OLA',
  },
  {
    role: 'deleteOLA',
    group: ['ADMIN'],
    nameRole: 'Перемещение OLA в архив',
  },
  {
    role: 'changeOLA',
    group: ['ADMIN'],
    nameRole: 'Изменение данных OLA',
  },
  {
    role: 'getContracts',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных контрактов',
  },
  {
    role: 'getContractsByClientID',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных контрактов по ID клиента',
  },
  {
    role: 'newContract',
    group: ['ADMIN'],
    nameRole: 'Создание нового контракта',
  },
  {
    role: 'newContractName',
    group: ['ADMIN'],
    nameRole: 'Изменение наименование контракта',
  },
  {
    role: 'deleteContract',
    group: ['ADMIN'],
    nameRole: 'Перемещение контракта в архив',
  },
  {
    role: 'changeContract',
    group: ['ADMIN'],
    nameRole: 'Изменение данных контракта',
  },
  {
    role: 'getINC',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных инцидентов',
  },
  {
    role: 'getFilter',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных фильтров для инцидентов',
  },
  {
    role: 'getINCs',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных инцидентов по параметрам',
  },
  {
    role: 'newINC',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Создание нового инцидента',
  },
  {
    role: 'changeINC',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение данных инцидента',
  },
  {
    role: 'changeExecutor',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение исполнителя инцидента',
  },
  {
    role: 'changeResponsible',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение ответственного инцидента',
  },
  {
    role: 'changeStatus',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение статуса инцидента',
  },
  {
    role: 'changeUserClosingCheck',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение ответсвенного за инцидент',
  },
  {
    role: 'changeUserClosing',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение ответсвенного за закрытие инцидента',
  },
  {
    role: 'changeComment',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Изменение комментария инцидента',
  },
  {
    role: 'newTypeOfWork',
    group: ['ADMIN'],
    nameRole: 'Создание нового типа работ',
  },
  {
    role: 'getTypesOfWork',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных типов работ',
  },
  {
    role: 'deleteTypesOfWork',
    group: ['ADMIN'],
    nameRole: 'Перемещение типа работ в архив',
  },
  {
    role: 'changeTypesOfWork',
    group: ['ADMIN'],
    nameRole: 'Изменение данных типа работ',
  },
  {
    role: 'getINCLogs',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение логов инцидентов',
  },
  {
    role: 'getTypesCompletedWork',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных типов выполненных работ',
  },
  {
    role: 'deleteTypesCompletedWork',
    group: ['ADMIN'],
    nameRole: 'Перемещение типа выполненных работ в архив',
  },
  {
    role: 'changeTypesCompletedWork',
    group: ['ADMIN'],
    nameRole: 'Изменение данных типа выполненных работ',
  },
  {
    role: 'getIncidentStatuses',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Получение списка активных статусов инцидента',
  },
  {
    role: 'changeIncidentStatuses',
    group: ['ADMIN'],
    nameRole: 'Измениние названия статусов инцидента',
  },
  {
    role: 'changeStateIncidentStatuses',
    group: ['ADMIN'],
    nameRole: 'Измениние порядка статусов инцидента',
  },
  {
    role: 'uploadFiles',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA'],
    nameRole: 'Загрузка актов',
  },
  {
    role: 'uploadAvatars',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA', 'FieldEngineers'],
    nameRole: 'Загрузка аватаров',
  },
  {
    role: 'getAvatar',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA', 'FieldEngineers'],
    nameRole: 'Получение аватара',
  },
  {
    role: 'deleteAvatar',
    group: ['ADMIN', 'Dispatcher', 'AdministrationCCA', 'FieldEngineers'],
    nameRole: 'Удаление аватара',
  },
  {
    role: 'changeUserAppOptions',
    group: [
      'ADMIN',
      'Dispatcher',
      'AdministrationCCA',
      'FieldEngineers',
      'Client',
    ],
    nameRole: 'Изменение настроек приложения',
  },
]
