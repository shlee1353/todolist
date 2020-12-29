import React from "react";

const Todo = ({ id, title, description, onClickDeleteTodo }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <button onClick={() => onClickDeleteTodo(id)}>삭제</button>
    </div>
  );
};

export default Todo;