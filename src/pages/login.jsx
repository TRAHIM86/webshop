import { useContext, useState } from "react";
import { Button } from "../components/button/button";
import styles from "./login.module.css";
import { UserContext } from "../App";
import Requests from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const Login = () => {
  const navigate = useNavigate();

  // актиный юзер (глобальный контекст)
  const { setActiveUser } = useContext(UserContext);

  // состояние "входимого" юзера
  const [loginedUser, setLoginedUser] = useState({
    login: "",
    password: "",
  });

  // мутация для логина
  const loginMutation = useMutation({
    mutationFn: () =>
      Requests.checkLoginedUser(loginedUser.login, loginedUser.password),
    onSuccess: (userData) => {
      if (userData) {
        localStorage.setItem("userWebshop", JSON.stringify(userData));
        setActiveUser(userData);
        navigate("/main");
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
    <div>
      <form>
        <div className={styles.dataLogin}>
          <input
            type="text"
            value={loginedUser.login}
            autoComplete="username"
            onChange={(e) => uptateUser("login", e.target.value)}
          />
          <input
            type="password"
            value={loginedUser.password}
            autoComplete="password"
            onChange={(e) => uptateUser("password", e.target.value)}
          />
          <Button func={enterUser}>ENTER</Button>
          {loginMutation.isSuccess &&
            (loginMutation.data === null ||
              loginMutation.data === undefined) && (
              <div className={styles.error}>Incorrect data</div>
            )}
        </div>

        <div className={styles.loginBlockLink}>
          Don't have an account?
          <Link className={styles.registerLink} to="/register">
            Register&#8594;
          </Link>
        </div>
      </form>
    </div>
  );
};
