import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Card, Button, Spinner } from "react-bootstrap";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile_no: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initial Form Values
  const initialValues = {
    email: "",
    mobile_no: "",
    password: "",
  };

  // Handle Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      console.log("Form Submitted:", values);

      // Simulating API call delay
      setTimeout(() => {
        toast.success("Account created successfully!");
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-4 w-100" style={{ maxWidth: "24rem" }}>
        <h3 className="text-center mb-4">Create The User</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile_no" className="form-label">
                  Phone
                </label>
                <div className="input-group">
                  <span className="input-group-text">+99</span>
                  <Field
                    type="tel"
                    name="mobile_no"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <ErrorMessage name="mobile_no" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Create Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-danger mt-1" />
              </div>
              <Button type="submit" variant="success" className="w-100" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? <Spinner size="sm" animation="border" /> : "Create Account"}
              </Button>
              <ToastContainer />
            </Form>
          )}
        </Formik>

        <div className="text-center mt-3">
          <span>
            Already have an account? <Link to="/login">Log In</Link>
          </span>
        </div>
      </Card>
    </Container>
  );
}

export default CreateUser;
