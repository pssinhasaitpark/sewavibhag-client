import React, { useState } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
    setShowDropdown(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 border-bottom">
      <Navbar.Toggle
        className="text-right ml-auto" // This will position the hamburger on the right
        aria-controls="basic-navbar-nav"
        onClick={onMenuClick} // Pass the onMenuClick function here to toggle the sidebar
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>
            <FaUserCircle size={24} className="ms-2" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
