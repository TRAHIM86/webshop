import { useContext, useState } from "react";
import { Button } from "../components/button/button";
import { UserContext } from "../App";
import Requests from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styles from "./login.module.css";
import {
  checkValidLoginPassword,
  showHints,
  setFocusState,
} from "../utils/loginRegUtils";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // актиный юзер (глобальный контекст)
  const { setActiveUser } = useContext(UserContext);

  // данные из state, если нету то на main
  // для обратного редиректа и передачи true
  const from = location.state?.from || "/main";
  const openReview = location.state?.openReview;

  // состояние "входимого" юзера
  const [loginedUser, setLoginedUser] = useState({
    login: "",
    password: "",
  });

  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);

  //состояния фокуcов на инпутах
  const [isFocusLogin, setFocusLogin] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);

  const isValidLogin = checkValidLoginPassword(loginedUser.login);
  const isValidPassword = checkValidLoginPassword(loginedUser.password);
  const isValidAllFields =
    isValidLogin.isValidLetters &&
    isValidLogin.isValidLength &&
    isValidPassword.isValidLetters &&
    isValidPassword.isValidLength;

  const notValidLogin = showHints(
    isLoginClicked,
    isFocusLogin,
    isValidLogin.isValidLetters,
    isValidLogin.isValidLength,
  );

  const notValidPassword = showHints(
    isPasswordClicked,
    isFocusPassword,
    isValidPassword.isValidLetters,
    isValidPassword.isValidLength,
  );

  // мутация для логина
  const loginMutation = useMutation({
    mutationFn: () =>
      Requests.checkLoginedUser(loginedUser.login, loginedUser.password),
    onSuccess: (userData) => {
      if (userData) {
        localStorage.setItem("userWebshop", JSON.stringify(userData));
        setActiveUser(userData);

        // редирект на from и state если он есть
        navigate(from, { state: openReview ? { openReview } : undefined });
      }
    },
  });

  function enterUser() {
    loginMutation.mutate();
  }

  // обновить "входимого юзера". Передаем поле
  // (имя, пароль) и значение
  function uptateUser(field, value) {
    setLoginedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }

  return (
    <div className={styles.loginPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.dataLogin}>
          <p>Login</p>{" "}
          <input
            className={`${styles.input} ${
              notValidLogin.isNotValidInput ? styles.inputNotValid : ""
            }`}
            type="text"
            value={loginedUser.login}
            placeholder="3-10 Latin letters and/or numbers"
            autoComplete="username"
            onChange={(e) => uptateUser("login", e.target.value)}
            onFocus={() => {
              setFocusState(setFocusLogin, true);
              setIsLoginClicked(true);
            }}
            onBlur={() => {
              setFocusState(setFocusLogin, false);
            }}
          />
          <div className={styles.errorValidation}>{notValidLogin.hint}</div>
          <p>Password</p>{" "}
          <input
            className={`${styles.input} ${
              notValidPassword.isNotValidInput ? styles.inputNotValid : ""
            }`}
            type="password"
            value={loginedUser.password}
            placeholder="3-10 Latin letters and/or numbers"
            autoComplete="password"
            onChange={(e) => uptateUser("password", e.target.value)}
            onFocus={() => {
              setFocusState(setFocusPassword, true);
              setIsPasswordClicked(true);
            }}
            onBlur={() => {
              setFocusState(setFocusPassword, false);
            }}
          />
          <div className={styles.errorValidation}>{notValidPassword.hint}</div>
          <Button
            func={enterUser}
            disabled={!isValidAllFields}
            className={styles.btnLogin}
          >
            ENTER
          </Button>
          {loginMutation.isSuccess &&
            (loginMutation.data === null ||
              loginMutation.data === undefined) && (
              <div className={styles.error}>Incorrect data</div>
            )}
        </div>
      </form>
      <div className={styles.loginBlockLink}>
        Don't have an account?
        <Link className={styles.registerLink} to="/register">
          {" "}
          Register&#8594;
        </Link>
      </div>
    </div>
  );
};
