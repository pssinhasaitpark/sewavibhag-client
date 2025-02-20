// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { fetchHierarchy } from "../redux/slice/hierarchySlice";
// import { Button, Spinner, Form as BootstrapForm } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const CreateUser = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { data: hierarchyData, loading } = useSelector((state) => state.hierarchy);
//     const { user } = useSelector((state) => state.auth); // Get logged-in user details

//     const [selectedUserType, setSelectedUserType] = useState("");
//     const [selectedVibhag, setSelectedVibhag] = useState("");
//     const [jilaList, setJilaList] = useState([]);
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         dispatch(fetchHierarchy());
//     }, [dispatch]);

//     // Fetch Prant and Vibhag for logged-in user
//     useEffect(() => {
//         if (user?.user_type === "vibhag") {
//             axios
//                 .get(`${BASE_URL}/api/v1/prantAndVibhag`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     console.log("API Response:", response.data); // Debug the response
//                     if (Array.isArray(response.data)) {
//                         setJilaList(response.data);
//                     } else if (response.data?.data && Array.isArray(response.data.data)) {
//                         setJilaList(response.data.data); // Adjust if nested inside 'data'
//                     } else {
//                         console.error("Unexpected API response structure", response.data);
//                     }
//                 })
//                 .catch((error) => console.error("Error fetching Jila data:", error));
//         }
//     }, [user, token]);



//     return (
//         <Formik
//             initialValues={{
//                 user_type: "",
//                 user_name: "",
//                 full_name: "",
//                 email: "",
//                 mobile: "",
//                 password: "",
//                 jila: "",
//             }}
//             onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                     const filteredValues = {
//                         ...values,
//                         created_by: user?.user_type_id, // Ensure the created_by field is set
//                     };

//                     await axios.post(`${BASE_URL}/api/v1/register`, filteredValues, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });

//                     toast.success("Account created successfully!");
//                     navigate("/dashboard/view-user");
//                 } catch (error) {
//                     console.error("Error occurred during user creation:", error);
//                     toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
//                 } finally {
//                     setSubmitting(false);
//                 }
//             }}
//         >
//             {({ isSubmitting, setFieldValue }) => (
//                 <Form>
//                     {/* User Type Dropdown */}
//                     <div className="mb-3">
//                         <label className="form-label">User Type</label>
//                         <Field
//                             as="select"
//                             name="user_type"
//                             className="form-control"
//                             onChange={(e) => {
//                                 setSelectedUserType(e.target.value);
//                                 setFieldValue("user_type", e.target.value);
//                             }}
//                         >
//                             <option value="">Select User Type</option>
//                             {user?.user_type === "vibhag" && <option value="jila">Jila</option>}
//                         </Field>
//                         <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
//                     </div>

//                     {/* Jila Dropdown (Only for Vibhag creating Jila users) */}
//                     {user?.user_type === "vibhag" && selectedUserType === "jila" && (
//                         <div className="mb-3">
//                             <label className="form-label">Jila</label>
//                             <BootstrapForm.Select
//                                 name="jila"
//                                 onChange={(e) => setFieldValue("jila", e.target.value)}
//                             >
//                                 <option value="">Select Jila</option>
//                                 {jilaList.length > 0 ? (
//                                     jilaList.map((jila) => (
//                                         <option key={jila._id} value={jila.jila_name}>
//                                             {jila.jila_name}
//                                         </option>
//                                     ))
//                                 ) : (
//                                     <option disabled>No Jila available</option>
//                                 )}
//                             </BootstrapForm.Select>

//                         </div>
//                     )}

//                     {/* Other Fields */}
//                     <div className="mb-3">
//                         <label className="form-label">User Name</label>
//                         <Field type="text" name="user_name" className="form-control" />
//                         <ErrorMessage name="user_name" component="div" className="text-danger mt-1" />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Full Name</label>
//                         <Field type="text" name="full_name" className="form-control" />
//                         <ErrorMessage name="full_name" component="div" className="text-danger mt-1" />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Email</label>
//                         <Field type="email" name="email" className="form-control" />
//                         <ErrorMessage name="email" component="div" className="text-danger mt-1" />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Phone</label>
//                         <Field type="text" name="mobile" className="form-control" />
//                         <ErrorMessage name="mobile" component="div" className="text-danger mt-1" />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Password</label>
//                         <Field type="password" name="password" className="form-control" />
//                         <ErrorMessage name="password" component="div" className="text-danger mt-1" />
//                     </div>

//                     {/* Submit Button */}
//                     <div className="d-flex justify-content-center">
//                         <Button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
//                             {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
//                         </Button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default CreateUser;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const CreateUser = ({ user_type }) => {
//   const [hierarchyData, setHierarchyData] = useState(null);
//   const [levelList, setLevelList] = useState([]);
//   const [selectedKshetra, setSelectedKshetra] = useState("");
//   const [selectedPrant, setSelectedPrant] = useState("");
//   const [selectedVibhag, setSelectedVibhag] = useState("");
//   const [selectedJila, setSelectedJila] = useState("");

//   useEffect(() => {
//     if (user_type === "kendra" || user_type === "kshetra") {
//       axios
//         .get(`${BASE_URL}/api/v1/hierarchy`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         })
//         .then((response) => {
//           console.log("Hierarchy API Response:", response.data);
//           setHierarchyData(response.data || {});
//         })
//         .catch((error) => console.error("Error fetching hierarchy data:", error));
//     }
//   }, [user_type]);

//   useEffect(() => {
//     if (user_type === "kendra") {
//       setLevelList(["kshetra", "prant", "vibhag", "jila"]);
//     } else if (user_type === "kshetra") {
//       setLevelList(["prant", "vibhag", "jila"]);
//     } else if (user_type === "prant") {
//       setLevelList(["vibhag", "jila"]);
//     } else if (user_type === "vibhag") {
//       setLevelList(["jila"]);
//     } else {
//       setLevelList([]);
//     }
//   }, [user_type]);

//   return (
//     <div>
//       {levelList.includes("kshetra") && (
//         <select onChange={(e) => setSelectedKshetra(e.target.value)}>
//           <option value="">Select Kshetra</option>
//           {hierarchyData?.kshetras?.map((kshetra) => (
//             <option key={kshetra._id} value={kshetra._id}>{kshetra.name}</option>
//           ))}
//         </select>
//       )}

//       {levelList.includes("prant") && selectedKshetra && (
//         <select onChange={(e) => setSelectedPrant(e.target.value)}>
//           <option value="">Select Prant</option>
//           {hierarchyData?.kshetras?.find(k => k._id === selectedKshetra)?.prants?.map((prant) => (
//             <option key={prant._id} value={prant._id}>{prant.name}</option>
//           ))}
//         </select>
//       )}

//       {levelList.includes("vibhag") && selectedPrant && (
//         <select onChange={(e) => setSelectedVibhag(e.target.value)}>
//           <option value="">Select Vibhag</option>
//           {hierarchyData?.kshetras?.flatMap(k => k.prants)
//             .find(p => p._id === selectedPrant)?.vibhags?.map((vibhag) => (
//               <option key={vibhag._id} value={vibhag._id}>{vibhag.name}</option>
//           ))}
//         </select>
//       )}

//       {levelList.includes("jila") && selectedVibhag && (
//         <select onChange={(e) => setSelectedJila(e.target.value)}>
//           <option value="">Select Jila</option>
//           {hierarchyData?.kshetras?.flatMap(k => k.prants)
//             .flatMap(p => p.vibhags)
//             .find(v => v._id === selectedVibhag)?.jilas?.map((jila) => (
//               <option key={jila._id} value={jila._id}>{jila.name}</option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default CreateUser;



































import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchHierarchy } from "../redux/slice/hierarchySlice";
import { Button, Spinner, Form as BootstrapForm } from "react-bootstrap";

const CreateUser = () => {
  const dispatch = useDispatch();
  const { data: hierarchyData, loading } = useSelector((state) => state.hierarchy);
  const { user_type: loggedInUserType } = useSelector((state) => state.auth.user);
  
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedKshetra, setSelectedKshetra] = useState("");
  const [selectedPrant, setSelectedPrant] = useState("");
  const [selectedVibhag, setSelectedVibhag] = useState("");

  useEffect(() => {
    dispatch(fetchHierarchy());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        user_type: "",
        user_name: "",
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        kshetra: "",
        prant: "",
        vibhag: "",
        jila: "",
      }}
      onSubmit={(values) => {}}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          {/* User Type Dropdown */}
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <Field
              as="select"
              name="user_type"
              className="form-control"
              onChange={(e) => {
                setSelectedUserType(e.target.value);
                setFieldValue("user_type", e.target.value);
              }}
            >
              <option value="">Select User Type</option>
              {loggedInUserType === "kshetra" && (
                <>
                  <option value="prant">Prant</option>
                  <option value="vibhag">Vibhag</option>
                  <option value="jila">Jila</option>
                </>
              )}
            </Field>
            <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
          </div>

          {/* Prant Dropdown */}
          {(selectedUserType === "prant" || selectedUserType === "vibhag" || selectedUserType === "jila") && (
            <div className="mb-3">
              <label className="form-label">Prant</label>
              <BootstrapForm.Select
                value={selectedPrant}
                onChange={(e) => {
                  setSelectedPrant(e.target.value);
                  setFieldValue("prant", e.target.value);
                }}
              >
                <option value="">Select Prant</option>
                {hierarchyData?.[0]?.kshetras?.flatMap(k => k.prants)?.map(prant => (
                  <option key={prant._id} value={prant.prant_name}>{prant.prant_name}</option>
                ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Vibhag Dropdown */}
          {(selectedUserType === "vibhag" || selectedUserType === "jila") && (
            <div className="mb-3">
              <label className="form-label">Vibhag</label>
              <BootstrapForm.Select
                value={selectedVibhag}
                onChange={(e) => {
                  setSelectedVibhag(e.target.value);
                  setFieldValue("vibhag", e.target.value);
                }}
              >
                <option value="">Select Vibhag</option>
                {hierarchyData?.[0]?.kshetras?.flatMap(k => k.prants)?.flatMap(p => p.vibhags)?.map(vibhag => (
                  <option key={vibhag._id} value={vibhag.vibhag_name}>{vibhag.vibhag_name}</option>
                ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Jila Dropdown */}
          {selectedUserType === "jila" && (
            <div className="mb-3">
              <label className="form-label">Jila</label>
              <BootstrapForm.Select
                name="jila"
                onChange={(e) => setFieldValue("jila", e.target.value)}
              >
                <option value="">Select Jila</option>
                {hierarchyData?.[0]?.kshetras?.flatMap(k => k.prants)?.flatMap(p => p.vibhags)?.flatMap(v => v.jilas)?.map(jila => (
                  <option key={jila._id} value={jila.jila_name}>{jila.jila_name}</option>
                ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
              {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;
