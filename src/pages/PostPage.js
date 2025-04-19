import React from "react";
import { useParams } from "react-router-dom";
import useHeaderStore from "../store/useHeaderStore";

const PostPage = () => {
  const headerHeight = useHeaderStore((state) => state.headerHeight);

  const { id } = useParams();

  return (
    <div className="lcontainer" style={{ marginTop: `${headerHeight}px` }}>
      <h1>Пост {id}</h1>
    </div>
  );
};

export default PostPage;
