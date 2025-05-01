import React from "react";
import useHeaderStore from "../store/useHeaderStore";

const Policy = () => {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <div className="lcontainer" style={{ marginTop: headerHeight }}>
      <h1>Политика конфиденциальности</h1>
      <p>Здесь будет политика конфиденциальности</p>
    </div>
  );
};

export default Policy;