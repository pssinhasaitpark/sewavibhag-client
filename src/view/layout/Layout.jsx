import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css"; 

const Layout = ({ children }) => {
  return (
    <Container fluid className="layout-container">
      <Row>
        <Col xs={12} md={3} lg={2} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col xs={12} md={5 } lg={8} className="content-col">
          <Header />
          <div className="main-content">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
