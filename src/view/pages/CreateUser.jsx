



import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Card, Button, Spinner, Form as BootstrapForm, Row, Col } from "react-bootstrap";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user_type } = useSelector((state) => state?.auth?.user);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [levelList, setLevelList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState();
  const [hierarchyData, setHierarchyData] = useState([]);
  const [selectedKshetra, setSelectedKshetra] = useState("");
  const [selectedPrant, setSelectedPrant] = useState("");
  const [selectedVibhag, setSelectedVibhag] = useState("");
  const [selectedJila, setSelectedJila] = useState("");
  const [vibhagList, setVibhagList] = useState([]);
  const [jilaList, setJilaList] = useState([]);

  // Fetch hierarchy data for Kendra user type
  useEffect(() => {
    if (user_type === "kendra" || user_type === "kshetra") {
      axios.get(`${BASE_URL}/api/v1/hierarchy`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then((response) => {
          setHierarchyData(response.data || []);
        })
        .catch((error) => console.error("Error fetching hierarchy data:", error));
    }
  }, [user_type]);

  // Set level list based on user type
  useEffect(() => {
    if (user_type === "kendra") {
      setLevelList([1, 2, 3, 4]);
    } else if (user_type === "kshetra") {
      setLevelList(["Viewer", "Admin"]); 
    } else if (user_type === "prant") {
      setLevelList([1, 2, 3]);
    } else if (user_type === "vibhag") {
      setLevelList([1, 2, 3]);
    } else if (user_type === "jila") {
      setLevelList([1, 2]);
    }
  }, [user_type]);

  // Fetch Vibhag data for Prant and Vibhag user types
  useEffect(() => {
    if (user_type === "prant" || user_type === "vibhag") {
      axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then((response) => setVibhagList(response?.data || []))
        .catch((error) => console.error("Error fetching Vibhag data:", error));
    }
  }, [user_type]);

  // Fetch Jila data when a Vibhag is selected
  useEffect(() => {
    if (selectedVibhag) {
      const selectedVibhagData = vibhagList?.map((vibhag) => vibhag?.vibhags?.find((vibhag) => vibhag._id === selectedVibhag)).filter(Boolean);
      setJilaList(selectedVibhagData?.[0]?.jilas || []);
    } else {
      setJilaList([]);
    }
  }, [selectedVibhag, vibhagList]);

  const initialValues = {
    user_name: "",
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    user_type: "", // Ensure this is set correctly
    user_type_id: selectedVibhag[0]?._id || "",
    level: selectedLevel,
  };

  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(3, "User  name must be at least 3 characters")
      .max(20, "User  name cannot exceed 20 characters")
      .required("User  name is required"),

    full_name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    user_type: Yup.string()
      .required("User  type is required"),

    user_type_id: Yup.string()
      .required("User  type ID is required"),

    level: Yup.number()
      .required("Level is required")
      .oneOf([1, 2, 3, 4], "Invalid level selected"),

    jila: Yup.string().when("user_type", {
      is: (val) => val === "jila",
      then: Yup.string().required("Jila selection is required"),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      // Ensure user_type is set correctly
      values.user_type = selectedUserType; // Set user_type based on the selected value

      // Assign user_type_id correctly based on user_type
      if (values.user_type === "jila" && selectedJila) {
        values.user_type_id = selectedJila; // Set user_type_id to Jila ID
      } else if (values.user_type === "vibhag" && selectedVibhag) {
        values.user_type_id = selectedVibhag; // Set user_type_id to Vibhag ID
      }

      // Remove jila field before sending request
      const { jila, ...filteredValues } = values;

      await axios.post(`${BASE_URL}/api/v1/register`, filteredValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Account created successfully!");
      navigate("/dashboard/view-user");
    } catch (error) {
      console.error("Error occurred during user creation:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center ">
      <Row className="w-100">
        <Col md={10} lg={8} xl={6} className="mx-auto">
          <Card className="shadow p-4 w-100">
            <h3 className="text-center mb-4">Create The User</h3>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">User  Type</label>
                    <Field as="select" name="user_type" className="form-control"
                      onChange={(e) => {
                        setSelectedUserType(e.target.value);
                        setFieldValue("user_type", e.target.value);
                        setSelectedVibhag(""); // Reset Vibhag when user type changes
                        setSelectedJila(""); // Reset Jila when user type changes
                      }}
                    >
                      <option value="">Select User Type</option>
                      {user_type === "kendra" && (
                        <>
                          <option value="kshetra">Kshetra</option>
                          <option value="prant">Prant</option>
                          <option value="vibhag">Vibhag</option>
                          <option value="jila">Jila</option>
                        </>
                      )}
                      {user_type === "kshetra" && (
                        <>
                          <option value="prant">Prant</option>
                          <option value="vibhag">Vibhag</option>
                          <option value="jila">Jila</option>
                        </>
                      )}
                      {user_type === "prant" && (
                        <>
                          <option value="vibhag">Vibhag</option>
                          <option value="jila">Jila</option>
                        </>
                      )}
                      {user_type === "vibhag" && (
                        <>
                          <option value="jila">Jila</option>
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Level</label>
                    <BootstrapForm.Select
                      value={selectedLevel}
                      onChange={(e) => {
                        setSelectedLevel(e.target.value);
                        setFieldValue("level", Number(e.target.value));
                      }}
                    >
                      <option value="">Select Level</option>
                      {levelList?.map((level) => (
                        <option key={level} value={level}>
                           {level}
                        </option>
                      ))}
                    </BootstrapForm.Select>
                  </div>

                  {/* Always show Kshetra dropdown for Kendra */}
                  {user_type === "kendra" && (
                    <div className="mb-3">
                      <label className="form-label">Select Kshetra</label>
                      <BootstrapForm.Select
                        value={selectedKshetra}
                        onChange={(e) => {
                          setSelectedKshetra(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Kshetra</option>
                        {hierarchyData?.[0]?.kshetras?.map((kshetra) => (
                          <option key={kshetra._id} value={kshetra._id}>
                            {kshetra.kshetra_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  {/* Show Prant dropdown if selected user type is Vibhag */}
                  {user_type === "kendra" && selectedUserType === "vibhag" && (
                    <div className="mb-3">
                      <label className="form-label">Select Prant</label>
                      <BootstrapForm.Select
                        value={selectedPrant}
                        onChange={(e) => {
                          setSelectedPrant(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Prant</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants?.map((prant) => (
                          <option key={prant._id} value={prant._id}>
                            {prant.prant_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {user_type === "kendra" && selectedUserType === "prant" && (
                    <div className="mb-3">
                      <label className="form-label">Select Prant</label>
                      <BootstrapForm.Select
                        value={selectedPrant}
                        onChange={(e) => {
                          setSelectedPrant(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Prant</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants?.map((prant) => (
                          <option key={prant._id} value={prant._id}>
                            {prant.prant_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {/* Show Vibhag dropdown if selected user type is Vibhag */}
                  {user_type === "kendra" && selectedUserType === "vibhag" && (
                    <div className="mb-3">
                      <label className="form-label">Select Vibhag</label>
                      <BootstrapForm.Select
                        value={selectedVibhag}
                        onChange={(e) => {
                          setSelectedVibhag(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Vibhag</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags?.map((vibhag) => (
                          <option key={vibhag._id} value={vibhag._id}>
                            {vibhag.vibhag_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  {/* Show Jila dropdown if selected user type is Jila */}
                  {user_type === "kendra" && selectedUserType === "jila" && (
                    <div className="mb-3">
                      <label className="form-label">Select Jila</label>
                      <BootstrapForm.Select
                        value={selectedJila}
                        onChange={(e) => {
                          setSelectedJila(e.target.value);
                          setFieldValue("jila", e.target.value);
                        }}
                      >
                        <option value="">Select Jila</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags[0]?.jilas?.map((jila) => (
                          <option key={jila._id} value={jila._id}>
                            {jila.jila_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {/* {user_type === "kshetra" && (
                    <div className="mb-3">
                      <label className="form-label">Select Kshetra</label>
                      <BootstrapForm.Select
                        value={selectedKshetra}
                        onChange={(e) => {
                          setSelectedKshetra(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Kshetra</option>
                        {hierarchyData?.[0]?.kshetras?.map((kshetra) => (
                          <option key={kshetra._id} value={kshetra._id}>
                            {kshetra.kshetra_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )} */}

                  {/* Show Prant dropdown if selected user type is Vibhag */}
                  {user_type === "kshetra" && selectedUserType === "vibhag" && (
                    <div className="mb-3">
                      <label className="form-label">Select Prant</label>
                      <BootstrapForm.Select
                        value={selectedPrant}
                        onChange={(e) => {
                          setSelectedPrant(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Prant</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants?.map((prant) => (
                          <option key={prant._id} value={prant._id}>
                            {prant.prant_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {user_type === "kshetra" && selectedUserType === "prant" && (
                    <div className="mb-3">
                      <label className="form-label">Select Prant</label>
                      <BootstrapForm.Select
                        value={selectedPrant}
                        onChange={(e) => {
                          setSelectedPrant(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Prant</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants?.map((prant) => (
                          <option key={prant._id} value={prant._id}>
                            {prant.prant_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {/* Show Vibhag dropdown if selected user type is Vibhag */}
                  {user_type === "kshetra" && selectedUserType === "vibhag" && (
                    <div className="mb-3">
                      <label className="form-label">Select Vibhag</label>
                      <BootstrapForm.Select
                        value={selectedVibhag}
                        onChange={(e) => {
                          setSelectedVibhag(e.target.value);
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">Select Vibhag</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags?.map((vibhag) => (
                          <option key={vibhag._id} value={vibhag._id}>
                            {vibhag.vibhag_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  {/* Show Jila dropdown if selected user type is Jila */}
                  {user_type === "kshetra" && selectedUserType === "jila" && (
                    <div className="mb-3">
                      <label className="form-label">Select Jila</label>
                      <BootstrapForm.Select
                        value={selectedJila}
                        onChange={(e) => {
                          setSelectedJila(e.target.value);
                          setFieldValue("jila", e.target.value);
                        }}
                      >
                        <option value="">Select Jila</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags[0]?.jilas?.map((jila) => (
                          <option key={jila._id} value={jila._id}>
                            {jila.jila_name}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">User  Name</label>
                    <Field type="text" name="user_name" className="form-control" placeholder="Your User Name" />
                    <ErrorMessage name="user_name" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <Field type="text" name="full_name" className="form-control" placeholder="Your Full Name" />
                    <ErrorMessage name="full_name" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field type="email" name="email" className="form-control" placeholder="Your email" />
                    <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <Field type="mobile" name="mobile" className="form-control" placeholder="Your Phone" />
                    <ErrorMessage name="mobile" component="div" className="text-danger mt-1" />
                  </div>

              

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      className="btn create-user custom-btn"
                      disabled={loading || isSubmitting}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default CreateUser;