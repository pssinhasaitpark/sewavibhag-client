import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsCookie } from "react-icons/bs";
import "./PageNotFound.css"
const PageNotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1">
        404 <BsCookie size={50} />
      </h1>
      <h4>Oops! Page not found</h4>
      <p className="text-muted" style={{ maxWidth: "600px" }}>
        It looks like you may have taken a wrong turn. Don't worry... it happens
        to the best of us. Here's a little tip that might help you get back on
        track.
      </p>
      <Button
        as={Link}
        to="/"
        className="mt-3 d-flex align-items-center px-4 py-2 custom-404-btn"
      >
        <BsArrowLeft className="me-2" /> Back to Login Page
      </Button>
    </Container>
  );
};

export default PageNotFound;
