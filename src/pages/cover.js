import React, { useState, createContext, useEffect } from "react";
import "../style/cover.css";
import TodoList from "./TodoList";
import axios from "axios";
import {v4 as uuidv4} from "uuid"



export const ListContext = createContext();

function Cover() {
  const [todoList, setTodoList] = useState();
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [editValue, setEditValue] = useState("");



  const data = {
    inputValue: currentInputValue,
    id: uuidv4()
  }

  const addItem = async(data)=>{
     try {
      console.log("sending data", data);
      const response = await axios.post("http://localhost:8000/addTodo", data)
      console.log("response data",response.data);
      await getAllTodos()
      setCurrentInputValue("")
     } catch (error) {
      console.log(error);
     }
  }

  const getAllTodos = async(req, res)=>{
     try {
      const todos = await axios.get("http://localhost:8000/getAllTodo")
      console.log("todo data",todos.data);
      setTodoList(todos.data)
     } catch (error) {
      console.log(error);
     }
  }

  useEffect(async()=>{
   await getAllTodos()
 },[])

  return (
    <>
      <ListContext.Provider
        value={{
          todoList,
          setTodoList,
          currentInputValue,
          setCurrentInputValue,
          data,
          getAllTodos
        }}
      >
        <div className="container">
          <div className="cover">
            <div className="todo-input">
              <input
                type="text"
                id="todo"
                required
                value={currentInputValue}
                onChange={(event) => {
                  setCurrentInputValue(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <label htmlFor="todo">Enter your todo</label>
            </div>
            <div className="Button">
              <button
                className="btn"
                onClick={() => {
                  addItem(data)
                }}
              >
                Add Item
              </button>
              {/* <button className="btn"
              >
                save item
              </button> */}
            </div>
          </div>
          <TodoList />
        </div>
      </ListContext.Provider>
    </>
  );
}

export default Cover;
