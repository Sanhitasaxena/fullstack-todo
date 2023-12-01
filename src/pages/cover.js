import React, { useState, createContext } from "react";
import "../style/cover.css";
import TodoList from "./TodoList";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

export const ListContext = createContext();

function Cover() {
  const [todoList, setTodoList] = useState();
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("")

  const saveEditedItem = ()=>{
    // console.log(currentInputValue)
    setUpdatedValue(currentInputValue)
    setCurrentInputValue("")

  }

  const data = {
    inputValue: currentInputValue,
    id: uuidv4()
  }

  const addItem = async()=>{
     try {
      console.log("sending data", data);
      const response = await axios.post("http://localhost:8000/addTodo", data)
      console.log("response data",response.data);
     } catch (error) {
      console.log(error);
     }
  }

  const getAllTodos = async(req, res)=>{
     try {
      const todos = await axios.get("http://localhost:8000/getAllTodo")
      console.log((todos.data));
      setTodoList(todos.data)
      // setTodoList(todos.data)
     } catch (error) {
      console.log(error);
      // res.status(500).send({message: "something went wrong"})
     }
  }

  return (
    <>
      <ListContext.Provider
        value={{
          todoList,
          setTodoList,
          currentInputValue,
          setCurrentInputValue,
          updatedValue,
          setUpdatedValue,
          data
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
                }}
              />
              <label htmlFor="todo">Enter your todo</label>
            </div>
            <div className="Button">
              <button
                className="btn"
                onClick={() => {
                  // todoList.push(currentInputValue);
                  // console.log(todoList);
                  // setTodoList([...todoList, currentInputValue])
                  setCurrentInputValue(currentInputValue);
                  addItem()
                }}
              >
                Add Item
              </button>
              <button className="btn"
              onClick={saveEditedItem}>
                save item
              </button>
              <button className="btn"
              onClick={getAllTodos}>Show all Todo's</button>
            </div>
            {/* {todoList} */}
          </div>
          
          {/* {updatedValue} */}
          <TodoList />
        </div>
      </ListContext.Provider>
    </>
  );
}

export default Cover;
