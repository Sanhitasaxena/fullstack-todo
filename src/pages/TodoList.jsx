import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "./cover";
import "../style/todoList.css";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';


const TodoList = () => {
  const {
    todoList,
    setTodoList,
    currentInputValue,
    setCurrentInputValue,
    updatedValue,
    setUpdatedValue,
    data
  } = useContext(ListContext);

  useEffect(async()=>{
     getAllTodo()
  },[])

  const getAllTodo = async()=>{
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

  // const [editableIndex, setEditableIndex] = useState(-1)

  // const setList = useContext(ListContext)

  // console.log("Context List:", todoList);
  // console.log("list function",setList)

  const deleteListItem = async(uniqueId) => {
      console.log(uniqueId);
     try {
      const response = await axios.delete(`http://localhost:8000/deleteTodo/${uniqueId}`);
      console.log("this is response data of delete request", response.data);
     } catch (error) {
      console.log(error);
     }
  };

  // const editListItem = (index) => {
  //   setEditableIndex(index)
  //   const edittedValue = todoList[index];
  //   setCurrentInputValue(edittedValue);
  // };

  return (
    <div>
      <ul className="container-todoList">
        {todoList
          ? todoList.map((todo, index) => {
            const uniqueId = todo._id
            //  console.log(todo._id);
              return (
                <i>
                  <li key={index}>
                    {/* {index === editableIndex? updatedValue : todo } */}
                    {todo.TodoName}
                    <span
                      className="cross"
                      onClick={(e) => {
                        // console.log(e.target)
                        // handleClick()
                        deleteListItem(uniqueId);
                        
                      }}
                    >
                      x
                    </span>
                    <span
                      className="cross"
                      onClick={(e) => {
                        // editListItem(index, e);
                      }}
                    >
                      edit
                    </span>
                  </li>
                </i>
              );
            })
          : console.log("add items in the list")}
      </ul>
    </div>
  );
};

export default TodoList;
