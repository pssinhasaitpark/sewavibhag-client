import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewActivities } from "../../redux/slice/ViewActivity";
import { Pagination } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";

const ActivityTable = () => {
    const dispatch = useDispatch();
    const { activities, status, error, totalLogs, page, limit, totalPages } = useSelector((state) => state.viewActivities);
    const user = useSelector((state) => state.auth.user);

    const [currentPage, setCurrentPage] = useState(1);
    const [actionFilter, setActionFilter] = useState("");

    useEffect(() => {
        dispatch(viewActivities({ page: currentPage, limit: 50 }));
    }, [dispatch, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleActionFilterChange = (e) => {
        setActionFilter(e.target.value);
    };

    // Filter activities based on selected action
    const filteredActivities = actionFilter ? activities.filter((log) => log.message?.action === actionFilter) : activities;




    return (
        <div className="container mt-4">
            <h2>गतिविधि लॉग</h2>
            {status === "loading" && (<PropagateLoader className="text-center" />)}
            {status === "failed" && <p>Error: {error?.message}</p>}

            {status === "succeeded" && (
                <>
                    <div className="mb-3">
                        {/* <label htmlFor="actionFilter">Filter by Action:</label> */}
                        <select
                            id="actionFilter"
                            className="form-select"
                            value={actionFilter}
                            onChange={handleActionFilterChange}
                            style={{ maxWidth: "139px" }}
                        >
                            <option value="">All Actions</option>
                            <option value="login">Login</option>
                            <option value="create_user">Create User</option>
                            <option value="created_form">Create Form</option>
                            <option value="updated_form">Update Form</option>
                        </select>
                    </div>

                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                                <th>User Type</th>
                                <th>User Field Name</th>
                                <th>User Level</th>
                                <th>Action</th>
                                <th>Target User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivities.map((log, index) => {
                                const { message } = log || {};
                                return (
                                    <tr key={index}>
                                        <td>{message?.username || message?.userName || "N/A"}</td>
                                        <td>{message?.user_type || "N/A"}</td>
                                        <td>{message?.user_field_name || "N/A"}</td>
                                        <td>{message?.user_level || "N/A"}</td>
                                        <td>{message?.action || "N/A"}</td>
                                        <td>{message?.target_user || "N/A"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map((number) => (
                                <Pagination.Item
                                    key={number + 1}
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
};

export default ActivityTable;
