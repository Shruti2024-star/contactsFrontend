import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { createGroup } from "../services/GroupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [form, setForm] = useState({ name: "", colorTag: "red" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGroup(form);
      toast.success("Group created");
      navigate("/groups");
    } catch {
      toast.error("Error creating group");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Group</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-2"
          placeholder="Group Name"
          name="name"
          onChange={handleChange}
          required
        />

        <Form.Select
          className="mb-2"
          name="colorTag"
          onChange={handleChange}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </Form.Select>

        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default CreateGroup;