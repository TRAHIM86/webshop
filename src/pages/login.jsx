import { Button } from "../components/button/button";
import styles from "./login.module.css";

export const Login = () => {
  return (
    <div>
      <form>
        <div>
          <input type="text" autoComplete="username" />
          <input type="password" autoComplete="password" />
          <Button>ENTER</Button>
        </div>
      </form>
    </div>
  );
};
