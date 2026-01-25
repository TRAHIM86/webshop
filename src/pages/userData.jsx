import { useContext } from "react";
import { UserContext } from "../App";

export const UserData = () => {
  // актиный юзер (глобальный контекст)
  const { activeUser, setActiveUser } = useContext(UserContext);

  return (
    <div>
      <div>{activeUser.login}</div>
      <div>{activeUser.email}</div>
    </div>
  );
};
