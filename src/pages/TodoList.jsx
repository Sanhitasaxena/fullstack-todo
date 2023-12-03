import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "./cover";
import "../style/todoList.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const TodoList = () => {
  const [editItemValue, setEdititemvalue] = useState("");
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
  };

  // modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
      // className="modal show"
      // style={{ display: "block", position: "inherit" }}
      ></div>
      <div>
        <ul className="container-todoList">
          {todoList
            ? todoList.map((todo, index) => {
                const uniqueId = todo._id;
                console.log(todo);
                return (
                  <>
                    <i>
                      <li key={uniqueId}>
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
                            setEdititemvalue(todo.TodoName);
                          }}
                        >
                          edit
                        </span>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Todo</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Enter Todo</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder={editItemValue}
                                  // value={todo.TodoName}
                                  autoFocus
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </li>
                    </i>
                  </>
                );
              })
            : console.log("add items in the list")}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
