import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const SERVER_URL = 'http://localhost:8000/todos';
let initialized = false;
function App() {
  const [todos, setTodos] = useState([])

  const init = ()=>{
    if(initialized)
      return;
    initialized = true;
    fetch(SERVER_URL)
      .then(response=>{
        if(!response.ok){
          console.error(response.statusText);
          return;
        }
        return response.json();
      })
      .then(json=>{
        setTodos(json.reverse())
      })
  }
  useEffect(()=>{
    init();
  });

  const addTodo = (text) => {
    
    const todoItem = {text, completed: false}

    fetch(SERVER_URL,{
      method: 'POST',
      body: JSON.stringify(todoItem),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response=>{
      if(!response.ok){
        console.error(response.statusText);
        return;
      }
      return response.json();
    })
    .then(json=>{
      setTodos([json,...todos]);
    })
  };

  const removeTodo = (id) => {
    fetch(`${SERVER_URL}/${id}`,{
      method: 'DELETE'
    }).then(response=>{
      if(!response.ok){
        console.error(response.statusText);
        return;
      }
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    })
  }

  const completeTodo = (todo) => {
    fetch(`${SERVER_URL}/${todo.id}`,{
      method: 'PUT',
      body: JSON.stringify({text: todo.text,completed: !todo.completed}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response=>{
      if(!response.ok){
        console.error(response.statusText);
        return;
      }
      return response.json();
    })
    .then(json=>{
      let updatedTodos = todos.map((todo) => {
        if(todo.id === json.id){
          todo.completed = json.completed;
        }
        return todo;
      })
      setTodos(updatedTodos);
    });
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <hr className='separator'/>
      {todos.map((todo) => {
        return(
          <TodoItem
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            todo={todo} 
            key={todo.id}/>
        )
      })}
    </div>
  );
}

export default App;
