import { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  console.log("data",user);
  const navigate = useNavigate();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow text-center" style={{ width: "400px" }}>
        <h2>Dashboard</h2>

        <h4 className="mt-3">
          Welcome{" "}
          <span className="text-primary">
            {user?.email || "User"}
          </span>
        </h4>

        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate("/groups")}
        >
          Show Groups
        </Button>
      </Card>
    </Container>
  );
}