


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const DashboardCards = () => {
  const user = useSelector((state) => state.auth.user);
  const userType = user?.user_type;
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch user details and dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://sewavibhag-api.vercel.app/api/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming you're using a token for authentication
          },
        });

        setDashboardData(response.data.data); // store the data from the API
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Define cards based on user_type and fetched data
  const getCards = () => {
    if (!dashboardData) return []; // Return empty if no data is available

    switch (userType) {
      case "kendra":
        return [
          { title: "Total Kshetra", value: dashboardData.total_kshetras || "N/A", color: "#4caf50" },
          { title: "Total Prant", value: dashboardData.total_prants || "N/A", color: "#66bb6a" },
          { title: "Total Vibhag", value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: "Total Jila", value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "kshetra":
        return [
          { title: "Kshetra Name", value: dashboardData.kshetra_name || "N/A", color: "#4caf50" },
          { title: "Total Prant", value: dashboardData.total_prants || "N/A", color: "#66bb6a" },
          { title: "Total Vibhag", value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: "Total Jila", value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "prant":
        return [
          { title: "Prant Name", value: dashboardData.prant_name || "N/A", color: "#4caf50" },
          { title: "Total Vibhag", value: dashboardData.total_vibhags || "N/A", color: "#ffa726" },
          { title: "Total Jila", value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "vibhag":
        return [
          { title: "Vibhag Name", value: dashboardData.vibhag_name || "N/A", color: "#ffa726" },
          { title: "Total Jila", value: dashboardData.total_jilas || "N/A", color: "#42a5f5" },
        ];
      case "jila":
        return [
          { title: "Jila Name", value: dashboardData.jila_name || "N/A", color: "#42a5f5" },
        ];
      default:
        return [];
    }
  };

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
          <h5 className="text-center text-muted">No Data Available</h5>
        )}
      </Row>
    </Container>
  );
};

export default DashboardCards;
