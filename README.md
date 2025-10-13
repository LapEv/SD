## Sevice Desk

Это копия работающего Sevice Desk для одной сервисной организации, который продолжает развиваться. Решены базовые задачи по работе с входящими инцидентами от пользователей клиентов, с которыми заключены контракты.

Посмотреть и потестировать можно здесь :link: [SDtest](https://www.sdtest.sb-i.ru)  
Логин: Admin  
Пароль: qwe123QWE

---

### Используемые технологии

:heavy_minus_sign: Frontend: `React`, `Typescript`, `Redux`, `Redux Toolkit`, `Material-UI`, `Axios`, `MUI Datatables`, `React Hook Forms`, `React Roter Dom`  
:heavy_minus_sign: Backend: `Node.js`, `Express`, `JWT`, `NodeMailer`, `Mail parser`  
:heavy_minus_sign: Database: `Postgres`, `Sequelize`  
:heavy_minus_sign: DevOps: `Docker`, `Nginx`  
:heavy_minus_sign: Инструменты: `Eslint`, `Prettier`, `Lefthook`

---

### Что умеет на данный момент?

1. **Работа с инцидентами**  
   :heavy_check_mark: Регистрация, корректировка инцидентов.  
   :heavy_check_mark: Автоматическая регистрация заявок из почты.  
   :heavy_check_mark: Учет времени SLA.  
   :heavy_check_mark: Работа со статусами, уведомления о смене статуса, закрытие с вложениями.  
   :heavy_check_mark: Назачение ответственных сотрудников.  
   :heavy_check_mark: Печать заданий.  
   :heavy_check_mark: Получение отчётов в csv.  
   :heavy_check_mark: Фильтрация, сортировка.  
   :heavy_check_mark: Работа с типами работ.  
   :heavy_check_mark: Логирование.
   :heavy_minus_sign: Создание, перенаправление заданий на смежные поразделения.  
   :heavy_minus_sign: Интеграция с модулями **"Склад"** и **"Инженерская"**

![Incidents](https://github.com/LapEv/SD/blob/main/img/incidents.png)

2. **Клиенты**  
   :heavy_check_mark: Создание, редактирование, удаление клиента.  
   :heavy_check_mark: Создание, редактирование, удаление контракта.  
   :heavy_check_mark: Создание, редактирование, удаление объектов и адресов.  
   :heavy_check_mark: Привязка к конкретному контракту классификатора, объектов и адресов, уровней сервиса.

![Clients](https://github.com/LapEv/SD/blob/main/img/clients.png)

3. **Классификатор**  
   :heavy_check_mark: Создание, редактирование, удаление классификатора с моделями и типовыми неисправностями для последующего применения их к контрактам.

![Classifier](https://github.com/LapEv/SD/blob/main/img/сlassifier.png)

4. **Уровни сервиса**  
   :heavy_check_mark: Создание, редактирование, удаление SLA и OLA для последующего применения их к контрактам.

![ServiceLevels](https://github.com/LapEv/SD/blob/main/img/serviceLevels.png)

5. **Пользователи**  
   :heavy_check_mark: Создание, редактирование, удаление (увольнение) пользователей.  
   :heavy_check_mark: Создание, редактирование, удаление ролей и их групп.  
   :heavy_check_mark: Создание, редактирование, удаление отделов, подразделений.

![Users](https://github.com/LapEv/SD/blob/main/img/users.png)

6. **Профиль**  
   :heavy_check_mark: Редактирование данных пользователя.  
   :heavy_check_mark: Выбор темы.

![Profile](https://github.com/LapEv/SD/blob/main/img/profile.png)

---

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

---

## Автор

**Евгений Лапкин**

- GitHub: [@LapEv](https://github.com/LapEv)
- Email: e_lap@mail.ru
- Telegram: [@LapEv](https://t.me/LapEv)
