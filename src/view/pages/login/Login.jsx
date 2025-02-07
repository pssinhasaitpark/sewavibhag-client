import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
  InputGroup,
} from "react-bootstrap";
import sidelogo from "../../../assests/sewavibhag.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const initialValues = {
    user_name: "testuser3",
    password: "password123",
  };

  const handleSubmit = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success("Login successful!", { position: "top-right", autoClose: 2000 });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1500);
    } catch (error) {
      toast.error("Invalid Credentials! Please try again.", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <ToastContainer />
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
          <div className="border p-4 shadow-sm rounded bg-white">
            <div className="text-center mb-3">
              <img src={sidelogo} alt="Logo" style={{ width: "150px", height: "auto" }} />
            </div>
            <h3 className="text-center mb-4">Login</h3>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <BootstrapForm onSubmit={handleSubmit}>
                  <BootstrapForm.Group className="mb-3" controlId="user_name">
                    <BootstrapForm.Label>Username</BootstrapForm.Label>
                    <InputGroup>
                      <BootstrapForm.Control
                        type="text"
                        name="user_name"
                        placeholder="Enter your username"
                        value={values.user_name || "testuser3"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.user_name && errors.user_name}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.user_name}
                      </BootstrapForm.Control.Feedback>
                    </InputGroup>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3" controlId="password">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <InputGroup>
                      <BootstrapForm.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password || "password123"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.password}
                      </BootstrapForm.Control.Feedback>
                    </InputGroup>
                  </BootstrapForm.Group>

                  <Button variant="success" type="submit" className="w-100" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </BootstrapForm>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
