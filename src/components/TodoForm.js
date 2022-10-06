import React, { useState } from 'react'

export default function TodoForm(props) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTodo(input)
        setInput('');
    } 

    return (
        <form 
            className='todo-form'
            onSubmit={handleSubmit}>
            <input
                value={input} // resets the input field after each submit
                placeholder='Add a task...'
                className='todo-input'
                onChange={(e) => setInput(e.target.value)}
            />
            <button 
                type='submit'
                className='todo-button'>Add Todo
            </button>

        </form>
    )
}
