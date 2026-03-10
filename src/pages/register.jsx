import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button/button";
import { useContext, useEffect, useState } from "react";
import Requests from "../requests";
import { UserContext } from "../App";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styles from "./register.module.css";
import {
  checkValidLoginPassword,
  setFocusState,
  showHints,
} from "../utils/loginRegUtils";

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // актиный юзер (глобальный контекст)
  const { setActiveUser } = useContext(UserContext);

  // данные из state, если нету то на main
  // для обратного редиректа и передачи true
  const from = location.state?.from || "/main";
  const openReview = location.state?.openReview;

  // состояние нового юзера
  const [newUser, setNewUser] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // очистить юзера
  function cleanUser() {
    setNewUser({
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isEmailClicked, setIsEmailClicked] = useState(false);

  //состояния фокуcов на инпутах
  const [isFocusLogin, setFocusLogin] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);

  // мутация для регистрации
  const registerMutation = useMutation({
    mutationFn: async () => {
      const isUserUsed = await Requests.checkRegistredUser(
        newUser.login,
        newUser.email,
      );

      if (isUserUsed.loginUser || isUserUsed.emailUser) {
        console.log("Логин и/или email уже заняты! :", isUserUsed);
        return null;
      } else {
        const userData = await Requests.addNewUser(newUser);
        return userData;
      }
    },

    onSuccess: (userData) => {
      if (userData) {
        localStorage.setItem("userWebshop", JSON.stringify(userData));
        setActiveUser(userData);
        cleanUser();
        // редирект на from и state если он есть
        console.log("from: ", from, "openReview :", openReview);
        navigate(from, { state: openReview ? { openReview } : undefined });
      }
    },
  });

  // зарегить нового юзера (с проверкой)
  async function addNewUserToServer() {
    registerMutation.mutate();
  }

  // обновление состояния (при вводе данных в поля)
  function updateUser(field, value) {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }

  //********* ВАЛИДАЦИЯ *********/

  const isValidLogin = checkValidLoginPassword(newUser.login);
  const isValidEmail = validateEmail(newUser.email);
  const isValidPassword = checkValidLoginPassword(newUser.password);
  const isValidConfirmPassword = validateConfirmPassword(
    newUser.confirmPassword,
    newUser.password,
  );

  const isValidAllFields =
    isValidLogin.isValidLetters &&
    isValidLogin.isValidLength &&
    isValidPassword.isValidLetters &&
    isValidPassword.isValidLength;

  const validLogin = showHints(
    isLoginClicked,
    isFocusLogin,
    isValidLogin.isValidLetters,
    isValidLogin.isValidLength,
  );

  const validEmail = {
    isNotValidInput: isEmailClicked && !isFocusEmail && !isValidEmail,
    hint: "Please write correct email",
  };

  console.log(validEmail.isNotValidInput);

  const validPassword = showHints(
    isPasswordClicked,
    isFocusPassword,
    isValidPassword.isValidLetters,
    isValidPassword.isValidLength,
  );

  // валидация на email
  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // валидация на confirmPassword
  function validateConfirmPassword(confirmPassword, password) {
    return confirmPassword === password;
  }

  /*************************/

  return (
    <div className={styles.registerPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.dataRegister}>
          <p>Login</p>
          <input
            className={`${styles.input} ${
              validLogin.isNotValidInput ? styles.inputNotValid : ""
            }`}
            type="text"
            value={newUser.login}
            placeholder="3-10 Latin letters and/or numbers"
            onChange={(e) => updateUser("login", e.target.value)}
            autoComplete="userLogin"
            onFocus={() => {
              setFocusState(setFocusLogin, true);
              setIsLoginClicked(true);
            }}
            onBlur={() => {
              setFocusState(setFocusLogin, false);
            }}
          ></input>
          <p>Email</p>
          <input
            className={`${styles.input} ${
              validEmail.isNotValidInput ? styles.inputNotValid : ""
            }`}
            type="email"
            value={newUser.email}
            onChange={(e) => updateUser("email", e.target.value)}
            placeholder="Your email"
            autoComplete="email"
            onFocus={() => {
              setFocusState(setFocusEmail, true);
              setIsEmailClicked(true);
            }}
            onBlur={() => {
              setFocusState(setFocusEmail, false);
            }}
          ></input>
          <p>Password</p>{" "}
          <input
            className={`${styles.input} ${
              validPassword.isNotValidInput ? styles.inputNotValid : ""
            }`}
            type="password"
            value={newUser.password}
            placeholder="3-10 Latin letters and/or numbers"
            onChange={(e) => updateUser("password", e.target.value)}
            style={{ width: "100%" }}
            autoComplete="new-password"
            onFocus={() => {
              setFocusState(setFocusPassword, true);
              setIsPasswordClicked(true);
            }}
            onBlur={() => {
              setFocusState(setFocusPassword, false);
            }}
          ></input>
          <p>Confirm password</p>
          <input
            className={`${styles.input} ${
              !isValidConfirmPassword ? styles.inputNotValid : ""
            }`}
            type="password"
            value={newUser.confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => updateUser("confirmPassword", e.target.value)}
            autoComplete="new-password"
          ></input>
          <Button
            type="submit"
            className={styles.btnRegister}
            func={() => addNewUserToServer()}
            disabled
          >
            REGISTER
          </Button>
        </div>
      </form>

      <div>
        Already registered?
        <Link to="/login" className={styles.Loginlink}>
          {" "}
          Login&#8594;
        </Link>
      </div>
    </div>
  );
};
