import React from 'react'
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi"
import { ImRedo } from "react-icons/im";

export default function TodoItem(props) {
    return (
        <div className={'todo-row' + (props.todo.completed ? ' complete' : '')}>
            {props.todo.text}
            <RiCloseCircleLine
                className='icon' 
                onClick={() => props.removeTodo(props.todo.id)}/>
            <BiCheckCircle
                className='icon btn-do' 
                onClick={() => props.completeTodo(props.todo)}/>
            <ImRedo
                className='icon btn-undo'
                onClick={() => props.completeTodo(props.todo)}/>
        </div>
    )
}
