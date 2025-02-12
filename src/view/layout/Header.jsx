import React, { useState, useEffect } from "react";
import { Navbar, Dropdown, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/AuthSlice";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [userType, setUserType] = useState("Guest");

  useEffect(() => {
    if (user?.user_type) {
      setUserType(
        user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)
      );
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowDropdown(false);
  };

  return (
    <Navbar bg="light" className="border-bottom">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Left empty div for spacing */}
        <div></div>

        {/* User Type placed before the profile icon */}
        <div className="d-flex align-items-center user-container">
          <h6 className="m-0 me-1">{userType}</h6>
          <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}
          >
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className="text-dark"
            >
              <FaUserCircle size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
