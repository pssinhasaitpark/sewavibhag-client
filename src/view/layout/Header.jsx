import React, { useState, useEffect } from "react";
import { Navbar, Dropdown, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/slice/profileSlice";
import { logout } from "../redux/slice/AuthSlice";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user details from Redux store
  const user = useSelector((state) => state.auth.user);
  const userType = user?.user_type;

  // Fetch hierarchical names from Redux store
  const { kshetraName, prantName, vibhagName, jilaName, kendraName } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUser()).unwrap().then((res) => {
    }).catch((err) => {
      console.error("Error Fetching User:", err);
    });
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowDropdown(false);
  };

  const getDisplayName = () => {
    if (!user) return "Loading...";
    switch (userType) {
      case "kshetra":
        return kshetraName;
      case "prant":
        return `${kshetraName} / ${prantName}`;
      case "vibhag":
        return `${kshetraName} / ${prantName} / ${vibhagName}`;
      case "jila":
        return `${kshetraName} / ${prantName} / ${vibhagName} / ${jilaName}`;
      case "kendra":
        return kendraName;
      default:
        return "No Name Available";
    }
  };








  return (
    <Navbar bg="light" className="border-bottom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <div></div>

        {/* Display user type and hierarchical names */}
        <div className="d-flex align-items-center user-container">
          <h6 className="m-0 me-1">
            {user?.user_type
              ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1).toLowerCase()
              : "Loading..."}
          </h6>

          <h6 className="m-0 me-2">: {getDisplayName()}</h6>
          <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
            <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
              <FaUserCircle size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item as={Link} to="/dashboard/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
