import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Toast,
} from "react-bootstrap";
import { fetchUser, updateUser } from "../../redux/slice/profileSlice"; // Import ProfileSlice
import { FaPencilAlt } from "react-icons/fa";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.profile.token) || localStorage.getItem("token");


  const defaultAvatar = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
  const [getProfile, setProfile] = useState("");


  const [editField, setEditField] = useState(null);
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Fetch user data from Redux
  useEffect(() => {
    if (!token) {
      console.error("No token found! Redirecting to login...");
      navigate("/login");
      return;
    }


    dispatch(fetchUser()).unwrap().then((user) => setProfile(()=>user?.data?.user))


  }, [dispatch, token, navigate]);

  // Update state when user data is fetched
  useEffect(() => {
    if (user) {
      setFullName(getProfile.full_name || "");
      setEmail(getProfile.email || "");
      setPhone(getProfile.phone || "");
      setMobile(getProfile.mobile || "");
      setAvatar(getProfile.avatar || defaultAvatar);
    }
  }, [getProfile]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        dispatch(updateUser({ ...user, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    if (!fullName || !email || !phone || !mobile) {
      setToastMessage("❌ Please fill out all fields before saving.");
      setToastVariant("danger");
    } else {
      const updatedUser = { full_name: fullName, email, phone, mobile, avatar };
      dispatch(updateUser(updatedUser))
        .then(() => {
          setToastMessage("✅ Changes saved successfully!");
          setToastVariant("success");
        })
        .catch(() => {
          setToastMessage("❌ Failed to save changes.");
          setToastVariant("danger");
        });

      setShowToast(true);
    }
  };


  console.log('gesdfsdfdsf', getProfile)


  return (
    <section className="profile-container">
      <Container className="py-5">
        <Row className="g-4">
          {/* Profile Image & Basic Info */}
          <Col lg={5} md={6} sm={12}>
            <Card className="shadow-sm text-center p-3 h-100 profile-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                  <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-muted">
                    <span className="ms-2">Change Profile Picture</span>{" "}
                    <FaPencilAlt />
                  </div>
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <h5 className="mb-1">{fullName}</h5>
                <p className="text-muted">
                  {user?.user_type || "User Type Not Available"}
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Editable User Information */}
          <Col lg={7} md={6} sm={12}>
            <Card className="shadow-sm p-3 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                {[
                  {
                    label: "Full Name",
                    value: fullName,
                    setValue: setFullName,
                    field: "full_name",
                  },
                  {
                    label: "Email",
                    value: email,
                    setValue: setEmail,
                    field: "email",
                  },
           
                  {
                    label: "Mobile",
                    value: mobile,
                    setValue: setMobile,
                    field: "mobile",
                  },
                ].map(({ label, value, setValue, field }) => (
                  <div key={field}>
                    <Row className="mb-2">
                      <Col sm={4}>
                        <strong>{label}</strong>
                      </Col>
                      <Col sm={7}>
                        {editField === field ? (
                          <Form.Control
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => setEditField(null)}
                            autoFocus
                          />
                        ) : (
                          <span className="text-muted">{value}</span>
                        )}
                      </Col>
                      <Col sm={1} className="text-end">
                        <FaPencilAlt
                          onClick={() => setEditField(field)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

                

        {/* Toast Notification */}
        <Row className="justify-content-center">
          <Col xs={12}>
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
              className={`position-fixed bg-${toastVariant} text-white d-flex d-sm-block top-0 end-0 me-3`}
              style={{ marginTop: "100px" }}
            >
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// import React, { useState } from "react";
// import { Table, Button } from "react-bootstrap";

// const CollapsibleTable = () => {
//   const [expandedKshettras, setExpandedKshettras] = useState({});

//   const data = [
//     {
//       name: "Dakshin",
//       sumDP1: 61,
//       sumDP2: 44,
//       prants: [
//         {
//           name: "D. Kerala",
//           sumDP1: 20,
//           sumDP2: 29,
//           vibhags: [
//             {
//               name: "Test11",
//               sumDP1: 20,
//               sumDP2: 29,
//               jilas: [
//                 { name: "Test 101", sumDP1: 2, sumDP2: 23 },
//                 { name: "Test 102", sumDP1: 18, sumDP2: 6 }
//               ]
//             }
//           ]
//         },
//         {
//           name: "DTN",
//           sumDP1: 16,
//           sumDP2: 10,
//           vibhags: [
//             {
//               name: "Test104",
//               sumDP1: 16,
//               sumDP2: 10,
//               jilas: [{ name: "Test 104", sumDP1: 16, sumDP2: 10 }]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Dakshin Madhya",
//       sumDP1: 46,
//       sumDP2: 56,
//       prants: []
//     },
//     {
//       name: "Madhya",
//       sumDP1: 143,
//       sumDP2: 170,
//       prants: []
//     },
//     {
//       name: "Paschim",
//       sumDP1: 89,
//       sumDP2: 66,
//       prants: []
//     }
//   ];

//   const toggleKshettra = (kshettra) => {
//     setExpandedKshettras((prev) => ({
//       ...prev,
//       [kshettra]: !prev[kshettra],
//     }));
//   };

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Kshettra</th>
//           <th>Prant</th>
//           <th>Vibhag</th>
//           <th>Jila</th>
//           <th>Sum of DP1</th>
//           <th>Sum of DP2</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((kshettra) => (
//           <React.Fragment key={kshettra.name}>
//             {/* Kshettra Row */}
//             <tr>
//               <td>
//                 <Button variant="link" onClick={() => toggleKshettra(kshettra.name)}>
//                   {expandedKshettras[kshettra.name] ? "▼" : "▶"} {kshettra.name}
//                 </Button>
//               </td>
//               <td colSpan="2"></td>
//               <td></td>
//               <td>{kshettra.sumDP1}</td>
//               <td>{kshettra.sumDP2}</td>
//             </tr>

//             {/* Expand Prant only when Kshettra is expanded */}
//             {expandedKshettras[kshettra.name] &&
//               kshettra.prants.length > 0 &&
//               kshettra.prants.map((prant) => (
//                 <tr key={prant.name}>
//                   <td></td>
//                   <td>{prant.name}</td>
//                   <td colSpan="2"></td>
//                   <td>{prant.sumDP1}</td>
//                   <td>{prant.sumDP2}</td>
//                 </tr>
//               ))}

//             {/* Expand Vibhag only when Kshettra is expanded */}
//             {expandedKshettras[kshettra.name] &&
//               kshettra.prants.map((prant) =>
//                 prant.vibhags.map((vibhag) => (
//                   <tr key={vibhag.name}>
//                     <td></td>
//                     <td></td>
//                     <td>{vibhag.name}</td>
//                     <td></td>
//                     <td>{vibhag.sumDP1}</td>
//                     <td>{vibhag.sumDP2}</td>
//                   </tr>
//                 ))
//               )}

//             {/* Expand Jila only when Kshettra is expanded */}
//             {expandedKshettras[kshettra.name] &&
//               kshettra.prants.map((prant) =>
//                 prant.vibhags.map((vibhag) =>
//                   vibhag.jilas.map((jila) => (
//                     <tr key={jila.name}>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td>{jila.name}</td>
//                       <td>{jila.sumDP1}</td>
//                       <td>{jila.sumDP2}</td>
//                     </tr>
//                   ))
//                 )
//               )}
//           </React.Fragment>
//         ))}

//         {/* Total Row */}
//         <tr>
//           <td colSpan="4" style={{ fontWeight: "bold" }}>
//             Total Result
//           </td>
//           <td style={{ fontWeight: "bold" }}>
//             {data.reduce((total, kshettra) => total + kshettra.sumDP1, 0)}
//           </td>
//           <td style={{ fontWeight: "bold" }}>
//             {data.reduce((total, kshettra) => total + kshettra.sumDP2, 0)}
//           </td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// };

// export default CollapsibleTable;
