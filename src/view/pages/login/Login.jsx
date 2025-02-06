import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import sidelogo from "../../../assests/sewavibhag.png";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer

function Login() {
  const navigate = useNavigate();

  // Set the initial state values for email and password to predefined values
  const [email, setEmail] = useState("test@gmail.com");  // Pre-fill the email
  const [password, setPassword] = useState("123456");  // Pre-fill the password
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulating login validation (replace with your actual API call)
    if (email === "test@gmail.com" && password === "123456") {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
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
    <>
      {/* ToastContainer should be at the root level or the level where you want to display toasts */}
      <ToastContainer />

      <Container
        fluid
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={10} md={6} lg={5} xl={4}>
            <div className="border p-5 shadow-sm rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <div className="text-center mb-4">
                <img
                  src={sidelogo}
                  alt="Logo"
                  style={{ width: "150px", height: "auto", marginBottom: "20px" }}
                />
              </div>
              <h3 className="text-center mb-4">Login</h3>
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
                      style={{ fontSize: "16px" }}
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
                      style={{ fontSize: "16px" }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                  </div>
                  <a href="#" className="text-decoration-none" style={{ fontSize: "14px" }}>
                    Forgot password?
                  </a>
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                  style={{ padding: "10px", fontSize: "16px" }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
