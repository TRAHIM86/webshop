import { Link } from "react-router-dom";
import { Button } from "../components/button/button";
import styles from "./register.module.css";

export const Register = () => {
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
              placeholder="3-10 letters and/or numbers"
              autoComplete="userLogin"
            ></input>
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              placeholder="Your email"
              autoComplete="email"
            ></input>
          </div>
          <div>
            <p>Password</p>{" "}
            <input
              type="password"
              placeholder="6-10 letters and/or numbers"
              style={{ width: "100%" }}
              autoComplete="new-password"
            ></input>
          </div>
          <div>
            <p>Confirm password</p>
            <input
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
            ></input>
          </div>

          <Button type="submit">REGISTER</Button>
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
