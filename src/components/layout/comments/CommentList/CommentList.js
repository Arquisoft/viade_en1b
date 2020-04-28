import React from "react";
import Comment from "../comment/Comment";

export const CommentList = (props) => {
  const { comments } = props;
  const commentComponents = comments.map((comment, key) => {
    return (
      <Comment
        key={key}
        text={comment.text}
        author={comment.author}
        date={comment.dateCreated}
      ></Comment>
    );
  });
  return <div>{commentComponents}</div>;
};
export default CommentList;
