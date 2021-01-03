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
            allowance: parseInt(Math.random()*10, 10),
          }
        }
      ];

    case DELETETODO:
      const nextState = state.filter(todo => todo.id !== action.id);
      return nextState;

    // case MODIFYTODO:
    //   const modifiedIndex = state.findIndex(todo => todo.id === action.id);
    //   const modifiedArray = [...state];
    //   modifiedArray[modifiedIndex].option.allowance = action.allowance;
    //   return modifiedArray;

    case MODIFYTODO:
      return state.map(todo => {
        if(todo.id === action.id) {
          return {...todo, option : { allowance: action.allowance }}
        };
        return todo;
      })

    // case COMPLETETODO:
    //   const completedIndex = state.findIndex(todo => todo.id === action.id);
    //   const completedArray = [...state];
    //   completedArray[completedIndex].completed = true;
    //   return completedArray;

    case COMPLETETODO:
      return state.map(todo => {
        if(todo.id === action.id) {
          return {...todo, completed : true}
        };
        return todo;
      })

    default:
      return state;
  }
}

export default todoList;