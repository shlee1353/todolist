export const ADDTODO = "todoList/ADDTODO";
export const DELETETODO = "todoList/DELETETODO";
export const MODIFYTODO = "todoList/MODIFYTODO";
export const COMPLETETODO = "todoList/COMPLETETODO";

export const addTodo = ({ id, title, description }) => ({
  type: ADDTODO,
  id,
  title,
  description
});

export const deleteTodo = id => ({
  type: DELETETODO,
  id
});

export const modifyTodo = ({ id, allowance }) => ({
  type: MODIFYTODO,
  id,
  allowance
});

export const completeTodo = id => ({
  type: COMPLETETODO,
  id
});