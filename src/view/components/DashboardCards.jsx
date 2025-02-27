

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import fieldLabels from "./FiledLabels";
import Loader from "../components/Loader/Loader"; // Importing the Loader component
import { JilaTranslation, kshetraTranslation, PrantTranslation, VibhagTranslation } from "./Fileds";

const DashboardCards = () => {
  const user = useSelector((state) => state.auth.user);
  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];

  const userType = user?.user_type;
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details and dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://sewavibhag-api.vercel.app/api/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setDashboardData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
 


  const translateName = (name, translationMap) => {
    if (language.trim() === "hindi" && translationMap[name]) {
      return translationMap[name];
    }
    return name; 
  };


  // Define cards based on user_type and fetched data
  const getCards = () => {
    const translatedKshetra = translateName(dashboardData.kshetra_name, kshetraTranslation);
    const translatedPrant = translateName(dashboardData.prant_name, PrantTranslation);
    const translatedVibhag = translateName(dashboardData.vibhag_name, VibhagTranslation);
    const translatedJila = translateName(dashboardData.jila_name, JilaTranslation);
    if (!dashboardData) return [];

    switch (userType) {
      case "kendra":
        return [
          { title: labels?.ToatalKshetra, value: dashboardData.total_kshetras || "N/A", color: "#4caf50" },
          { title: labels?.ToatalPrant, value: dashboardData.total_prants || "N/A", color: "#66bb6a" },
          { title: labels?.TotalVibhag, value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: labels?.TotalJila, value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "kshetra":
        return [
          { title: labels?.ToatalKshetra, value: translatedKshetra || "N/A", color: "#4caf50" },
          { title: labels?.ToatalPrant, value: dashboardData.total_prants || "N/A", color: "#66bb6a" },
          { title: labels?.TotalVibhag, value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: labels?.TotalJila, value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "prant":
        return [
          { title: labels?.ToatalPrant, value: translatedPrant || "N/A", color: "#4caf50" },
          { title: labels?.TotalVibhag, value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: labels?.TotalJila, value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "vibhag":
        return [
          { title: labels?.TotalVibhag, value: translatedVibhag || "N/A", color: "#ffa726" },
          { title: labels?.TotalJila, value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "jila":
        return [
          { title: labels?.TotalJila, value: translatedJila || "N/A", color: "#42a5f5" },
        ];
      default:
        return [];
    }
  };
  if (loading || error) {
    return <Loader loading={loading} error={error} />;
  }

  const cards = getCards();

  return (
    <Container className="py-3">
      <Row className="g-3 justify-content-center">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="text-center p-3 shadow-sm border-0"
                style={{ margin: "10px", backgroundColor: card.color }}
              >
                <Card.Body>
                  <strong>{card.title}</strong>
                  <div className="fw-bold">{card.value}</div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h5 className="text-center text-muted">{labels?.NoDataAvailable}</h5>
        )}
      </Row>
    </Container>
  );
};

export default DashboardCards;
