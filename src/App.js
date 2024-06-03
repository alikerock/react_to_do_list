import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Todo from './Todo';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  //window.localStorage.setItem('name', '홍길동');
  //let test = window.localStorage.getItem('name')
  //const personObj = JSON.parse(test);  문자열 -> json 형식 객체 변환

  const[todo,setTodo] = useState([]);
  let [todoid, setTodoid] = useState(0);

  const getTodoList = ()=>{
    const todoListFromStorage = window.localStorage.getItem('todo');
    //console.log(todoListFromStorage);
    if(todoListFromStorage !== null){ //값이 있으면
      const todoObj = JSON.parse(todoListFromStorage);  
      // console.log(todoObj[todoObj.length-1].id);
      setTodo(todoObj)
      setTodoid(todoObj[todoObj.length-1].id);
    }
  }


  //getTodoList 최초 한번 실행,변수명 todo변경되면 실행된다.

  let deleteTodo = (id)=>{
    let newTodos = [...todo];
    let idx = newTodos.findIndex(item=>item.id === id);
    newTodos.splice(idx,1);
    setTodo(newTodos);
  }
  let todoUpdate = (id,value)=>{
    let newTodos = todo.map(item =>
      item.id === id ? { ...item, checked: value } : item
    );
    setTodo(newTodos);
  }
  let updateTodo = (id,text)=>{
    let newTodos = todo.map(item =>
      item.id === id ? { ...item, title: text } : item
    );
    setTodo(newTodos);
  }
  let todos = todo.map((item,idx)=><Todo key={idx} data={item} deleteTodo={deleteTodo} todoUpdate={todoUpdate} updateTodo={updateTodo}/>);
  let addTodo = (value)=>{
    let newtodo = value;
    let newTodos = [...todo];
    let newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({id:newId, title:newtodo, checked:false})
    setTodo(newTodos);
    document.querySelector('#todo').value = '';
  }
  const setStorage = ()=>{
    const todoStr = JSON.stringify(todo);
    window.localStorage.setItem('todo',todoStr);
  }
  useEffect(()=>{
   getTodoList();    
  },[]); //최초 한번만 작동

  useEffect(()=>{
    setStorage();
  },[todo]);//최초 한번, todo의 값이 변경되면 실행

  return (
    <div className="App">
      <h1>React to do list</h1>
      <Form className="d-flex w-100 align-items-end gap-3" onSubmit={(e)=>{
        e.preventDefault();
        addTodo(e.target.todo.value);
      }}>
        <Form.Group className="w-100" controlId="todo">
          <Form.Label>할일 입력</Form.Label>
          <Form.Control type="text" placeholder="입력하세요" />        
        </Form.Group>
        <Button variant="primary" type="submit">
         입력
        </Button>
      </Form>
      <hr/>
      <ul>
        {todos}
      </ul>

    </div>
  );
}

export default App;
