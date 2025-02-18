import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/ViewUsersSlice';
import { Table, Spinner } from 'react-bootstrap';

const UserTable = () => {
  const dispatch = useDispatch();

 
  const user = useSelector((state) => state.auth.user);
  const { users, status, error } = useSelector((state) => state.ViewUserSlice); 

 
  const loggedInUserType = user?.user_type || ''; 

 
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

 
  const filteredUsers = Array.isArray(users)
  ? users.filter((user) => {
      console.log("User Type in filter:", user?.user_type);
      if (loggedInUserType === 'kendra') {
        return ['khetra', 'prant', 'vibhag', 'jila'].includes(user.user_type);
      }
      if (loggedInUserType === 'kshetra') {
        return ['prant', 'vibhag', 'jila'].includes(user.user_type);
      }
      if (loggedInUserType === 'prant') {
        return ['vibhag', 'jila'].includes(user.user_type);
      }
      if (loggedInUserType === 'vibhag') {
        return ['jila'].includes(user.user_type);
      }
      if (loggedInUserType === 'jila') {
        return false;
      }
      return false;
    })
  : [];


 
  

  return (
    <div className="container mt-4">
      <h2>User List</h2>

      {status === 'loading' && <Spinner animation="border" />}
      {status === 'failed' && <p>Error: {error}</p>}

      {status === 'succeeded' && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>User Type</th>
              <th>Filed Type</th>
              <th>Level</th>
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
            <td>{user.full_name}</td>
            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.user_type}</td>
            <td>{lastKeyValue}</td> 
            <td>{user.level || 'N/A'}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="6" className="text-center">
          No users available.
        </td>
      </tr>
    )}
  </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserTable;
