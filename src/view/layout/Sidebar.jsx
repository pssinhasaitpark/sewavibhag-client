import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRocket,
  FaUsers,
  FaTasks,
  FaTv,
  FaUserShield,
  FaMapMarkerAlt,
  FaBars, // Added hamburger icon
} from "react-icons/fa";
import sidelogo from "../../assests/sewavibhag.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-white ${isOpen ? "d-block" : "d-none"} d-md-block`}
        style={{
          width: "250px",
          minHeight: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <div className="d-flex flex-column align-items-center py-4">
          <img
            alt="RSS logo with an orange flag and text in Hindi and English"
            className="mb-4"
            src={sidelogo}
            style={{ width: "100px", height: "auto" }}
          />
        </div>

        <div className="px-3">
          <ul className="list-unstyled">
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaTv className="text-primary mr-2" />
                <span>Dashboard</span>
              </button>
            </li>

            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaUserShield className="text-warning mr-2" />
                <span>Create Sub Admin</span>
              </button>
            </li>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaMapMarkerAlt className="text-purple-500 mr-2" />
                <span>View Sub Admin</span>
              </button>
            </li>

            <hr />

            <div className="text-muted text-xs px-2">APP USER</div>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaRocket className="mr-2" />
                <span>Create User</span>
              </button>
            </li>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaUsers className="mr-2" />
                <span>View User</span>
              </button>
            </li>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaTasks className="mr-2" />
                <span>Assign Survey</span>
              </button>
            </li>

            <hr />

            <div className="text-muted text-xs px-2">NAGAR</div>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaRocket className="mr-2" />
                <span>Create Nagar</span>
              </button>
            </li>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaUsers className="mr-2" />
                <span>View Nagar</span>
              </button>
            </li>

            <hr />

            <div className="text-muted text-xs px-2">BASTI</div>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaRocket className="mr-2" />
                <span>Create Basti</span>
              </button>
            </li>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaUsers className="mr-2" />
                <span>View Basti</span>
              </button>
            </li>

            <hr />

            <div className="text-muted text-xs px-2">GRAM</div>
            <li>
              <button
                className="d-flex align-items-center p-2 text-dark hover:bg-light rounded mb-2"
                style={{ border: "none", background: "none" }}
              >
                <FaRocket className="mr-2" />
                <span>Create Gram</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className="d-md-none btn btn-primary p-2 m-3"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1050, 
        }}
      >
        <FaBars className="text-white" size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
