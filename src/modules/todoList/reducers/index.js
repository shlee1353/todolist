import { ADDTODO, DELETETODO, MODIFYTODO, COMPLETETODO } from "../actions";

const todoList = (state = [], action) => {
  switch (action.type) {
    case ADDTODO:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          description: action.description,
          completed: false,
          option: {
            allowance: parseInt(Math.random()*10, 10) + 1,
          }
        }
      ];

    case DELETETODO:
      return state.filter(todo => todo.id !== action.id)

    // https://stackoverflow.com/questions/40096036/how-to-update-a-value-of-a-nested-object-in-a-reducer
    case MODIFYTODO:
      return state.map(todo => {
        if(todo.id === action.id) {
          return {
            ...todo, 
            option : {
              ...todo.option,
              allowance: action.allowance
            }
          }
        };
        return todo;
      });

    case COMPLETETODO:
      return state.map(todo => {
        if(todo.id === action.id) {
          return {
            ...todo, 
            completed : true
          }
        };
        return todo;
      });

    default:
      return state;
  }
}

export default todoList;