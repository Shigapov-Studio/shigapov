import React from "react";
import useHeaderStore from "../store/useHeaderStore";

const Contacts = () => {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  return (
    <div className="lcontainer" style={{ marginTop: headerHeight }}>
      <h1>Контакты</h1>
      <p>Здесь вы найдете контактную информацию.</p>
    </div>
  );
};

export default Contacts;
  