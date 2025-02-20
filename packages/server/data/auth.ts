export const auth = {
  passwordMinLength: 5,
  passwordMaxLength: 30,
  username: 'username',
  emptyUsername: 'The user name cannot be empty',
  password: 'password',
  checkPassword() {
    return `The password must be at least ${this.passwordMinLength} and no more than ${this.passwordMaxLength} characters`
  },
  notification: {
    userNotFound: 'Пользователь не найден!',
    errorRegistration: 'Ошибка при регистрации!',
    errorValidation: 'Ошибка валидации пароля!',
    duplicateUser: 'Пользователь с таким именем уже существует!',
    successfulRegistration: 'Пользователь успешно зарегистрирован!',
    notLogged: 'Пользователь не авторизован!',
    invalidPassword: 'Введен неверный пароль!',
    invalidOldPassword: 'Введен неверный старый пароль!',
    errorChangePassword: 'Ошибка смены пароля!',
    loginError: 'Ошибка входа в систему',
    getUsers: 'Ошибка получения списка пользователей',
    getRoles: 'Ошибка получения списка ролей',
    errorNewRole: 'Error when creating a new role',
    duplicatRole: 'Роль с таким названием уже существует!',
    successfulRole: 'Роль была успешно добавлена!',
    delRoleError: 'Ошибка при удалении роли',
    updateUser: 'Пользователь обновлен!',
    updateUserError: 'Ошибка при изменении данных пользователя!',
    findUser: 'Пользователь найден!',
    findUserError: 'Ошибка при поиске данных пользователя!',
  },
}

export const incidents = {
  notification: {},
}
