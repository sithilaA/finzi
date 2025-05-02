import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { query, where, collection, addDoc, getDocs } from "firebase/firestore";
import Modals from "../../components/Modals";
function IncomeCategories() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  getIncomeCategories();
  const email = localStorage.getItem("email");
  const handleSubmit = (event) => {
    let incomeCategory = document.getElementById("incomeCategory").value;
    let incomeDescription = document.getElementById("incomeDescription").value;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (incomeCategory === "" || incomeDescription === "") {
      } else {
        addUserData();
      }
    }
    async function addUserData() {
      try {
        await addDoc(collection(db, "incomeCategory"), {
          incomeCategory: incomeCategory,
          incomeDescription: incomeDescription,
          userEmail: email,
        });
        console.log("Income Category added!");
        handleClose();
      } catch (error) {
        console.error("Error adding Income Category", error);
        alert(error);
      }
    }
    setValidated(true);
  };
  async function getIncomeCategories() {
    const email = localStorage.getItem("email");
    const q = query(
      collection(db, "incomeCategory"), // change to your collection name
      where("userEmail", "==", email)
    );
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(categories);
  }
  return (
    <div>
      <div>
        <div className=" container m-auto">
          <h1 className="text-center m-3">Income Categories</h1>
          <div className="d-flex justify-content-between align-items-end m-3">
            <div className="d-flex "></div>
            <div>
              <ButtonGroup aria-label="Basic example">
                <Button variant="outline-success" onClick={handleShow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3.5vw"
                    height="3.5vh"
                    fill="currentColor"
                    class="bi bi-file-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
                  </svg>
                </Button>
                <Button variant="outline-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3.5vw"
                    height="3.5vh"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th> </th>
                  <th> </th>
                  <th style={{ width: "4vw" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <Button variant="outline-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.5vw"
                        height="2.5vh"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Income Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form validated={validated} onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Income Category</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  required
                  id="incomeCategory"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a income category.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  id="incomeDescription"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Description.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default IncomeCategories;
