import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button/button";
import styles from "./register.module.css";
import { useContext, useEffect, useState } from "react";
import Requests from "../requests";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../App";

export const Register = () => {
  const navigate = useNavigate();

  // актиный юзер (глобальный контекст)
  const { setActiveUser } = useContext(UserContext);

  // состояние нового юзера
  const [user, setUser] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // очистить юзера
  function cleanUser() {
    setUser({
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  // мутация для регистрации
  const registerMutation = useMutation({
    mutationFn: async () => {
      const isUserUsed = await Requests.checkRegistredUser(
        user.login,
        user.email,
      );

      if (isUserUsed.loginUser || isUserUsed.emailUser) {
        console.log("Логин и/или email уже заняты! :", isUserUsed);
        return null;
      } else {
        const userData = await Requests.addNewUser(user);
        return userData;
      }
    },

    onSuccess: (userData) => {
      if (userData) {
        localStorage.setItem("userWebshop", JSON.stringify(userData));
        setActiveUser(userData);
        cleanUser();
        navigate("/main");
      }
    },
  });

  // зарегить нового юзера (с проверкой)
  async function addNewUserToServer() {
    registerMutation.mutate();
  }

  // обновление состояния (при вводе данных в поля)
  function updateUser(field, value) {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));

    // в зависисмости от field поменять поле
    // и проверить его на валидацию
    if (field === "login") {
      setIsValid((prev) => ({ ...prev, login: validateLogin(value) }));
    }
    if (field === "email") {
      setIsValid((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (field === "password") {
      setIsValid((prev) => ({
        ...prev,
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(user.confirmPassword, value),
      }));
    }
    if (field === "confirmPassword") {
      setIsValid((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, user.password),
      }));
    }
  }

  //********* ВАЛИДАЦИЯ *********/

  // состояние "все поля валидны"
  const [isValid, setIsValid] = useState({
    login: validateLogin(user.login),
    email: validateEmail(user.email),
    password: validatePassword(user.password),
    confirmPassword: validateConfirmPassword(
      user.confirmPassword,
      user.password,
    ),
  });

  useEffect(() => {
    setIsValid({
      login: validateLogin(user.login),
      email: validateEmail(user.email),
      password: validatePassword(user.password),
      confirmPassword: validateConfirmPassword(
        user.confirmPassword,
        user.password,
      ),
    });
  }, [user]);

  // валидация login
  function validateLogin(login) {
    return /^[a-zA-Z0-9]{3,10}$/.test(login);
  }

  // валидация на email
  function validateEmail(email) {
    //console.log(/^\S+@\S+\.\S+$/.test(email));
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // валидация на password
  function validatePassword(password) {
    return /^[a-zA-Z0-9]{3,10}$/.test(password);
  }

  // валидация на confirmPassword
  function validateConfirmPassword(confirmPassword, password) {
    return confirmPassword === password;
  }

  /*************************/

  return (
    <div>
      <form
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div>
          <div>
            <p>Login</p>
            <input
              type="text"
              value={user.login}
              placeholder="3-10 letters and/or numbers"
              onChange={(e) => updateUser("login", e.target.value)}
              autoComplete="userLogin"
            ></input>
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              value={user.email}
              onChange={(e) => updateUser("email", e.target.value)}
              placeholder="Your email"
              autoComplete="email"
            ></input>
          </div>
          <div>
            <p>Password</p>{" "}
            <input
              type="password"
              value={user.password}
              placeholder="3-10 letters and/or numbers"
              onChange={(e) => updateUser("password", e.target.value)}
              style={{ width: "100%" }}
              autoComplete="new-password"
            ></input>
          </div>
          <div>
            <p>Confirm password</p>
            <input
              type="password"
              value={user.confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => updateUser("confirmPassword", e.target.value)}
              autoComplete="new-password"
            ></input>
          </div>

          <Button
            type="submit"
            className={styles.btnRegister}
            func={() => addNewUserToServer()}
            disabled={
              !isValid.login ||
              !isValid.email ||
              !isValid.password ||
              !isValid.confirmPassword
            }
          >
            REGISTER
          </Button>
          <div>
            Already registered?
            <Link to="/login" className={styles.Loginlink}>
              Login&#8594;
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
