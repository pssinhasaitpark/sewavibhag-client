import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaDollarSign, FaShoppingCart, FaThLarge, FaStar } from "react-icons/fa";

const statsData = [
  {
    "icon": "AttachMoney",
    "title": "Revenue",
    "value": "$13,456.5",
    "description": "Shipping fees are not included",
    "color": "#4caf50"
  },
  {
    "icon": "ShoppingCart",
    "title": "Orders",
    "value": "53,668",
    "description": "Excluding orders in transit",
    "color": "#66bb6a"
  },
  {
    "icon": "Category",
    "title": "Products",
    "value": "9,856",
    "description": "In 19 Categories",
    "color": "#ffa726"
  },
  {
    "icon": "Star",
    "title": "Monthly Earning",
    "value": "$6,982",
    "description": "Based on your local time",
    "color": "#42a5f5"
  }
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
    <Container className="py-3 position-fixed">
      <div className="text-end mb-3">
        <Button style={{ backgroundColor: "#3bb77e", border: "none" }}>
          Create Report
        </Button>
      </div>
      <h5 className="fw-bold">Dashboard</h5>
      <p className="text-secondary fw-bold">Whole data about your business here</p>
      <Row className="g-3 justify-content-center">
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} md={3} key={index}>
            <Card className="text-center p-3 shadow-sm border-0" style={{ margin: "10px" }}>
              <div style={{ color: stat.color }}>{iconMapping[stat.icon]}</div>
              <Card.Body>
                <h6 className="mt-2">{stat.title}</h6>
                <h5 className="fw-bold mt-2">{stat.value}</h5>
                <p className="text-muted small">{stat.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
