import React, { useEffect, useState } from "react";

const Todo = ({ id, title, description, allowances, completed, isHidden, checkedItems, onClickDeleteTodo, onClickModifyTodo, onClickCompleteTodo }) => {
  const [allowance, setAllowance] = useState("");

  useEffect(() => {
    setAllowance(allowances);
  }, [allowances])

  const onChangeAllowanceHandler = event => {
    setAllowance(event.target.value);
  }

  return (
    <div 
      className={`todo ${completed ? 'completed' : ''} ${(!completed && isHidden) || (checkedItems.length > 0 && !checkedItems.includes(allowances)) ? 'hidden':''}`}
    >
      <div className="title">제목: {title}</div>
      <div className="desc">설명: {description}</div>
      <div>
        용돈(수정가능): <input onChange={onChangeAllowanceHandler} value={allowance}/>
      </div>
      <button onClick={() => onClickDeleteTodo(id)}>삭제</button>
      <button onClick={() => onClickModifyTodo({id, allowance})}>수정</button>
      <button onClick={() => onClickCompleteTodo(id)}>완료</button>
    </div>
  );
};

export default Todo;