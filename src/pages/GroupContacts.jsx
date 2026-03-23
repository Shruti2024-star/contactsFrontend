import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getGroupContacts, addContactToGroupAPI } from "../services/GroupService"; 
import { getAllContacts } from "../services/ContactService"; 

export default function GroupContacts() {
    const { id: groupId } = useParams(); 
    const navigate = useNavigate();
    
    const [groupContacts, setGroupContacts] = useState([]);
    
    // --- Modal State ---
    const [showModal, setShowModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);

    const fetchGroupContacts = useCallback(async () => {
        try {
            const res = await getGroupContacts(groupId);
            setGroupContacts(res || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load group contacts");
        }
    }, [groupId]);

    useEffect(() => {
        fetchGroupContacts();
    }, [fetchGroupContacts]);

    // --- Modal Logic ---
    const handleOpenModal = async () => {
        try {
            // Fetch ALL contacts so the user can pick one
            const res = await getAllContacts();
            
            // Filter out contacts that are ALREADY in this group so they don't add duplicates
            const existingIds = groupContacts.map(gc => gc.id);
            const availableContacts = (res || []).filter(c => !existingIds.includes(c.id));
            
            setAllContacts(availableContacts);
            setShowModal(true);
        } catch (error) {
            toast.error("Failed to load contacts for the menu.");
        }
    };

    const handleAddContact = async (contactId) => {
        try {
            await addContactToGroupAPI(groupId, contactId);
            toast.success("Contact added to group!");
            setShowModal(false); // Close the popup
            fetchGroupContacts(); // Refresh the main screen to show the new person
        } catch (error) {
            console.error(error);
            toast.error("Failed to add contact to group.");
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Group Contacts</h2>
                <div>
                    <Button variant="secondary" onClick={() => navigate("/groups")} className="me-2">
                        &larr; Back to Groups
                    </Button>
                    {/* The New Add Button */}
                    <Button variant="primary" onClick={handleOpenModal}>
                        + Add Existing Contact
                    </Button>
                </div>
            </div>

            {groupContacts.length === 0 ? (
                <p className="text-muted text-center mt-5">No contacts in this group yet. Click "Add" to get started!</p>
            ) : (
                <div className="d-flex flex-wrap gap-3">
                    {groupContacts.map((c) => (
                        <Card className="shadow-sm" style={{ width: "18rem" }} key={c.id}>
                            <Card.Body>
                                <Card.Title>{c.firstName} {c.lastName}</Card.Title>
                                <Card.Text>
                                    <strong>Phone:</strong> {c.phone} <br/>
                                    <strong>Email:</strong> {c.email || "N/A"}
                                </Card.Text>
                                {/* Your existing remove/transfer buttons would go here */}
                                <Button size="sm" variant="info" onClick={() => navigate('/view-contact', { state: c })}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}

            {/* --- The Add Contact Popup Modal --- */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact to Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allContacts.length === 0 ? (
                        <p className="text-muted text-center">No available contacts to add.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {allContacts.map((c) => (
                                <ListGroup.Item key={c.id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{c.firstName} {c.lastName}</strong>
                                        <div className="text-muted small">{c.phone}</div>
                                    </div>
                                    <Button size="sm" variant="success" onClick={() => handleAddContact(c.id)}>
                                        Add
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}