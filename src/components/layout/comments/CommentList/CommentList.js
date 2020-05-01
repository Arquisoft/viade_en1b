import React from "react";
import Comment from "../comment/Comment";
import style from "./CommentsList.module.css";

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
  return (
    <div className={style.comments} data-testid="comments">
      {commentComponents}
    </div>
  );
};
export default CommentList;
