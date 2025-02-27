import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Toast } from "react-bootstrap";
import { fetchUser, updateUser } from "../../redux/slice/profileSlice";
import { FaUserCircle } from "react-icons/fa";
import "./ProfilePage.css";
import fieldLabels from "../../components/FiledLabels";
import { JilaTranslation, KendraTranslation, kshetraTranslation, PrantTranslation, VibhagTranslation } from "../../components/Fileds";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];

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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (!token) {
      console.error("No token found! Redirecting to login...");
      navigate("/");
      return;
    }

    dispatch(fetchUser())
      .unwrap()
      .then((res) => {
        if (res?.status === "success" && res?.data) {
          setProfile(res.data); // ✅ Store actual user data
        }
      })
      .catch((error) => console.error("Failed to fetch user:", error));
  }, [dispatch, token, navigate]);

  console.log("profile", profile);

  const handleUpdate = (field, value) => {
    if (!profile) return;

    const updatedUser = { ...profile, [field]: value };
    setProfile(updatedUser);

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

  const translateName = (name, translationMap) => {
    if (language.trim() === "hindi" && translationMap[name]) {
      return translationMap[name];
    }
    return name; 
  };

  const getUserDesignation = () => {
    const translatedKendra = translateName(profile?.kendra_name, KendraTranslation);
     const translatedKshetra = translateName(profile?.kshetra_name, kshetraTranslation);
        const translatedPrant = translateName(profile?.prant_name, PrantTranslation);
        const translatedVibhag = translateName(profile?.vibhag_name, VibhagTranslation);
        const translatedJila = translateName(profile?.jila_name, JilaTranslation);
    switch (profile?.user_type) {
      case "prant":
        return profile?.prant_name ? `${fieldLabels[language]?.Prant}: ${translatedPrant}` : "Prant Not Available";
      case "vibhag":
        return profile?.vibhag_name ? `${fieldLabels[language]?.Vibhag}: ${translatedVibhag}` : "Vibhag Not Available";
      case "jila":
        return profile?.jila_name ? `${fieldLabels[language]?.Jila}: ${translatedJila}` : "Jila Not Available";
      case "kshetra":
        return profile?.kshetra_name ? `${fieldLabels[language]?.Kshetra}: ${translatedKshetra}` : "Kshetra Not Available";
      case "kendra":
        return profile?.kendra_name ? `${fieldLabels[language]?.Kendra}: ${translatedKendra}` : "Kendra Not Available";
      default:
        return "User Type Not Available";
    }
  };

  return (
    <section className="profile-container">
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={5} md={6} sm={12}>
            <Card className="shadow-sm text-center p-3 h-100">
              <Card.Body className="d-flex flex-column align-items-center">
                <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                  <FaUserCircle size={100} />
                </label>

                <h5 className="mb-1">{profile?.full_name || "User Name"}</h5>
                <p className="text-muted">{getUserDesignation()}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7} md={6} sm={12}>
            <Card className="shadow-sm p-3 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                {[
                  { label: labels?.FULLNAME, key: "full_name" },
                  { label: labels?.EMAIL, key: "email" },
                  { label: labels?.MOBILE, key: "mobile" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <Row className="mb-2">
                      <Col sm={4}>
                        <strong>{label}</strong>
                      </Col>
                      <Col sm={7}>
                        {editField === key ? (
                          <Form.Control
                            type="text"
                            value={profile?.[key] || ""}
                            onChange={(e) => handleUpdate(key, e.target.value)}
                            onBlur={() => setEditField(null)}
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              border: "1px solid #ced4da",
                            }}
                            className="custom-input"
                          />
                        ) : (
                          <span className="text-muted">{profile?.[key] || "Not provided"}</span>
                        )}
                      </Col>
                      <Col sm={1} className="text-end">
                        <svg
                          className="edit-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => setEditField(key)}
                          style={{ cursor: "pointer" }}
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

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: toastVariant === "success" ? "#28a745" : "#dc3545",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </section>
  );
}
