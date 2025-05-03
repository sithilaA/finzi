import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { query, where, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
function EditIncomeCategoryModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const email = localStorage.getItem("email");
  const [data, setData] = useState([]);

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
        handleClose();
      }
    }
    setValidated(true);
    async function addUserData() {
      try {
        await addDoc(collection(db, "incomeCategory"), {
          incomeCategory: incomeCategory,
          incomeDescription: incomeDescription,
          userEmail: email,
        });
        console.log("Income Category added!");
      } catch (error) {
        console.error("Error adding Income Category", error);
        alert(error);
      }
    }
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
    setData(categories);
    console.log(categories);
  }
  useEffect(() => {
    getIncomeCategories();
  });
  return (
    <div>
      <Button variant="outline-warning" className="m-1" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5vw"
          height="3.5vh"
          fill="currentColor"
          class="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Income Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Select Income Category Name</Form.Label>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>Select a category</option>
              {data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.incomeCategory}
                </option>
              ))}
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Income Category Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                id="incomeCategory"
              />
              <Form.Control.Feedback type="invalid">
                Income category name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Income Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                id="incomeDescription"
              />
              <Form.Control.Feedback type="invalid">
                Income category description is required.
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
  );
}

export default EditIncomeCategoryModal;
