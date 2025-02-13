import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Toast } from "react-bootstrap";
import { fetchUser, updateUser } from "../../redux/slice/profileSlice"; 
import { FaPencilAlt } from "react-icons/fa";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.profile.token) || localStorage.getItem("token");

  const defaultAvatar = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
  const [profile, setProfile] = useState(null);
  const [editField, setEditField] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  useEffect(() => {
    if (!token) {
      console.error("No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    dispatch(fetchUser())
      .unwrap()
      .then((user) => setProfile(user?.data?.user));
  }, [dispatch, token, navigate]);

  const handleUpdate = (field, value) => {
    if (!profile) return;
  
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
  
    dispatch(updateUser({ [field]: value })) 
      .unwrap()
      .then(() => {
        setToastMessage("✅ Changes saved successfully!");
        setToastVariant("success");
      })
      .catch(() => {
        setToastMessage("❌ Failed to save changes.");
        setToastVariant("danger");
      });
  
    setShowToast(true);
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleUpdate("avatar", reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="profile-container">
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={5} md={6} sm={12}>
            <Card className="shadow-sm text-center p-3 h-100 profile-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                  <img
                    src={profile?.avatar || defaultAvatar}
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-muted">
                    <span className="ms-2">Change Profile Picture</span> <FaPencilAlt />
                  </div>
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <h5 className="mb-1">{profile?.full_name || "User Name"}</h5>
                <p className="text-muted">{profile?.user_type || "User Type Not Available"}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} md={6} sm={12}>
            <Card className="shadow-sm p-3 h-100 profile-card">
              <Card.Body className="d-flex flex-column justify-content-between">
                {[
                  { label: "Full Name", value: profile?.full_name, field: "full_name" },
                  { label: "Email", value: profile?.email, field: "email" },
                  { label: "Mobile", value: profile?.mobile, field: "mobile" },
                ].map(({ label, value, field }) => (
                  <div key={field}>
                    <Row className="mb-2">
                      <Col sm={4}>
                        <strong>{label}</strong>
                      </Col>
                      <Col sm={7}>
                        {editField === field ? (
                          <Form.Control
                            type="text"
                            value={value || ""}
                            onChange={(e) => handleUpdate(field, e.target.value)}
                            onBlur={() => setEditField(null)}
                            autoFocus
                          />
                        ) : (
                          <span className="text-muted">{value || "Not provided"}</span>
                        )}
                      </Col>
                      <Col sm={1} className="text-end">
                        <FaPencilAlt onClick={() => setEditField(field)} style={{ cursor: "pointer" }} />
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
