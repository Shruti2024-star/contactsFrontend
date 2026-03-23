import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getContactsByGroup } from "../services/GroupService";
import { getAllGroups, moveContactToGroup } from "../services/GroupService";
import { toast } from "react-toastify";

const GroupContacts = () => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getContactsByGroup(id);
      setContacts(res.data);

      const g = await getAllGroups();
      setGroups(g.data);
    } catch {
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMove = async (contactId, groupId) => {
    try {
      await moveContactToGroup(contactId, groupId);
      toast.success("Moved successfully");
      fetchData();
    } catch {
      toast.error("Move failed");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Contacts</h2>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Move</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>
                <select
                  onChange={(e) =>
                    handleMove(c.id, e.target.value)
                  }
                >
                  <option>Select Group</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GroupContacts;