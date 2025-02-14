  import React, { useState, useEffect } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { Link, useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { Container, Card, Button, Spinner, Dropdown, Form as BootstrapForm, Row, Col } from "react-bootstrap";
  import axios from "axios";

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobile_no: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  function CreateUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [userType, setUserType] = useState("");

    const [vibhagList, setVibhagList] = useState([]);
    const [jilaList, setJilaList] = useState([]);
    const [selectedVibhag, setSelectedVibhag] = useState("");
    const [selectedJila, setSelectedJila] = useState("");

    useEffect(() => {
      if (user?.user_type) {
        setUserType(user.user_type);
      }
    }, [user]);

    useEffect(() => {
      if (userType === "prant" || userType === "vibhag") {
        axios
          .get(`${BASE_URL}/api/v1/prantAndVibhag`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => setVibhagList(response?.data || []))
          .catch((error) => console.error("Error fetching vibhag data:", error));
      }
    }, [userType]);

    useEffect(() => {
      if (selectedVibhag) {
        const selectedVibhagData = vibhagList
          ?.map((vibhag) => vibhag?.vibhags?.find((vibhag) => vibhag._id === selectedVibhag))
          .filter(Boolean);
        setJilaList(selectedVibhagData?.[0]?.jilas || []);
      }
    }, [selectedVibhag, vibhagList]);

    const initialValues = {
      email: "",
      mobile_no: "",
      password: "",
      vibhag: "",
      prant: "",
      jila: "",
    };

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        setTimeout(() => {
          toast.success("Account created successfully!");
          navigate("/login");
        }, 1500);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    };

    return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={10} lg={8} xl={6} className="mx-auto">
            <Card className="shadow p-4 w-100" style={{ width: "100%", maxWidth: "80rem" }}>
              <h3 className="text-center mb-4">Create The User</h3>

              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="primary">
                  {userType ? userType.toUpperCase() : "Select User Type"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[ "vibhag", "jila"].map((type) => (
                    <Dropdown.Item key={type} onClick={() => setUserType(type)}>
                      {type.toUpperCase()}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    {userType === "prant" && (
                      <div className="mb-3">
                        <label className="form-label">Select Vibhag</label>
                        <BootstrapForm.Select
                          value={selectedVibhag}
                          onChange={(e) => setSelectedVibhag(e.target.value)}
                        >
                          <option value="">Select Vibhag</option>
                          {vibhagList?.map((vibhag) => (
                            <optgroup label={vibhag.vibhag_name} key={vibhag.id}>
                              {vibhag?.vibhags?.map((item) => (
                                <option key={item.id} value={item._id}>
                                  {item.vibhag_name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </BootstrapForm.Select>
                      </div>
                    )}
                    {userType === "prant" && (
                      <div className="mb-3">
                        <label className="form-label">Vibhag Level</label>
                        <BootstrapForm.Select
                          value={selectedVibhag}
                          onChange={(e) => setSelectedVibhag(e.target.value)}
                        >
                          <option value="">Select Vibhag Level</option>
                          {vibhagList?.map((vibhag) => (
                            <optgroup label={vibhag.vibhag_name} key={vibhag.id}>
                              {vibhag?.vibhags?.map((item) => (
                                <option key={item.id} value={item._id}>
                                  {item.vibhag_level}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </BootstrapForm.Select>
                      </div>
                    )}

                    {selectedVibhag && (
                      <div className="mb-3">
                        <label className="form-label">Select Jila</label>
                        <BootstrapForm.Select value={selectedJila} onChange={(e) => setSelectedJila(e.target.value)}>
                          <option value="">Select Jila</option>
                          {jilaList?.map((jila) => (
                            <option key={jila._id} value={jila._id}>
                              {jila.jila_name}
                            </option>
                          ))}
                        </BootstrapForm.Select>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <Field type="text" name="text" className="form-control" placeholder="Your Full Name" />
                      <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <Field type="email" name="email" className="form-control" placeholder="Your email" />
                      <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <div className="input-group">
                        {/* <span className="input-group-text">+99</span> */}
                        <Field type="tel" name="mobile_no" className="form-control" placeholder=" Your Phone" />
                      </div>
                      <ErrorMessage name="mobile_no" component="div" className="text-danger mt-1" />
                    </div>

                    {/* <div className="mb-3">
                      <label className="form-label">Create Password</label>
                      <Field type="password" name="password" className="form-control" placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                    </div> */}

                    <Button type="submit" variant="success" className="w-100" disabled={isSubmitting || loading}>
                      {isSubmitting || loading ? <Spinner size="sm" animation="border" /> : "Create Account"}
                    </Button>
                    <ToastContainer />
                  </Form>
                )}
              </Formik>

              
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  export default CreateUser;
