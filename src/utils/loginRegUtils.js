// вспомогательные функции для login и register

// чекнуть вернуть объект с полями валидации login и password
export function checkValidLoginPassword(field) {
  const isValidLetters = /^[a-zA-Z0-9]+$/.test(field);
  const isValidLength = /^.{3,10}$/.test(field);
  return { isValidLetters: isValidLetters, isValidLength: isValidLength };
}

// функция установить состояние
export function setFocusState(funcState, state) {
  funcState(state);
}

// вернуть { } валиден ли инпут и подсказку
export function showHints(clicked, focus, validLetters, validLength) {
  const isNotValidInput = clicked && !focus && (!validLetters || !validLength);
  const hint =
    clicked && !focus && !validLetters && !validLength
      ? "Only Latin letters and/or numbers from 3 to 10 characters"
      : clicked && !focus && !validLetters
        ? "Only Latin letters and/or numbers"
        : clicked && !focus && !validLength
          ? "From 3 to 10 characters"
          : "";

  return { isNotValidInput: isNotValidInput, hint: hint };
}
