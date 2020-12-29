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
        <div>
            <input onChange={onChangeTitleHandler} value={title}/>
            <textarea onChange={onChangeDescriptionHandler} value={description}/>
            <button onClick={()=> onClickAddTodo({id: Math.random()*10, title, description})}>추가</button>
        </div>
    )
}

export default TodoForm
