export const ADDTODO = "todoList/ADDTODO";
export const DELETETODO = "todoList/DELETETODO";

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