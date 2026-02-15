// Ативные юзеры. Эти уже есть на 'сервере'. Можно длобавить любого нового.
// Можно также сначала заполнить корзину инкогнито, потом зарегиться и
// товары инкогнито добавяться к товарам юзера.

const users = [
  { id: 1, login: "qwe", email: "qwe@mail.ru", password: "qwe" },
  { id: 2, login: "asd", email: "asd@gmail.com", password: "asd" },
  { id: 5, login: "jjj", email: "jjj@j.jj", password: "jjj" },
  { id: 6, login: "nnn", email: "nnn@n.nn", password: "nnn" },
  { id: 7, login: "lll", email: "lll@l.ru", password: "lll" },
];

// Активные промокоды. Пока сделал '5' и '10' на 5% и 10% соответственно.
// Применяется на все товары. Допилю например промокоды по категориям.
// Например 'football' - будет скидка категорию football

const promoCodes = [
  { code: "5", discount: 5, categoryes: "all" },
  { code: "10", discount: 10, categoryes: "all" },
];
