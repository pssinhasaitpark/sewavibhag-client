import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSearchQuery } from "../../redux/slice/ViewUsersSlice";
import { Table, Form, Pagination } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";
import fieldLabels from "../FiledLabels";

const UserTable = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];

  const user = useSelector((state) => state.auth.user);
  const { users, status, error, searchQuery, pagination } = useSelector(
    (state) => state.ViewUserSlice
  );

  const loggedInUserType = user?.user_type || "";
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toTitleCase = (str) => {
    if (!str) return ""; 
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredUsers = users
    ?.filter((user) => {
      if (loggedInUserType === "kendra") {
        return ["khetra", "prant", "vibhag", "jila"].includes(user.user_type);
      }
      if (loggedInUserType === "kshetra") {
        return ["prant", "vibhag", "jila"].includes(user.user_type);
      }
      if (loggedInUserType === "prant") {
        return ["vibhag", "jila"].includes(user.user_type);
      }
      if (loggedInUserType === "vibhag") {
        return ["jila"].includes(user.user_type);
      }
      if (loggedInUserType === "jila") {
        return false;
      }
      return true;
    })
    .filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery)
    );

  return (
    <div className="container mt-4">
      {status === "loading" && (
        <div className="text-center">
          <PropagateLoader color="#ff6600" />
        </div>
      )}

      {status === "failed" && (
        <p className="text-danger text-center">Error: {error?.message}</p>
      )}

      {status !== "loading" && (
        <>
          {/* Search Input ko right align karna */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="m-0">{labels?.UserList}</h2>
            <Form.Control
              type="text"
              placeholder="Search by Name, Username, Email, or Mobile..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-25"
            />
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{labels?.FULLNAME}</th>
                <th>{labels?.Username}</th>
                <th>{labels?.EMAIL}</th>
                <th>{labels?.MOBILE}</th>
                <th>{labels?.UserType}</th>
                <th>{labels?.AreaType}</th>
                <th>{labels?.Level}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const userKeys = Object.keys(user);
                const lastKey = userKeys[userKeys.length - 1];
                const lastKeyValue = user[lastKey];
                  return (
                    <tr key={user._id}>
                      <td>{toTitleCase(user.full_name)}</td>
                      <td>{user.user_name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{toTitleCase(user.user_type)}</td>
                      <td>{toTitleCase(lastKeyValue)}</td>
                      <td style={{color:"#7b50ab"}}>{user.level || "N/A"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {labels?.NoUsersAvailable}.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(pagination.totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagination.totalPages)
                  )
                }
                disabled={currentPage === pagination.totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;
