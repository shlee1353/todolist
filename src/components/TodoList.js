import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../modules/todoList/actions';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = props => {
    const { todoList, handleAddTodo, handleDeleteTodo } = props;
    const [toggle, settoggle] = useState(false);

    const handleToggle = () => {
        settoggle(!toggle);
    }

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
                onClickDeleteTodo={handleDeleteTodo}
                />
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        todoList: state.todoList
    };
};

const mapDispatchToProps = dispatch => ({
    handleAddTodo: ({ id, title, description }) => dispatch(addTodo({ id, title, description })),
    handleDeleteTodo: id => dispatch(deleteTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
