import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "./cover";
import "../style/todoList.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const TodoList = () => {
  const { todoList, getAllTodos, currentInputValue, setCurrentInputValue } =
    useContext(ListContext);

  const deleteListItem = async (uniqueId) => {
    console.log(uniqueId);
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteTodo/${uniqueId}`
      );
      console.log("this is response data of delete request", response.data);

      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editListItem = (uniqueId) => {
    handleShow();
    console.log(uniqueId);
    setCurrentInputValue("hii");
  };

  // modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <ul className="container-todoList">
          {todoList
            ? todoList.map((todo, index) => {
                const uniqueId = todo._id;
                return (
                  <i>
                    <li key={index}>
                      {/* {index === editableIndex? updatedValue : todo } */}
                      {todo.TodoName}
                      <span
                        className="cross"
                        onClick={(e) => {
                          deleteListItem(uniqueId);
                        }}
                      >
                        x
                      </span>
                      <span
                        className="cross"
                        onClick={(e) => {
                          editListItem(uniqueId);
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
    </>
  );
};

export default TodoList;
