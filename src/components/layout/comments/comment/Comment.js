import React from "react";
import style from "./Comment.module.css";

export default function Comment(props) {
  const { author, text, date } = props;
  return (
    <div data-testid="comment" className={style.comment}>
      <span className={style.metadata}>
        <p className={style.date} data-testid="date">
          {date}
        </p>
        <p className={style.author} data-testid="author">
          {author}
        </p>
      </span>
      <p className={style.text} data-testid="text">
        {text}
      </p>
    </div>
  );
}
