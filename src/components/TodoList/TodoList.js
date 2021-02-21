import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, modifyTodo, completeTodo } from '../../modules/todoList/actions';
import Todo from './Todo';
import TodoForm from './TodoForm';
import axios from 'axios';

const TodoList = props => {
    // const { todoList, handleAddTodo, handleDeleteTodo, handleModifyTodo, handleCompleteTodo } = props;

    const todoList = useSelector(state => state.todoList)
    const dispatch = useDispatch()

    const [toggle, setToggle] = useState(false);
    const [radioValue, setRadioValue] = useState("all");
    const [isHidden, setIsHiddden] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [jsonData, setJsonData] = useState();
    const scrollRef = useRef(null);
    const [number, setNumber] = useState(0);
    const [count, setCount] = useState("Today's Date");


    // Lifecycle
    useEffect(() => {
        console.log("component did mount with useEffect!");
        return () => {
            console.log("I'm dying...");
        };
    }, [number]);

    // 1 - 10 숫자 생성
    const values = Array.from(Array(11).keys()).slice(1);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    // [DEV] 정규식 체크
    const checkDescription = (description) => {
        // 영문만 입력 가능
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
    // [DEV] // 정규식 체크

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

    // [DEV] checked 필터
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
    // [DEV] // checked 필터

    // [DEV] 엘리먼트 위치
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
    });
    // [DEV] // 엘리먼트 위치

    // [DEV] 비동기 데이터
    const getData = async () => {
        try {
            return await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        } catch (error) {
            console.error(error);
        }
    };

    const getJSON = async () => {
        const result = await getData();
        setJsonData(result.data)
    };
    // [DEV] // 비동기 데이터

    useEffect(() => {
        scrollRef.current.addEventListener('scroll', scrollHandler)
    }, []);

    // 날짜 시간
    const printNow = () => {
        const today = new Date();

        const dayNames = ['(일요일)', '(월요일)', '(화요일)', '(수요일)', '(목요일)', '(금요일)', '(토요일)'];

        const day = dayNames[today.getDay()];

        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let second = today.getSeconds();
        const ampm = hour >= 12 ? 'PM' : 'AM';

        hour %= 12;
        hour = hour || 12;

        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;

        const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;
        return now;
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCount(printNow());
        }, 1000);

        return () => clearTimeout(timeout);
    },[count]);

    return (
        <div>
            <div className="user_control">
                <div>{count}</div>
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
            {/* [DEV] https://jsonplaceholder.typicode.com/ 데이터 가공해서 제공 */}
            <div className="todo_api">
                <button onClick={getJSON}>api 호출</button>
                {jsonData && (
                    <div className="api_info">
                        <div>{jsonData.id}</div>
                        <div>{jsonData.title}</div>
                    </div>
                )}
            </div>
            <div>
                <h2>number is {number}</h2>
                <button
                    onClick={() => {
                    setNumber(number + 1);
                    }}
                >
                    Increment
                </button>
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
