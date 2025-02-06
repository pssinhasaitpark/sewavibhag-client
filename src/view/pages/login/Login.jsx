import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Container, Row, Col, InputGroup, FormControl, Checkbox, ToastContainer } from "react-bootstrap";
import sidelogo from "../../../assests/logo.svg fill.svg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulating login validation (replace with your actual API call)
    if (email === "test@example.com" && password === "password123") {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } else {
      toast.error("Invalid Credentials! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    setLoading(false);
  };

  return (
    <Container fluid style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <div className="border p-4 shadow-sm rounded">
            <div className="text-center mb-3">
              <img src={sidelogo} alt="Logo" style={{ width: "150px", height: "auto" }} />
            </div>
            <h3 className="text-center mb-3">Login</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Username or email</Form.Label>
                <InputGroup>
                  <FormControl
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <FormControl
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <Checkbox
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  <span className="ms-2">Remember me</span>
                </div>
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
