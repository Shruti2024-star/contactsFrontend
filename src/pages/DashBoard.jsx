import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Welcome, {user?.email}!</h2>
            <p className="text-center text-muted mb-5" style={{ fontSize: "1.2rem" }}>
                What would you like to manage today?
            </p>

            <Row className="justify-content-center gap-4">
              
                <Col md={5}>
                    <Card className="shadow-sm text-center h-100 py-4 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-2 mb-3"> Contacts</Card.Title>
                            <Card.Text className="text-muted mb-4 flex-grow-1">
                                View, search, add, and organize all your personal and business contacts in one place.
                            </Card.Text>
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="w-100"
                                onClick={() => navigate("/contacts")}
                            >
                                Manage Contacts &rarr;
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

               
                <Col md={5}>
                    <Card className="shadow-sm text-center h-100 py-4 border-0" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-2 mb-3"> Groups</Card.Title>
                            <Card.Text className="text-muted mb-4 flex-grow-1">
                                Create specific groups (like 'Family' or 'Work') and assign your contacts to them for easier sorting.
                            </Card.Text>
                            <Button 
                                variant="success" 
                                size="lg" 
                                className="w-100"
                                onClick={() => navigate("/groups")}
                            >
                                Manage Groups &rarr;
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}