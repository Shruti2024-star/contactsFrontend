import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { updateContact } from "../services/ContactService";
import { toast } from "react-toastify";

export default function EditContact() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const contactData = location.state;

   const [formData, setFormData] = useState({
        firstName: contactData?.firstName || "",
        lastName: contactData?.lastName || "",
        email: contactData?.email || "",
        phone: contactData?.phone || "",
        address: contactData?.address || "",
        company: contactData?.company || "",
        notes: contactData?.notes || "",
        isFavourite: contactData?.isFavourite || false 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("The ID being sent is:", contactData.id);
            try {
            await updateContact(contactData.id, formData);
            toast.success("Contact updated successfully!");
            navigate("/contacts");
            } catch (err) {
            console.error(err);
            toast.error("Failed to update contact.");
        }
    };

    if (!contactData) {
        return <Container className="mt-5"><h3>No contact selected.</h3></Container>;
    }

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="p-4 shadow" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Edit Contact</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate("/contacts")}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update Contact
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}