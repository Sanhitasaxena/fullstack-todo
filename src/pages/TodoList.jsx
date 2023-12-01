import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "./cover";
import "../style/todoList.css";
import axios from "axios";

const TodoList = () => {
  const {
    todoList,
    getAllTodos
  } = useContext(ListContext);


  const deleteListItem = async(uniqueId) => {
      console.log(uniqueId);
     try {
      const response = await axios.delete(`http://localhost:8000/deleteTodo/${uniqueId}`);
      console.log("this is response data of delete request", response.data);
     } catch (error) {
      console.log(error);
     }
  };


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
                        getAllTodos()
                        
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
