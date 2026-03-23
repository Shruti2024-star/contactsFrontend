import { useEffect, useState, useCallback } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { getAllGroups, deleteGroup } from "../services/GroupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();


  const fetchGroups = useCallback(async () => {
    try {
      const res = await getAllGroups();
      setGroups(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch groups");
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id);
      toast.success("Group deleted");
      fetchGroups();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Contact Groups</h2>

      <Button onClick={() => navigate("/create-group")} className="mb-3">
        + Add Group
      </Button>

      <Row>
        {groups.map((g) => (
          <Col md={4} key={g.id}>
            <Card className="mb-3 shadow">
              <Card.Body>
                <Card.Title>
                  {g.name}{" "}
                  <span style={{ color: g.colorTag }}>●</span>
                </Card.Title>

                <Button
                  size="sm"
                  variant="info"
                  onClick={() =>
                    navigate(`/groups/${g.id}/contacts`)
                  }
                >
                  View
                </Button>{" "}

                <Button
                  size="sm"
                  variant="warning"
                  onClick={() =>
                    navigate(`/edit-group/${g.id}`, { state: g })
                  }
                >
                  Edit
                </Button>{" "}

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(g.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GroupList;