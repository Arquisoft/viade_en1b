import React from "react";

export default function Comment(props) {
  const { author, text, date } = props;
  return (
    <div data-testid="comment">
      <p data-testid="date">{date}</p>
      <p data-testid="text">{text}</p>
      <h5 data-testid="author">{author}</h5>
    </div>
  );
}
