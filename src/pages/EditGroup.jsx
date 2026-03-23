import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { updateGroup } from "../services/GroupService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const EditGroup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGroup(form.id, form);
      toast.success("Group updated");
      navigate("/groups");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Group</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-2"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Form.Select
          className="mb-2"
          name="colorTag"
          value={form.colorTag}
          onChange={handleChange}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </Form.Select>

        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default EditGroup;