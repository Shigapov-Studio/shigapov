import React from "react";
import { useParams } from "react-router-dom";

const PostPage = ({ headerHeight }) => {
  const { id } = useParams();

  return (
    <div style={{ marginTop: headerHeight }}>
      <h1>Пост {id}</h1>
    </div>
  );
};

export default PostPage;
