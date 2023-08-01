import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"

const AddRequest = () => {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("CLICKED")
    try{
        const res = await axios.post("http://localhost:8080/requests/create",{
            productName: name,
            description: desc
        })
        console.log(res)
    }catch(err){}
  }

  return (
    <div>
        <Container>
            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <h1>Add New Request</h1>
                <Form.Group>
                    <Form.Label>Car Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Car Name" value={name} required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Car Description" value={desc} required onChange={(e) => setDesc(e.target.value)} />
                </Form.Group>
                <Form.Group>
                        <Button type="submit">
                                Post
                        </Button>
                </Form.Group>
                
            </Form>
        </Container>
    </div>
  )
}

export default AddRequest