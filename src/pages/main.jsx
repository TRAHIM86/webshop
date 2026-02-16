import react from "react";

export const Main = ({ promoProduct }) => {
  return (
    <div>
      <h2>Main</h2>
      <div>{promoProduct ? promoProduct : ""}</div>
    </div>
  );
};
