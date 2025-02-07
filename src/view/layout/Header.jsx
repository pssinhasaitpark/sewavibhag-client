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
    <Navbar bg="light" className="px-3 border-bottom d-flex justify-content-end">
      <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
        <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
          <FaUserCircle size={24} className="ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
