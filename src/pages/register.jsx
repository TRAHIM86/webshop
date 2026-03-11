import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button/button";
import { useContext, useState } from "react";
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
import { InputLogReg } from "../components/imputLogReg/inputLogReg";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // актиный юзер (глобальный контекст)
  const { setActiveUser } = useContext(UserContext);

  //состояния скрыть пароль
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  function hideField(setField) {
    setField((prev) => !prev);
  }

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
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [isConfirmPasswordClicked, setIsConfirmPasswordClicked] =
    useState(false);

  //состояния фокуcов на инпутах
  const [isFocusLogin, setFocusLogin] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isFocusConfirmPassword, setFocusConfirmPassword] = useState(false);

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

  // валидация на email
  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // валидация на confirmPassword
  function validateConfirmPassword(confirmPassword, password) {
    return confirmPassword === password;
  }

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
    isValidPassword.isValidLength &&
    isValidEmail &&
    isValidConfirmPassword;

  const notValidLogin = showHints(
    isLoginClicked,
    isFocusLogin,
    isValidLogin.isValidLetters,
    isValidLogin.isValidLength,
  );

  const notValidEmail = {
    isNotValidInput: isEmailClicked && !isFocusEmail && !isValidEmail,
    hint:
      isEmailClicked && !isFocusEmail && !isValidEmail
        ? "Please write correct email"
        : "",
  };

  const notValidPassword = showHints(
    isPasswordClicked,
    isFocusPassword,
    isValidPassword.isValidLetters,
    isValidPassword.isValidLength,
  );

  const notValidConfirmPassword = {
    isNotValidInput:
      isConfirmPasswordClicked &&
      !isFocusConfirmPassword &&
      !isValidConfirmPassword,
    hint:
      isConfirmPasswordClicked &&
      !isFocusConfirmPassword &&
      !isValidConfirmPassword
        ? "The passwords don't match"
        : "",
  };

  /*************************/

  return (
    <div className={styles.registerPage}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.dataRegister}>
          <p>Login</p>
          <InputLogReg
            value={newUser.login}
            notValidObj={notValidLogin}
            type="text"
            placeholder="3-10 Latin letters and/or numbers"
            field="login"
            funcOnchange={updateUser}
            funcsOnFocus={[
              () => setFocusState(setFocusLogin, true),
              () => setIsLoginClicked(true),
            ]}
            funcsOnBlur={[() => setFocusState(setFocusLogin, false)]}
          ></InputLogReg>
          <div className={styles.errorValidation}>{notValidLogin.hint}</div>
          <p>Email</p>
          <InputLogReg
            value={newUser.email}
            notValidObj={notValidEmail}
            type="email"
            placeholder="Your email"
            field="email"
            funcOnchange={updateUser}
            funcsOnFocus={[
              () => setFocusState(setFocusEmail, true),
              () => setIsEmailClicked(true),
            ]}
            funcsOnBlur={[() => setFocusState(setFocusEmail, false)]}
          />
          <div className={styles.errorValidation}>{notValidEmail.hint}</div>
          <p>Password</p>{" "}
          <InputLogReg
            value={newUser.password}
            notValidObj={notValidPassword}
            type={hidePassword ? "password" : "text"}
            placeholder="3-10 Latin letters and/or numbers"
            field="password"
            funcOnchange={updateUser}
            funcsOnFocus={[
              () => setFocusState(setFocusPassword, true),
              () => setIsPasswordClicked(true),
            ]}
            funcsOnBlur={[() => setFocusState(setFocusPassword, false)]}
          >
            {hidePassword ? (
              <Eye
                className={styles.eye}
                onClick={() => hideField(setHidePassword)}
              />
            ) : (
              <EyeClosed
                className={styles.eye}
                onClick={() => hideField(setHidePassword)}
              />
            )}
          </InputLogReg>
          <div className={styles.errorValidation}>{notValidPassword.hint}</div>
          <p>Confirm password</p>
          <InputLogReg
            value={newUser.confirmPassword}
            notValidObj={notValidConfirmPassword}
            type={hideConfirmPassword ? "password" : "text"}
            placeholder="Confirm password"
            field="confirmPassword"
            funcOnchange={updateUser}
            funcsOnFocus={[
              () => setFocusState(setFocusConfirmPassword, true),
              () => setIsConfirmPasswordClicked(true),
            ]}
            funcsOnBlur={[() => setFocusState(setFocusConfirmPassword, false)]}
          >
            {" "}
            {hideConfirmPassword ? (
              <Eye
                className={styles.eye}
                onClick={() => hideField(setHideConfirmPassword)}
              />
            ) : (
              <EyeClosed
                className={styles.eye}
                onClick={() => hideField(setHideConfirmPassword)}
              />
            )}
          </InputLogReg>
          <div className={styles.errorValidation}>
            {notValidConfirmPassword.hint}
          </div>
          <Button
            type="submit"
            className={styles.btnRegister}
            func={() => addNewUserToServer()}
            disabled={!isValidAllFields}
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
