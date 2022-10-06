import React from 'react'
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi"

export default function TodoItem(props) {
    return (
        <div className={props.todo.completed ? 'todo-row complete' : 'todo-row'}>
            {props.todo.text}
            <RiCloseCircleLine
                className='icon' 
                onClick={() => props.removeTodo(props.todo.id)}/>
            <BiCheckCircle
                className='icon' 
                onClick={() => props.completeTodo(props.todo.id)}/>
        </div>
    )
}
