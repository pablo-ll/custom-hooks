import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [
    /*  {
       id: new Date().getTime(),
       todo: 'aprender react',
       done: false
       },

        */
];

const init = () => {
   return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init); 

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
     
    }, [todos])
    
    const handloAddTodo = (todo) => {


        dispatchTodo({
            type: '[TODO] Add Todo',
            payload: todo
        })

        
    }

    const  handloDeleteTodo = (id) => {
        console.log({ id });
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handloToggleTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

  return {

    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handloToggleTodo,
    handloDeleteTodo,
    handloAddTodo

  }
}
