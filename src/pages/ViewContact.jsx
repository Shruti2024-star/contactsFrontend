import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewContact() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const contact = location.state;

    if (!contact) {
        return (
            <Container className="mt-5 text-center">
                <h3>Contact not found</h3>
                <Button onClick={() => navigate("/dashboard")}>Go Back</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="p-4 shadow" style={{ width: "500px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        {contact.firstName} {contact.lastName} {contact.isFavourite && "⭐"}
                    </h2>
                    
                    <hr />
                    
                    <div className="mb-3">
                        <h5>Contact Information</h5>
                        <p className="mb-1"><strong>Phone:</strong> {contact.phone}</p>
                        <p className="mb-1"><strong>Email:</strong> {contact.email || "N/A"}</p>
                        <p className="mb-1"><strong>Address:</strong> {contact.address || "N/A"}</p>
                        <p className="mb-1"><strong>Favorite:</strong> {contact.isFavourite ? "Yes" : "No"}</p>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            &larr; Back to List
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}