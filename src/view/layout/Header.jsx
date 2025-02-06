import React, { useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick, language, onLanguageChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    setShowDropdown(false);
  };


  return (
    <Navbar bg="light" expand="lg" className="px-3 border-bottom">
      {/* Move the hamburger icon to the right side */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={onMenuClick}
        className="ml-auto" // This ensures the hamburger icon is pushed to the right
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav className="ms-auto"> {/* Align the user profile and language switch to the right */}
          <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
            <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
              <FaUserCircle size={24} className="ms-2" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          
    
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
