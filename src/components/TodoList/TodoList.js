import React, { useState, useCallback } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, modifyTodo, completeTodo } from '../../modules/todoList/actions';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = props => {
    // const { todoList, handleAddTodo, handleDeleteTodo, handleModifyTodo, handleCompleteTodo } = props;

    const todoList = useSelector(state => state.todoList)
    const dispatch = useDispatch()

    const [toggle, settoggle] = useState(false);

    const handleToggle = () => {
        settoggle(!toggle);
    }

    const handleAddTodo = useCallback(({ id, title, description }) => {
        dispatch(addTodo({ id, title, description }));
    }, [])

    const handleDeleteTodo = useCallback( id => {
        dispatch(deleteTodo(id));
    },[])

    const handleModifyTodo = useCallback(({ id, allowance }) => {
        dispatch(modifyTodo({id, allowance}));
    }, [])

    const handleCompleteTodo = useCallback( id => {
        dispatch(completeTodo(id));
    },[])

    return (
        <div>
            <button onClick={handleToggle}>글쓰기</button>
            {toggle && <TodoForm onClickAddTodo={handleAddTodo} />}
            {todoList?.map(todo => (
                <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                allowances={todo.option.allowance}
                onClickDeleteTodo={handleDeleteTodo}
                onClickModifyTodo={handleModifyTodo}
                onClickCompleteTodo={handleCompleteTodo}
                />
            ))}
        </div>
    )
}

export default TodoList;

// const mapStateToProps = state => {
//     return {
//         todoList: state.todoList
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     handleAddTodo: ({ id, title, description }) => dispatch(addTodo({ id, title, description })),
//     handleDeleteTodo: id => dispatch(deleteTodo(id)),
//     handleModifyTodo: ({ id, allowance }) => dispatch(modifyTodo({id, allowance})),
//     handleCompleteTodo: id => dispatch(completeTodo(id))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
