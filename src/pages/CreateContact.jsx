import React,{useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createContact } from "../services/ContactService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateContact() {
    const [form, setForm] = useState({firstName: "", lastName: "", phone: "",email: "",address:"",company:"",notes:"",isFavorite: false});
    const navigate = useNavigate();

function handleChange(e){
    setForm({...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value});
}
async function handleSubmit(e){
    e.preventDefault();
    try{
        await createContact(form);
        toast.success("Contact created");
        navigate("/contacts");
    }catch{
        toast.error("Error creating contact");
    }
}



    return(
        <Container className="mt-4">
            <h2>Create Contact</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Control className="mb-2" placeholder="First Name" name="firstName" onChange={handleChange} required />
                <Form.Control className="mb-2" placeholder="Last Name" name="lastName" onChange={handleChange} required />
                <Form.Control className="mb-2" placeholder="Phone" name="phone" onChange={handleChange} required />
                <Form.Control className="mb-2" placeholder="Email" name="email" onChange={handleChange} required />
                <Form.Control className="mb-2" placeholder="Address" name="address" onChange={handleChange} />
                <Form.Control className="mb-2" placeholder="Company" name="company" onChange={handleChange} />
                <Form.Control className="mb-2" placeholder="Notes" name="notes" onChange={handleChange} />
                <Form.Check className="mb-2" type="checkbox" label="Favorite" name="isFavorite" onChange={handleChange} />
                <Button variant="primary" type="submit">Create</Button>

            </Form>

</Container>
    )
}
