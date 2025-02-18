// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Container, Card, Button, Spinner, Dropdown, Form as BootstrapForm, Row, Col } from "react-bootstrap";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// function CreateUser() {

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const { user_type_id, user_type, token } = useSelector((state) => state?.auth?.user);

//   const [userType, setUserType] = useState("");

//   const [levelList, setLevelList] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [vibhagList, setVibhagList] = useState([]);
//   const [selectedVibhag, setSelectedVibhag] = useState("");
//   const [jilaList, setJilaList] = useState([]);
//   const [selectedJila, setSelectedJila] = useState("");


//   useEffect(() => {
//     if (user_type === "kendra") {
//       setLevelList([1, 2]);
//     } else if (user_type === "prant") {
//       setLevelList([1, 2, 3]);
//     } else if (user_type === "vibhag") {
//       setLevelList([1, 2, 3]);
//     } else if (user_type === "jila") {
//       setLevelList([1, 2]);
//     }
//   }, [user_type]);

//   // Fetch Vibhag data when user type is prant or vibhag
//   useEffect(() => {
//     if (user_type === "prant" || user_type === "vibhag") {
//       axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       })
//         .then((response) => setVibhagList(response?.data || []))
//         .catch((error) => console.error("Error fetching Vibhag data:", error));
//     }
//   }, [user_type]);

//   // Fetch Jila data when a Vibhag is selected
//   useEffect(() => {
//     if (selectedVibhag) {
//       const selectedVibhagData = vibhagList?.map((vibhag) => vibhag?.vibhags?.find((vibhag) => vibhag._id === selectedVibhag)).filter(Boolean);
//       setJilaList(selectedVibhagData?.[0]?.jilas || []);
//     } else {
//       setJilaList([]); // Clear Jila list if no Vibhag is selected
//     }
//   }, [selectedVibhag, vibhagList]);

//   const initialValues = {
//     user_name: "",
//     full_name: "",
//     email: "",
//     mobile_no: "",
//     password: "",
//     user_type: userType,
//     user_type_id: user_type_id,
//     level: selectedLevel,
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {

//     console.log('values<<<<<<<<<<<<<', values);


//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("No token found. Please log in.");
//         return;
//       }

//       await axios.post(`${BASE_URL}/api/v1/register`, values, { headers: { Authorization: `Bearer ${token}` } });

//       toast.success("Account created successfully!");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error occurred during user creation:", error);
//       toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };


//   console.log('userType<>>>>', userType);


//   return (
//     <Container fluid className="d-flex justify-content-center align-items-center vh-100">
//       <Row className="w-100">
//         <Col md={10} lg={8} xl={6} className="mx-auto">
//           <Card className="shadow p-4 w-100">
//             <h3 className="text-center mb-4">Create The User</h3>

//             <Dropdown className="mb-3">
//               <Dropdown.Toggle variant="primary">
//                 {userType ? userType : "Select User Type"}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>

//                 {user_type === "kendra" && (
//                   <>
//                     <Dropdown.Item onClick={() => setUserType("kendra")}>KENDRA</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("prant")}>PRANT</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("vibhag")}>VIBHAG</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("jila")}>JILA</Dropdown.Item>
//                   </>
//                 )}

//                 {user_type === "kshtra" && (
//                   <>
//                     <Dropdown.Item onClick={() => setUserType("prant")}>PRANT</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("vibhag")}>VIBHAG</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("jila")}>JILA</Dropdown.Item>
//                   </>
//                 )}

//                 {user_type === "prant" && (
//                   <>
//                     <Dropdown.Item onClick={() => setUserType("vibhag")}>VIBHAG</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setUserType("jila")}>JILA</Dropdown.Item>
//                   </>
//                 )}

//                 {user_type === "vibhag" && (
//                   <>
//                     <Dropdown.Item onClick={() => setUserType("jila")}>JILA</Dropdown.Item>
//                   </>
//                 )}

//               </Dropdown.Menu>
//             </Dropdown>

//             <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//               {({ isSubmitting, setFieldValue }) => (
//                 <Form>
//                   <div className="mb-3">
//                     <label className="form-label">User Name</label>
//                     <Field type="text" name="user_name" className="form-control" placeholder="Your User Name" />
//                     <ErrorMessage name="user_name" component="div" className="text-danger mt-1" />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Full Name</label>
//                     <Field type="text" name="full_name" className="form-control" placeholder="Your Full Name" />
//                     <ErrorMessage name="full_name" component="div" className="text-danger mt-1" />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <Field type="email" name="email" className="form-control" placeholder="Your email" />
//                     <ErrorMessage name="email" component="div" className="text-danger mt-1" />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Phone</label>
//                     <Field type="tel" name="mobile_no" className="form-control" placeholder="Your Phone" />
//                     <ErrorMessage name="mobile_no" component="div" className="text-danger mt-1" />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Level</label>
//                     <BootstrapForm.Select
//                       value={selectedLevel}
//                       onChange={(e) => {
//                         setSelectedLevel(e.target.value);
//                         setFieldValue("level", e.target.value); // Sync with Formik
//                       }}
//                     >
//                       <option value="">Select Level</option>
//                       {levelList?.map((level) => (
//                         <option key={level} value={level}>
//                           Level {level}
//                         </option>
//                       ))}
//                     </BootstrapForm.Select>
//                   </div>

//                   {user_type === "prant" && (
//                     <div className="mb-3">
//                       <label className="form-label">Select Vibhag</label>
//                       <BootstrapForm.Select
//                         value={selectedVibhag}
//                         onChange={(e) => {
//                           setSelectedVibhag(e.target.value);
//                           setSelectedJila(""); // Reset Jila when Vibhag is changed
//                           setFieldValue("vibhag", e.target.value); // Sync with Formik
//                         }}
//                       >
//                         <option value="">Select Vibhag</option>
//                         {vibhagList?.map((vibhag) => (
//                           <optgroup label={vibhag.vibhag_name} key={vibhag.id}>
//                             {vibhag?.vibhags?.map((item) => (
//                               <option key={item._id} value={item._id}>
//                                 {item.vibhag_name}
//                               </option>
//                             ))}
//                           </optgroup>
//                         ))}
//                       </BootstrapForm.Select>
//                     </div>
//                   )}
//                   {user_type === "vibhag" && (
//                     <div className="mb-3">
//                       <label className="form-label">Select Vibhag</label>
//                       <BootstrapForm.Select
//                         value={selectedVibhag}
//                         onChange={(e) => {
//                           setSelectedVibhag(e.target.value);
//                           setSelectedJila(""); // Reset Jila when Vibhag is changed
//                           setFieldValue("vibhag", e.target.value); // Sync with Formik
//                         }}
//                       >
//                         <option value="">Select Vibhag</option>
//                         {vibhagList?.map((vibhag) => (
//                           <optgroup label={vibhag.vibhag_name} key={vibhag.id}>
//                             {vibhag?.vibhags?.map((item) => (
//                               <option key={item._id} value={item._id}>
//                                 {item.vibhag_name}
//                               </option>
//                             ))}
//                           </optgroup>
//                         ))}
//                       </BootstrapForm.Select>
//                     </div>
//                   )}

//                   {selectedVibhag && (
//                     <div className="mb-3">
//                       <label className="form-label">Select Jila</label>
//                       <BootstrapForm.Select
//                         value={selectedJila}
//                         onChange={(e) => {
//                           setSelectedJila(e.target.value);
//                           setFieldValue("jila", e.target.value); // Sync with Formik
//                         }}
//                       >
//                         <option value="">Select Jila</option>
//                         {jilaList?.map((jila) => (
//                           <option key={jila._id} value={jila._id}>
//                             {jila.jila_name}
//                           </option>
//                         ))}
//                       </BootstrapForm.Select>
//                     </div>
//                   )}

//                   <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <Field type="password" name="password" className="form-control" placeholder="Password" />
//                     <ErrorMessage name="password" component="div" className="text-danger mt-1" />
//                   </div>

//                   <div className="d-flex justify-content-center">
//                     <Button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
//                       {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </Card>
//         </Col>
//       </Row>
//       <ToastContainer />
//     </Container>
//   );
// }

// export default CreateUser;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

  const { user_type, token, } = useSelector((state) => state?.auth?.user);

  const [levelList, setLevelList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState();
  const [vibhagList, setVibhagList] = useState([]);
  const [selectedVibhag, setSelectedVibhag] = useState("");
  const [jilaList, setJilaList] = useState([]);
  const [selectedJila, setSelectedJila] = useState("");

  useEffect(() => {
    if (user_type === "kendra") {
      setLevelList([1, 2]);
    } else if (user_type === "prant") {
      setLevelList([1, 2, 3]);
    } else if (user_type === "vibhag") {
      setLevelList([1, 2, 3]);
    } else if (user_type === "jila") {
      setLevelList([1, 2]);
    }
  }, [user_type]);

  // Fetch Vibhag data when user type is prant or vibhag
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
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",selectedVibhagData);
      
      setJilaList(selectedVibhagData?.[0]?.jilas || []);
    } else {
      setJilaList([]); // Clear Jila list if no Vibhag is selected
    }
  }, [selectedVibhag, vibhagList]);



  console.log("jilesss",jilaList);
  
 
  

  const initialValues = {
    user_name: "",
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    user_type: "",
    user_type_id:selectedVibhag[0]?._id || "",
    level: selectedLevel,
  };


  console.log("initialValues",initialValues);
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);

      // Check if the user_type is 'vibhag', and set user_type_id to vibhag ID
      if (user_type === "vibhag" && selectedVibhag) {
        values.user_type_id = selectedVibhag; // Set user_type_id to vibhag ID
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      // Make the API request with the updated values
      await axios.post(`${BASE_URL}/api/v1/register`, values, { headers: { Authorization: `Bearer ${token}` } });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error occurred during user creation:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={10} lg={8} xl={6} className="mx-auto">
          <Card className="shadow p-4 w-100">
            <h3 className="text-center mb-4">Create The User</h3>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">User Type</label>
                    <Field as="select" name="user_type" className="form-control">
                      <option value="">Select User Type</option>
                      {user_type === "kendra" && (
                        <>
                          <option value="kendra">KENDRA</option>
                          <option value="prant">PRANT</option>
                          <option value="vibhag">VIBHAG</option>
                          <option value="jila">JILA</option>
                        </>
                      )}
                      {user_type === "prant" && (
                        <>
                          <option value="vibhag">VIBHAG</option>
                          <option value="jila">JILA</option>
                        </>
                      )}
                      {user_type === "vibhag" && (
                        <>
                          <option value="jila">JILA</option>
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">User Name</label>
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
                          Level {level}
                        </option>
                      ))}
                    </BootstrapForm.Select>
                  </div>

                  {(user_type === "prant" || user_type === "vibhag") && (
                    <div className="mb-3">
                      <label className="form-label">Select Vibhag</label>
                      <BootstrapForm.Select
                        value={selectedVibhag}
                        onChange={(e) => {
                          setSelectedVibhag(e.target.value);
                          setSelectedJila(""); // Reset Jila when Vibhag is changed
                          setFieldValue("user_type_id", e.target.value); // Set user_type_id directly instead of vibhag
                        }}
                      >
                        <option value="">Select Vibhag</option>
                        {vibhagList?.map((vibhag) => (
                          <optgroup label={vibhag.vibhag_name} key={vibhag.id}>
                            {vibhag?.vibhags?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.vibhag_name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  {user_type === "jila" && selectedVibhag && (
                    <div className="mb-3">
                      <label className="form-label">Select Jila</label>
                      <BootstrapForm.Select
                        value={selectedJila}
                        onChange={(e) => {
                          setSelectedJila(e.target.value);
                          setFieldValue("jila", e.target.value); // Sync with Formik
                        }}
                      >
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
                    <label className="form-label">Password</label>
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
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
