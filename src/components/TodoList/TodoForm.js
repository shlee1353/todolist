import React, { useState } from 'react'

const TodoForm = ({ onClickAddTodo }) =>  {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onClickAddTodoHandler = () => {
        onClickAddTodo({id: Math.random()*10, title, description});
        setTitle("");
        setDescription("");
    }

    const onChangeTitleHandler = event => {
        setTitle(event.target.value);
    }

    const onChangeDescriptionHandler = event => {
        setDescription(event.target.value);
    }

    return (
        <div className="todo_form">
            <input onChange={onChangeTitleHandler} value={title} placeholder="제목"/>
            <textarea onChange={onChangeDescriptionHandler} value={description} placeholder="설명"/>
            <button onClick={onClickAddTodoHandler}>추가</button>
        </div>
    )
}

export default TodoForm;
