import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const DashboardCards = () => {
  const user = useSelector((state) => state.auth.user); 
  const userType = user?.user_type; 
  const jilaName = user?.jila_name || "Jila XYZ"; 

  // Define cards based on user_type
  const getCards = () => {
    switch (userType) {
      case "kendra":
        return [
          { title: "Total Kshetra", value: "10", color: "#4caf50" },
          { title: "Total Prant", value: "46", color: "#66bb6a" },
          { title: "Total Vibhag", value: "318", color: "#ffa726" },
          { title: "Total Jila", value: "1100", color: "#42a5f5" },
        ];
      case "kshetra":
        return [
          { title: "Kshetra Name", value: "Kshetra XYZ", color: "#4caf50" },
          { title: "Total Prant", value: "46", color: "#66bb6a" },
          { title: "Total Vibhag", value: "318", color: "#ffa726" },
          { title: "Total Jila", value: "1100", color: "#42a5f5" },
        ];
      case "prant":
        return [
          { title: "Prant Name", value: "Prant ABC", color: "#4caf50" },
          { title: "Total Vibhag", value: "318", color: "#ffa726" },
          { title: "Total Jila", value: "1100", color: "#42a5f5" },
        ];
      case "vibhag":
        return [
          { title: "Vibhag Name", value: "Vibhag XYZ", color: "#ffa726" },
          { title: "Total Jila", value: "1100", color: "#42a5f5" },
        ];
      case "jila":
        return [
          { title: "Jila Name", value: jilaName, color: "#42a5f5" }, 
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
