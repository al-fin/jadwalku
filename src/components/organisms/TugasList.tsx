import React, { memo } from "react";

import { useInputValue, useTodos } from "../../hooks/TugasHooks";


import AddTodo from "../moleculs/AddTodo";
import TodoList from "../moleculs/TodoList";
import Speech from 'speak-tts';

const TugasList = memo((props: any) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  let text = '';

  if (todos.length === 0) {
    text = 'Belum ada list tugas.'
  } else if (todos.filter(t => t.checked === false).length === 0) {
    text = 'Semua tugas telah diselesaikan.'
  } else {
    text = `Tugas yang belum diselesaikan adalah `;
    todos.filter(t => t.checked === false).forEach((t: any, k:number) => {
      if (todos.filter(t => t.checked === false).length === 1) {
        text += t.text+', deadline pada hari '+t.date+'. ';
      } else if (k === todos.filter(t => t.checked === false).length-1) {
        text += 'dan yang terakhir adalah '+t.text+', deadline pada hari '+t.date+'. ';
      } else {
        text += 'yang ke-'+Number(k+1)+t.text+', deadline pada hari '+t.date+'. ';
      }
    })
  }

  const clearInputAndAddTodo = () => {
    clearInput();
    addTodo(inputValue, selectedDate);
  };

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(),
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };


  const speech = new Speech() // will throw an exception if not browser supported

  React.useEffect(() => {

    speech.init({
      'volume': 1,
       'lang': 'id-ID',
       'rate': 1,
       'pitch': 1,
       'splitSentences': true,
       'listeners': {
           'onvoiceschanged': (voices: any) => {
               console.log("Event voiceschanged", voices)
           }
       }
   }).then((data: any) => {
     console.log('initialized !')

      speech.speak({
        text: text,
      }).then(() => {
          console.log("Success !")
      }).catch(e => {
          console.error("An error occurred :", e)
      })
   }).catch((e: any) => {
       console.error("An error occured while initializing : ", e)
   })

   return () => {
     speech.cancel()
   }

  }, [])



  return (
    <>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event: any) => keyInput(event, clearInputAndAddTodo)}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <TodoList
        items={todos}
        onItemCheck={(idx: number) => checkTodo(idx)}
        onItemRemove={(idx: number) => removeTodo(idx)}
      />
    </>
  );
});

export default TugasList;