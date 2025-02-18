// import React, { useState, useEffect } from "react";
// import { Navbar, Dropdown, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slice/AuthSlice";
// import "./Header.css";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const [userType, setUserType] = useState("Guest");

//   useEffect(() => {
//     if (user?.user_type) {
//       setUserType(
//         user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)
//       );
//     }
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//     setShowDropdown(false);
//   };

//   return (
//     <Navbar bg="light" className="border-bottom">
//       <Container
//         fluid
//         className="d-flex justify-content-between align-items-center"
//       >
//         {/* Left empty div for spacing */}
//         <div></div>

//         {/* User Type placed before the profile icon */}
//         <div className="d-flex align-items-center user-container">
//           <h6 className="m-0 me-1">{userType}</h6>
//           <Dropdown
//             show={showDropdown}
//             onToggle={() => setShowDropdown(!showDropdown)}
//           >
//             <Dropdown.Toggle
//               variant="link"
//               id="dropdown-user"
//               className="text-dark"
//             >
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;


// import React, { useState, useEffect } from "react";
// import { Navbar, Dropdown, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slice/AuthSlice";
// import "./Header.css";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);
//   const [userType, setUserType] = useState("Guest");
//   const [displayName, setDisplayName] = useState("");

//   useEffect(() => {
//     if (user) {
//       // Set user type (kendra, prant, etc.)
//       setUserType(
//         user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : "Guest"
//       );

//       // Construct display name based on user levels (kendra, prant, vibhag, etc.)
//       let nameParts = [];
//       if (user.kshetra_name) nameParts.push(user.kshetra_name);
//       if (user.prant_name) nameParts.push(user.prant_name);
//       if (user.vibhag_name) nameParts.push(user.vibhag_name);
//       if (user.jila_name) nameParts.push(user.jila_name);

//       setDisplayName(nameParts.join(" / "));
//     }
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//     setShowDropdown(false);
//   };

//   return (
//     <Navbar bg="light" className="border-bottom">
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         {/* Left empty div for spacing */}
//         <div></div>

//         {/* Display user type and name */}
//         <div className="d-flex align-items-center user-container">
//           <h6 className="m-0 me-1">{userType} </h6>
//           <h6 className="m-0 me-2">{displayName || "Loading..."}</h6> {/* Displaying dynamic name */}
//           <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
//             <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;






// import React, { useState, useEffect } from "react";
// import { Navbar, Dropdown, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slice/AuthSlice";
// import "./Header.css";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get the user data from Redux store
//   const user = useSelector((state) => state.auth.user);
//   const [userType, setUserType] = useState("Guest");
//   const [displayName, setDisplayName] = useState("");

//   useEffect(() => {
//     if (user) {
//       console.log("User data:", user); // Debugging the user data to ensure it is correct

//       // Set user type (kendra, prant, etc.)
//       setUserType(
//         user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : "Guest"
//       );

//       // Construct the display name based on the user's type and hierarchy
//       let nameParts = [];

//       // Always include kshetra_name if available
//       if (user.kshetra_name) nameParts.push(user.kshetra_name);

//       // Include prant_name if available, depending on user type
//       if (user.user_type === "prant" || user.user_type === "vibhag" || user.user_type === "jila") {
//         if (user.prant_name) nameParts.push(user.prant_name);
//       }

//       // Include vibhag_name if available, depending on user type
//       if (user.user_type === "vibhag" || user.user_type === "jila") {
//         if (user.vibhag_name) nameParts.push(user.vibhag_name);
//       }

//       // Include jila_name if available, depending on user type
//       if (user.user_type === "jila") {
//         if (user.jila_name) nameParts.push(user.jila_name);
//       }

//       // Set the final display name, or fallback if no name is found
//       setDisplayName(nameParts.length > 0 ? nameParts.join(" / ") : "No Name Available");
//       console.log("Display Name:", nameParts.join(" / ")); // Debugging the final display name
//     }
//   }, [user]); // Re-run effect when `user` changes

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//     setShowDropdown(false);
//   };

//   return (
//     <Navbar bg="light" className="border-bottom">
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         <div></div>

//         {/* Display user type and name */}
//         <div className="d-flex align-items-center user-container">
//           <h6 className="m-0 me-1">{userType} </h6>
//           <h6 className="m-0 me-2">{displayName || "Loading..."}</h6> {/* Displaying dynamic name */}
//           <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
//             <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from "react";
// import { Navbar, Dropdown, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUser } from "../redux/slice/profileSlice";
// import { logout } from "../redux/slice/AuthSlice";
// import "./Header.css";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//     const user = useSelector((state) => state.auth.user);
  
    
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get the user data from Redux store
//   const users = useSelector((state) => state.profile.user);
//   const userType = user?.user_type 
//   // const displayName = useSelector((state) => state.profile.displayName);

//   console.log("usrsssssss",userType);
//   console.log("usrsssssss????",users);


  

//   useEffect(() => {
//     // Dispatch the action to fetch user details
//     dispatch(fetchUser());
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//     setShowDropdown(false);
//   };

//   const getDisplayName = () => {
//     let nameParts = [];

//     if (!user) return "Loading...";

//     if (userType === "kendra") {
//       nameParts.push("Akhil Bharti");
//     }

//     if (userType === "kshetra") {
//       nameParts.push(user.kshetra_name || "Unknown Kshetra");
//     }

//     if (userType === "prant") {
//       if (users.kshetra_name) nameParts.push(users.kshetra_name);
//       if (users.prant_name) nameParts.push(users.prant_name);
//       else nameParts.push("Unknown Prant");
//     }

//     if (userType === "vibhag") {
//       if (user.kshetra_name) nameParts.push(user.kshetra_name);
//       if (user.prant_name) nameParts.push(user.prant_name);
//       if (user.vibhag_name) nameParts.push(user.vibhag_name);
//       else nameParts.push("Unknown Vibhag");
//     }

//     if (userType === "jila") {
//       if (user.kshetra_name) nameParts.push(user.kshetra_name);
//       if (user.prant_name) nameParts.push(user.prant_name);
//       if (user.vibhag_name) nameParts.push(user.vibhag_name);
//       if (user.jila_name) nameParts.push(user.jila_name);
//       else nameParts.push("Unknown Jila");
//     }

//     return nameParts.length > 0 ? nameParts.join(" / ") : "No Name Available";
//   };

//   return (
//     <Navbar bg="light" className="border-bottom">
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         <div></div>

//         {/* Display user type and name */}
//         <div className="d-flex align-items-center user-container">
//           <h6 className="m-0 me-1">{userType} </h6>
//           <h6 className="m-0 me-2">{getDisplayName()}</h6> 
//           <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
//             <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

// ------------------------

// import React, { useState, useEffect } from "react";
// import { Navbar, Dropdown, Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUser } from "../redux/slice/profileSlice";
// import { logout } from "../redux/slice/AuthSlice";
// import "./Header.css";

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ Fetch user details from Redux store
//    const user = useSelector((state) => state.auth.user);
//     const userType = user?.user_type;
//   // const user = useSelector((state) => state.profile.user);
//   const kshetraName = useSelector((state) => state.profile.kshetraName);
//   const prantName = useSelector((state) => state.profile.prantName);
//   const vibhagName = useSelector((state) => state.profile.vibhagName);
//   const jilaName = useSelector((state) => state.profile.jilaName);
//   const kendraName = useSelector((state) => state.profile.kendraName);
// // console.log("state.profile.kshetraName",kshetraName);

//   useEffect(() => {
//     dispatch(fetchUser());
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//     setShowDropdown(false);
//   };

//   const getDisplayName = () => {
//     if (!user) return "Loading...";

//     switch (userType) {
//       case "kshetra":
//         return kshetraName;
//       case "prant":
//         return `${kshetraName} / ${prantName}`;
//       case "vibhag":
//         return `${kshetraName} / ${prantName} / ${vibhagName}`;
//       case "jila":
//         return `${kshetraName} / ${prantName} / ${vibhagName} / ${jilaName}`;
//       case "kendra":
//         return kendraName;
//       default:
//         return "No Name Available";
//     }
//   };

//   console.log("User:", user);
//   console.log("Hierarchy Data:", { kshetraName, prantName, vibhagName, jilaName, kendraName });

//   return (
//     <Navbar bg="light" className="border-bottom">
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         <div></div>

//         {/* Display user type and hierarchical names */}
//         <div className="d-flex align-items-center user-container">
//           <h6 className="m-0 me-1">{user?.user_type || "Loading..."}</h6>
//           <h6 className="m-0 me-2">{getDisplayName()}</h6>
//           <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
//             <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//               <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { Navbar, Dropdown, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const kshetraName = useSelector((state) => state.profile.kshetraName);
  const prantName = useSelector((state) => state.profile.prantName);
  const vibhagName = useSelector((state) => state.profile.vibhagName);
  const jilaName = useSelector((state) => state.profile.jilaName);
  const kendraName = useSelector((state) => state.profile.kendraName);

  useEffect(() => {
    dispatch(fetchUser());
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
          <h6 className="m-0 me-1">{user?.user_type || "Loading..."}</h6>
          <h6 className="m-0 me-2">{getDisplayName()}</h6>
          <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
            <Dropdown.Toggle variant="link" id="dropdown-user" className="text-dark">
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
