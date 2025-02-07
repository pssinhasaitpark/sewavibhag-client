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
      <Row className="g-3 justify-content-center">
        <Col xs={12} md={12} className="mb-3">
          <Card
            className="text-center p-3 shadow-sm border-0"
            style={{ margin: "10px", backgroundColor: "#f7f7f7" }}
          >
            <Card.Body>
              <div className="row text-center">
                <div className="col">
                  <strong>Prant Name</strong>
                  <div className="fw-bold">Malwa</div>
                </div>
                <div className="col">
                  <strong>Vibhag Name</strong>
                  <div className="fw-bold">DEWAS</div>
                </div>
                <div className="col">
                  <strong>Jila Name</strong>
                  <div className="fw-bold">SHAJAPUR</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
    
    </Container>
  );
};

export default Dashboard;

