import React, { useState } from 'react'

const TodoForm = ({ onClickAddTodo }) =>  {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
            <button onClick={()=> onClickAddTodo({id: Math.floor(((Math.random()*10).toFixed(2))*100), title, description})}>추가</button>
        </div>
    )
}

export default TodoForm
