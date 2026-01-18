import { useContext, useState } from "react";
import { Button } from "../components/button/button";
import styles from "./login.module.css";
import { UserContext } from "../App";
import Requests from "../requests";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  // актиный юзер (глобальный контекст)
  const { activeUser, setActiveUser } = useContext(UserContext);

  // состояние "входимого" юзера
  const [loginedUser, setLoginedUser] = useState({
    login: "",
    password: "",
  });
  console.log("activeUser: ", activeUser);

  // обновить "входимого юзера". Передаем поле
  // (имя, пароль) и значение
  function uptateUser(field, value) {
    setLoginedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }

  async function enterUser() {
    const isUserExists = await Requests.checkLoginedUser(
      loginedUser.login,
      loginedUser.password
    );

    console.log(isUserExists);

    if (isUserExists) {
      localStorage.setItem("userWebshop", JSON.stringify(isUserExists));
      setActiveUser(isUserExists);
      navigate("/main");
    }
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
        </div>
      </form>
    </div>
  );
};
