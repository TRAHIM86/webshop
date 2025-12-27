import react from "react";

export const Button = ({ children, func }) => {
  return <button onClick={func}>{children}</button>;
};
