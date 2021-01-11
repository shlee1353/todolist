import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, modifyTodo, completeTodo } from '../../modules/todoList/actions';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = props => {
    // const { todoList, handleAddTodo, handleDeleteTodo, handleModifyTodo, handleCompleteTodo } = props;

    const todoList = useSelector(state => state.todoList)
    const dispatch = useDispatch()

    const [toggle, setToggle] = useState(false);
    const [radioValue, setRadioValue] = useState("all");
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleAddTodo = useCallback(({ id, title, description }) => {
        dispatch(addTodo({ id, title, description }));
    }, []);

    const handleDeleteTodo = useCallback( id => {
        dispatch(deleteTodo(id));
    },[]);

    const handleModifyTodo = useCallback(({ id, allowance }) => {
        dispatch(modifyTodo({id, allowance}));
    }, []);

    const handleCompleteTodo = useCallback( id => {
        dispatch(completeTodo(id));
    },[]);

    const onRadioValueChange = useCallback( e => {
        setRadioValue(e.target.value);
        setIsVisible(!isVisible);
    });

    return (
        <div>
            <div className="user_control">
                <button onClick={handleToggle}>글쓰기</button>
                <div>
                    <label htmlFor="all">
                        <input 
                            type="radio"
                            id="all"
                            value="all"
                            name="filter"
                            checked={radioValue === "all"}
                            onChange={onRadioValueChange}
                        /> All
                    </label>
                    <label htmlFor="completed">
                        <input 
                            type="radio"
                            id="completed"
                            value="completed"
                            name="filter"
                            checked={radioValue === "completed"}
                            onChange={onRadioValueChange}
                        /> Completed
                    </label>
                </div>
            </div>
            {/* [DEV] 필터 기능 추가 */}
            {toggle && <TodoForm onClickAddTodo={handleAddTodo} />}
            {todoList?.map(todo => (
                <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                allowances={todo.option.allowance}
                completed={todo.completed}
                isVisible={isVisible}
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
