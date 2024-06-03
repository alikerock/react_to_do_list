import React, { useState } from "react";

function Todo(props){
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(props.data.title);
  const[isChecked,setIsChecked]= useState(false);
  let className = '';
  let deco = {};
  if(isChecked){
    className += 'text-muted';
    deco = {textDecoration:'line-through'}
  }
  let handleCheckbox = e=>{
    let value = !isChecked;
    setIsChecked(value);
    props.todoUpdate(props.data.id, value);
  }
  let updateTodo = e=>{
    e.preventDefault();
    props.updateTodo(props.data.id, text);
    setMode('read');
  }
  let todoDelete = e=>{
    props.deleteTodo(props.data.id)
  }
  let todoEdit = e=>{
    setText(e.target.value);
  }
  const changeMode = ()=>{
    setMode('edit');
  }
  let todoClass = '';
  let formClass = 'hidden';

  if(mode === 'edit'){
    formClass = '';
    todoClass ='hidden';
  }
  return(
    <li className="d-flex gap-2">
      <div className={todoClass}>
        <input type="checkbox" id={`check${props.data.id}`} onClick={handleCheckbox}></input>
        <label style={deco} className={className} htmlFor={`check${props.data.id}`}>{props.data.title}</label>
      </div>
      <form className={formClass} onSubmit={updateTodo}>
        <input type="text" className="form-control" value={text} onChange={todoEdit}/>
      </form>
      <button data-id={props.data.id} className="btn btn-secondary btn-sm " onClick={changeMode}>수정</button>
      <button data-id={props.data.id} className="btn btn-danger btn-sm" onClick={todoDelete}>삭제</button>
    </li>
  )
}
export default Todo;
