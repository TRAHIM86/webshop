import React, { useState } from "react";

export const InputSearch = () => {
  const [searchStr, setSearchStr] = useState("");

  return (
    <input
      type="text"
      value={searchStr}
      placeholder="Search..."
      onChange={(e) => setSearchStr(e.target.value)}
    />
  );
};
