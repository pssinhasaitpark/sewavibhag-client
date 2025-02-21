


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Toast } from "react-bootstrap";
import { fetchUser, updateUser } from "../../redux/slice/profileSlice";
import { FaUserCircle } from "react-icons/fa";
import "./ProfilePage.css"

import { FaPencilAlt } from "react-icons/fa";
import fieldLabels from "../../components/FiledLabels";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];

  const userData = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.profile.token) || localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [editField, setEditField] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
            <Card className="shadow-sm text-center p-3 h-100 ">
              <Card.Body className="d-flex flex-column align-items-center">
                <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                  <FaUserCircle size={100} />
                </label>

                <h5 className="mb-1">{profile?.user?.full_name || "User Name"}</h5>
                <p className="text-muted">{getUserDesignation()}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} md={6} sm={12}>
            <Card className="shadow-sm p-3 h-100 ">
              <Card.Body className="d-flex flex-column justify-content-between">
                {[`${fieldLabels[language]?.FULLNAME}`, `${fieldLabels[language]?.EMAIL}`,`${fieldLabels[language]?.MOBILE}`].map((field) => (
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

                            style={{
                              backgroundColor: "white", // Keep background white
                              color: "black",
                              border: "1px solid #ced4da",
                            }}
                            className="custom-input"
                          />

                        ) : (
                          <span className="text-muted">{profile?.user?.[field] || "Not provided"}</span>
                        )}
                      </Col>
                      <Col sm={1} className="text-end">
                        <svg
                          className="edit-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => setEditField(field)}
                        >
                          <path
                            d="M12.146 0.146a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-9.792 9.792a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.65-.65l1.5-4a.5.5 0 0 1 .11-.168l9.792-9.792zM11.5 3l1.5-1.5 1.5 1.5-1.5 1.5L11.5 3zm-1 1l1.5 1.5-7.646 7.646a.5.5 0 0 1-.168.11l-1.646.617.617-1.646a.5.5 0 0 1 .11-.168L10.5 4z"
                          />
                        </svg>
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
