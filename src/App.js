import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState,useCallback } from 'react';
import Todo from './Todo';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [todo, setTodo] = useState([]);
  const [todoid, setTodoid] = useState(0);

  const getTodoList = () => {
    const todoListFromStorage = window.localStorage.getItem('todo');
    if (todoListFromStorage !== null && todoListFromStorage !== '[]') { // 값이 있으면
      const todoObj = JSON.parse(todoListFromStorage);
      setTodo(todoObj);
      setTodoid(todoObj[todoObj.length - 1].id);
    }
  };

  const setStorage = useCallback(() => {
    const todoStr = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoStr);
  }, [todo]);

  useEffect(() => {
    getTodoList();
  }, []); // 최초 한 번만 실행

  useEffect(() => {
    setStorage();
  }, [todo]); // todo가 변경될 때마다 실행

  const deleteTodo = (id) => {
    const newTodos = todo.filter(item => item.id !== id);
    setTodo(newTodos);
  };

  const todoUpdate = (id, value) => {
    const newTodos = todo.map(item =>
      item.id === id ? { ...item, checked: value } : item
    );
    setTodo(newTodos);
  };

  const updateTodo = (id, text) => {
    const newTodos = todo.map(item =>
      item.id === id ? { ...item, title: text } : item
    );
    setTodo(newTodos);
  };

  const addTodo = (value) => {
    const newtodo = value;
    const newTodos = [...todo];
    const newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({ id: newId, title: newtodo, checked: false });
    setTodo(newTodos);
    document.querySelector('#todo').value = '';
  };

  const todos = todo.map((item, idx) => (
    <Todo key={idx} data={item} deleteTodo={deleteTodo} todoUpdate={todoUpdate} updateTodo={updateTodo} />
  ));

  return (
    <div className="App">
      <h1>React to do list</h1>
      <Form className="d-flex w-100 align-items-end gap-3" onSubmit={(e) => {
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
      <hr />
      <ul>
        {todos}
      </ul>
    </div>
  );
}

export default App;
