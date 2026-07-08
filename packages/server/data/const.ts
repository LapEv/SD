export const mailConst = {
  mailMessages: {
    footer:
      'Данное сообщение отправлено автоматически, не надо на него отвечать.',
    Incidents: {
      titleRegistration: 'Уведомление о регистрации обращения под номером ',
      titleChangeStatus:
        'Уведомление об изменении статуса инцидента под номером ',
      addRequest: 'Зарегистровано обращение:',
      changeStatus1: 'По инциденту',
      changeStatus2: 'изменен статус:',
      client: 'Наименование клиента:',
      legalName: 'Клиент:',
      clientINC: 'Номер заявки клиента:',
      object: 'Наименование объекта:',
      objectClientID: 'Клиентский ID объекта:',
      objectClientName: 'Клиентское название объекта:',
      address: 'Адрес объекта:',
      equipment: 'Классификатор оборудования:',
      model: 'Модель оборудования:',
      malfunction: 'Неисправность:',
      status: 'Статус:',
      timeRegistration: 'Время регистрации (MSK):',
      timeChangeStatus: 'Время изменения статуса (MSK):',
      timeSLA: 'Крайний срок выполнения (MSK):',
      description: 'Описание проблемы:',
      commentCloseCheck: 'Комментарий к закрытию:',
      applicant: 'Заявитель:',
      applicantContacts: 'Контакты заявителя:',
      userAccepted: 'Принял:',
      typeCompletedWork: 'Тип выполненных работ:',
    },
  },
}

export const AppConst = {
  numberINC: 0,
  incident: '',
  attrINC: 'INC',
  numberDigit: 9,
  startINC: 23221,
  daysForClose: 30,
  ActionComment: {
    incidentRegistration: 'Зарегистрирован инцидент под номером ',
    changeExecutor: {
      first: 'Для инцидента под номером ',
      second: ' изменен исполнитель ',
    },
    changeResponsible: {
      first: 'Для инцидента под номером ',
      second: ' изменен ответственный ',
    },
    changeStatus: {
      first: 'Для инцидента под номером ',
      second: ' изменен статус ',
    },
    closeINC: `Инциденту автоматически присвоен статус "Закрыт" по истечению срока`,
  },
  Statuses: {
    registered: 'Зарегистрирован',
    inWork: 'В работе',
    waitingZIPequipment: 'Ожидание ЗИП/оборудования',
    resolved: 'Решён',
    closed: 'Закрыт',
  },
  path: {
    files: 'Files',
    incidentsActs: 'IncidentsActs',
  },
  fileNotification: {
    addFile: 'Файл был добавлен!',
    addFileError: 'Ошибка при записи файла! ',
    addDir: 'Папка была создана!',
    addFolderError: 'Ошибка при создании папки!',
    errorFileExists: 'Такой файл уже существует!',
    getFiles: 'Список файлов подготовлен!',
    getFilesError: 'Ошибка при создании списка файлов!',
    getFile: 'Файл получен!',
    getFileError: 'Ошибка при получении файла!',
  },
  fileDirectories: {
    Avatar: 'Avatar',
    IncidentActs: 'IncidentActs',
  },
  mailNotifications: {
    errors: {
      auth: 'Проблема с учетными данными почтового серевера, либо их отсутствие',
      send: 'Ошибка отправки уведомления на email!',
    },
    successSend: 'Уведомление на почту отправлено успешно.',
  },
}
