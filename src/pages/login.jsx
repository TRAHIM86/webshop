import { useContext, useState } from "react";
import { Button } from "../components/button/button";
import { UserContext } from "../App";
import Requests from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styles from "./login.module.css";

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

  const isValidLoginLetters = /^[a-zA-Z0-9]+$/.test(loginedUser.login);
  const isValidLoginLength = /^.{3,10}$/.test(loginedUser.login);
  const isValidPassword = /^[a-zA-Z0-9]{3,10}$/.test(loginedUser.password);

  //состония фокуов на инпутах
  const [isFocusLogin, setFocusLogin] = useState(false);

  function focusLoginTrue() {
    setFocusLogin(true);
  }

  function focusLoginFalse() {
    setFocusLogin(false);
  }

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

  console.log("isLoginClicked: ", isLoginClicked);

  return (
    <div className={styles.loginPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.dataLogin}>
          <p>Login</p>{" "}
          <input
            // СОКРАТИТЬ!! ЧЕРЕЗ FUNC!!
            className={`${styles.loginInput} ${
              !isFocusLogin &&
              !isValidLoginLetters &&
              !isValidLoginLength &&
              isLoginClicked
                ? styles.loginInputNotValid
                : ""
            }`}
            type="text"
            value={loginedUser.login}
            placeholder="3-10 letters and/or numbers"
            autoComplete="username"
            onChange={(e) => uptateUser("login", e.target.value)}
            onFocus={() => {
              focusLoginTrue();
              setIsLoginClicked(true);
            }}
            onBlur={focusLoginFalse}
          />
          <div className={styles.errorValidation}>
            {" "}
            {!isFocusLogin && !isValidLoginLetters && !isValidLoginLength
              ? "Only Latin letters and from 3 to 10 characters"
              : !isFocusLogin && !isValidLoginLetters
                ? "Only Latin letters and/or numbers"
                : !isFocusLogin && !isValidLoginLength
                  ? "From 3 to 10 characters"
                  : ""}
          </div>
          <p>Password</p>{" "}
          <input
            className={styles.loginInput}
            type="password"
            value={loginedUser.password}
            placeholder="3-10 letters and/or numbers"
            autoComplete="password"
            onChange={(e) => uptateUser("password", e.target.value)}
          />
          <Button
            func={enterUser}
            disabled={!isValidLoginLetters || !isValidPassword}
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
          Register&#8594;
        </Link>
      </div>
    </div>
  );
};
