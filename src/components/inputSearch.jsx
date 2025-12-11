import React, { useState } from "react";

export const InputSearch = ({ searchStr, setSearchStr }) => {
  return (
    <input
      type="text"
      value={searchStr}
      placeholder="Search..."
      onChange={(e) => setSearchStr(e.target.value)}
    />
  );
};
