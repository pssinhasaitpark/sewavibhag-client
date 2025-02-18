


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Toast } from "react-bootstrap";
import { fetchUser, updateUser } from "../../redux/slice/profileSlice"; 
import { FaPencilAlt } from "react-icons/fa";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.profile.user);
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
      .then((res) => {
        if (res?.status === "success" && res?.data) {
          setProfile(res.data);
        }
      })
      .catch((error) => console.error("Failed to fetch user:", error));
  }, [dispatch, token, navigate]);

  const handleUpdate = (field, value) => {
    if (!profile?.user) return;
  
    const updatedUser = { ...profile.user, [field]: value };
    setProfile((prev) => ({ ...prev, user: updatedUser }));
  
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

  const getUserDesignation = () => {
    switch (profile?.user?.user_type) {
      case "prant":
        return profile?.prant_name ? `Prant: ${profile.prant_name}` : "Prant Not Available";
      case "vibhag":
        return profile?.vibhag_name ? `Vibhag: ${profile.vibhag_name}` : "Vibhag Not Available";
      case "jila":
        return profile?.jila_name ? `Jila: ${profile.jila_name}` : "Jila Not Available";
      case "kshetra":
        return profile?.kshetra_name ? `Kshetra: ${profile.kshetra_name}` : "Kshetra Not Available";
      case "kendra":
        return profile?.kendra_name ? `Kendra: ${profile.kendra_name}` : "Kendra Not Available";
      default:
        return "User Type Not Available";
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
                    src={profile?.user?.avatar || defaultAvatar}
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "110px", height: "110px", objectFit: "cover" }}
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
                <h5 className="mb-1">{profile?.user?.full_name || "User Name"}</h5>
                <p className="text-muted">{getUserDesignation()}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} md={6} sm={12}>
            <Card className="shadow-sm p-3 h-100 profile-card">
              <Card.Body className="d-flex flex-column justify-content-between">
                {["full_name", "email", "mobile"].map((field) => (
                  <div key={field}>
                    <Row className="mb-2">
                      <Col sm={4}><strong>{field.replace("_", " ").toUpperCase()}</strong></Col>
                      <Col sm={7}>
                        {editField === field ? (
                          <Form.Control
                            type="text"
                            value={profile?.user?.[field] || ""}
                            onChange={(e) => handleUpdate(field, e.target.value)}
                            onBlur={() => setEditField(null)}
                            autoFocus
                          />
                        ) : (
                          <span className="text-muted">{profile?.user?.[field] || "Not provided"}</span>
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
      </Container>
    </section>
  );
}
