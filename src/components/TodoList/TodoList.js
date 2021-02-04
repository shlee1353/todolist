import React, { useState, useCallback, useEffect, useRef } from 'react'
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
    const [isHidden, setIsHiddden] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const scrollRef = useRef(null);

    const values = Array.from(Array(11).keys()).slice(1);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const checkDescription = (description) => {
        // 영문만 가능
        const descriptionRegex = /^[a-zA-Z]+$/;
        return descriptionRegex.test(description);
    }

    const handleAddTodo = useCallback(({ id, title, description }) => {
        if(title && description && checkDescription(description)) {
            dispatch(addTodo({ id, title, description }));
        } else {
            alert('Check Your Title and Description!');
        }
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
        setIsHiddden(!isHidden);
    },[isHidden]);

    const handleCheckedItems = useCallback( e => {
        const currentValue = parseInt(e.target.value);
        const currentIndex = checkedItems.indexOf(currentValue);
        const newCheckedItems = [...checkedItems];

        if (currentIndex === -1) {
            newCheckedItems.push(currentValue);
        } else {
            newCheckedItems.splice(currentIndex, 1);
        }
        setCheckedItems(newCheckedItems);
    });

    const scrollHandler = useCallback(() => {
        console.log('-> Y절대위치', window.pageYOffset + scrollRef.current.getBoundingClientRect().top);

        console.log('innerHeight', window.innerHeight);

        console.log('offsetTop', scrollRef.current.offsetTop);
        console.log('scrollTop', scrollRef.current.scrollTop);

        // entire content & padding (visible or not)
        console.log('scrollHeight', scrollRef.current.scrollHeight);
        // visible content & padding
        console.log('clientHeight', scrollRef.current.clientHeight);
        // visible content & padding + border + scrollbar
        console.log('offsetHeight', scrollRef.current.offsetHeight);
    })

    useEffect(() => {
        scrollRef.current.addEventListener('scroll', scrollHandler)
    }, [])

    return (
        <div>
            <div className="user_control">
                <button onClick={handleToggle}>글쓰기</button>
                <div>
                    <label>
                        <input 
                            type="radio"
                            value="all"
                            name="filter"
                            checked={radioValue === "all"}
                            onChange={onRadioValueChange}
                        /> All
                    </label>
                    <label>
                        <input 
                            type="radio"
                            value="completed"
                            name="filter"
                            checked={radioValue === "completed"}
                            onChange={onRadioValueChange}
                        /> Completed
                    </label>
                </div>
                <div>
                    {values.map(value => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                value={value}
                                onChange={handleCheckedItems}
                            />{value}
                        </label>
                    ))}
                </div>
            </div>
            {/* [DEV] 필터 기능 추가 */}
            {toggle && <TodoForm onClickAddTodo={handleAddTodo} />}
            <div className="todo_wrap" ref={scrollRef}>
                {todoList?.map(todo => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        allowances={todo.option.allowance}
                        completed={todo.completed}
                        isHidden={isHidden}
                        checkedItems={checkedItems}
                        onClickDeleteTodo={handleDeleteTodo}
                        onClickModifyTodo={handleModifyTodo}
                        onClickCompleteTodo={handleCompleteTodo}
                    />
                ))}
            </div>
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
