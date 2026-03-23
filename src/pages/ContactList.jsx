import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Button, Form, InputGroup } from "react-bootstrap";
import { getAllContacts, deleteContact as deleteContactService, toggleFavorite, searchContactsAPI } from "../services/ContactService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ContactList() {
    const [contact, setContact] = useState([]);
    const navigate = useNavigate();
    
    const [filterFavorite, setFilterFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchContacts = useCallback(async () => {
        try {
            const res = await getAllContacts();
            setContact(res || []); 
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch contacts");
        }
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            fetchContacts();
            return;
        }

        const delaySearch = setTimeout(async () => {
            try {
                const res = await searchContactsAPI(searchQuery);
                setContact(res || []); 
            } catch (error) {
                console.error("Search failed", error);
            }
        }, 300);

        return () => clearTimeout(delaySearch);
        
    }, [searchQuery, fetchContacts]); 

    const handleDeleteContact = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        try {
            await deleteContactService(id);
            toast.success("Contact deleted");
            fetchContacts();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    const handleToggle = async (id) => {
        try {
            await toggleFavorite(id);
            toast.success("Favorite status toggled");
            fetchContacts();
        } catch (err) {
            console.error(err);
            toast.error("Toggle failed");
        }
    };

    const displayedContacts = filterFavorite 
        ? contact.filter(c => c.isFavourite === true) 
        : contact;

    return (
        <Container className="mt-4">
            <h2>My Contacts</h2>
            
            <div className="d-flex flex-wrap mb-3 gap-2 justify-content-between">
                <div className="d-flex gap-2">
                    <Button onClick={() => navigate("/create-contact")} variant="primary">
                        + Add Contact
                    </Button>
                    
                    <Button 
                        onClick={() => setFilterFavorite(!filterFavorite)} 
                        variant={filterFavorite ? "secondary" : "warning"}
                    >
                        {filterFavorite ? "Show All" : "Show Favorites"}
                    </Button>
                </div>

                <InputGroup style={{ maxWidth: "300px" }}>
                    <Form.Control
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
            </div>

            <div>
                {displayedContacts.map((c) => (
                    <Card className="mb-3 shadow-sm" key={c.id}>
                        <Card.Body>
                            <Card.Title>
                                {c.firstName} {c.lastName} {c.isFavourite && "⭐"}
                            </Card.Title>
                            <Card.Text>
                                <strong>Phone:</strong> {c.phone}
                            </Card.Text>
                            
                            <Button size="sm" variant="danger" onClick={() => handleDeleteContact(c.id)}>
                                Delete
                            </Button>{" "}

                            <Button 
                                size="sm" 
                                variant="info" 
                                onClick={() => navigate(`/view-contact`, { state: c })} 
                                className="ms-2"
                            >
                                View Details
                            </Button>{" "}

                            <Button size="sm" variant="secondary" onClick={() => navigate(`/edit-contact`, { state: c })} className="ms-2">
                                Edit
                            </Button>{" "}
                            
                            <Button size="sm" variant={c.isFavourite ? "outline-warning" : "warning"} onClick={() => handleToggle(c.id)} className="ms-2">
                                {c.isFavourite ? "Unfavorite" : "Make Favorite"}
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                
                {displayedContacts.length === 0 && <p className="text-muted mt-3">No contacts found.</p>}
            </div>
        </Container>
    );
}