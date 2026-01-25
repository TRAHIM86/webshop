import { Link } from "react-router-dom";
import { Button } from "../components/button/button";
import styles from "./register.module.css";
import { useState } from "react";
import Requests from "../requests";

export const Register = () => {
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

  // зарегить нового юзера (с проверкой)
  async function addNewUser(newUser) {
    const isUserUse = await Requests.checkRegistredUser(
      newUser.login,
      newUser.email,
    );

    if (isUserUse.loginUser || isUserUse.emailUser) {
      console.log("Логин и/или email уже заняты! :", isUserUse);
      return;
    } else {
      console.log("FREE: ", isUserUse);
      await Requests.addNewUser(user);
      cleanUser();
    }
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

          <Button type="submit" func={() => addNewUser(user)}>
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
