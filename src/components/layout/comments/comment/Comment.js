import React from "react";

export default function Comment(props) {
  const { author, text, date } = props;
  return (
    <div>
      <p>{date}</p>
      <p>{text}</p>
      <h5>{author}</h5>
    </div>
  );
}
