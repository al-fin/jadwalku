import { useState, useEffect } from "react";
import moment from 'moment';
import 'moment/locale/id';

export const useInputValue = (initialValue: any = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event: any) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    keyInput: (event: any, callback: any) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    }
  };
};

export const useTodos = () => {
  const initialValue = JSON.parse(localStorage.getItem('tugas') || '[]');
  const [todos, setTodos] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem('tugas', JSON.stringify(todos))
  }, [todos])

  return {
    todos,
    addTodo: (text: string, date: Date) => {
      if (text !== "") {
        const newTodos = todos.concat({
          text,
          date: moment(date).format('dddd, Do MMMM YYYY'),
          timestamps: new Date().getTime(),
          checked: false
        }).sort(function(a: any, b: any){
          var a1= a.timestamps, b1= b.timestamps;
          if(a1== b1) return 0;
          return b1> a1? 1: -1;
        })
        setTodos(newTodos);
      }
    },
    checkTodo: (idx: number) => {
      setTodos(
        todos.map((todo: any, index: number) => {
          if (idx === index) {
            todo.checked = !todo.checked;
          }

          return todo;
        })
      );
    },
    removeTodo: (idx: number) => {
      setTodos(todos.filter((todo: any, index: number) => idx !== index));
    }
  };
};
