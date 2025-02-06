import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "./DashboardCards.css"
import {
  FaDollarSign,
  FaShoppingCart,
  FaThLarge,
  FaStar,
} from "react-icons/fa";

const statsData = [
  {
    icon: "Category",
    value: <></>,
    color: "#9c27b0",
    isWide: true,
  },
  {
    title: "Total Kshetra ",
    value: "$13,456.5",
    color: "#4caf50",
  },
  {
    title: "Total Prant",
    value: "53,668",
    color: "#66bb6a",
  },
  {
    title: "Total Vibhag",
    value: "9,856",
    color: "#ffa726",
  },
  {
    title: "Total Jila",
    value: "$6,982",
    color: "#42a5f5",
  },
  {
    title: "Total Reporting Forms",
    value: "$6,982",
    color: "#42a5f5",
  },
];

const iconMapping = {
  AttachMoney: <FaDollarSign size={24} />,
  ShoppingCart: <FaShoppingCart size={24} />,
  Category: <FaThLarge size={24} />,
  Star: <FaStar size={24} />,
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats(statsData);
  }, []);

  return (
    <Container className="py-3 cards_wholedata">
      <div className="text-end mb-3"></div>
      <h5 className="fw-bold">Dashboard</h5>
      <p className="text-secondary fw-bold">Whole data about your business here</p>

      {/* Stats Summary Card */}
      <Row className="g-3 justify-content-center">
  {/* Card for Prant Name */}
  <Col xs={12} sm={4} md={3}>
    <Card
      className="text-center p-3 shadow-sm border-0"
      style={{ margin: "10px", backgroundColor: "#f7f7f7" }}
    >
      <Card.Body>
        <strong>Prant Name</strong>
        <div className="fw-bold">Malwa</div>
      </Card.Body>
    </Card>
  </Col>

  {/* Card for Vibhag Name */}
  <Col xs={12} sm={4} md={3}>
    <Card
      className="text-center p-3 shadow-sm border-0"
      style={{ margin: "10px", backgroundColor: "#f7f7f7" }}
    >
      <Card.Body>
        <strong>Vibhag Name</strong>
        <div className="fw-bold">DEWAS</div>
      </Card.Body>
    </Card>
  </Col>

  {/* Card for Jila Name */}
  <Col xs={12} sm={4} md={3}>
    <Card
      className="text-center p-3 shadow-sm border-0"
      style={{ margin: "10px", backgroundColor: "#f7f7f7" }}
    >
      <Card.Body>
        <strong>Jila Name</strong>
        <div className="fw-bold">SHAJAPUR</div>
      </Card.Body>
    </Card>
  </Col>
</Row>


      {/* Stats Cards */}
      <Row className="g-3 justify-content-center">
        {stats.slice(1).map((stat, index) => (
          <Col xs={12} sm={6} md={4} lg={2} key={index} className="d-flex justify-content-center">
            <Card
              className="text-center p-3 shadow-sm border-0"
              style={{
                minWidth: "180px",
                backgroundColor: "#f7f7f7",
                borderRadius: "8px", // Added border radius for a more rounded look
                padding: "20px", // Added some internal padding for better content spacing
              }}
            >
              <div
                style={{
                  color: stat.color,
                  fontSize: "24px", // Larger icons for better visibility
                }}
              >
                {iconMapping[stat.icon]}
              </div>
              <Card.Body className="p-2">
                <h6 className="mt-2" style={{ fontSize: "14px" }}>
                  {stat.title}
                </h6>
                <h5 className="fw-bold mt-1" style={{ fontSize: "16px" }}>
                  {stat.value}
                </h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;

