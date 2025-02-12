import React, { useState } from "react";
import "./ViewKendraTable.css";

const ViewKendraTable = () => {
  const data = [
    {
      Kshetra: "Dakshin",
      Prant: "D. Kerala",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 61,
      "Sum of DP2": 44,
    },
    {
      Kshetra: "Dakshin",
      Prant: "DTN",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 2,
      "Sum of DP2": 23,
    },
    {
      Kshetra: "Dakshin",
      Prant: "U. Kerala",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 16,
      "Sum of DP2": 10,
    },
    {
      Kshetra: "Dakshin",
      Prant: "UTN",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 18,
      "Sum of DP2": 6,
    },
    {
      Kshetra: "Dakshin Madhya",
      Prant: "Andhra",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 25,
      "Sum of DP2": 5,
    },
    {
      Kshetra: "Dakshin Madhya",
      Prant: "",
      Vibhag: "",
      Jila: "Test17",
      "Sum of DP1": 46,
      "Sum of DP2": 56,
    },
    {
      Kshetra: "Dakshin Madhya",
      Prant: "",
      Vibhag: "",
      Jila: "Test 107",
      "Sum of DP1": 4,
      "Sum of DP2": 24,
    },
    {
      Kshetra: "Dakshin Madhya",
      Prant: "Karnataka D",
      Vibhag: "",
      Jila: "Test16",
 "Sum of DP1": 12,
      "Sum of DP2": 8,
    },
    {
      Kshetra: "Madhya",
      Prant: "Madhya Pradesh",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 143,
      "Sum of DP2": 170,
    },
    {
      Kshetra: "Paschim",
      Prant: "Gujarat",
      Vibhag: "",
      Jila: "",
      "Sum of DP1": 89,
      "Sum of DP2": 66,
    },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-end mb-3">
          <div>
            <select
              value={rowsPerPage}
              onChange={changeRowsPerPage}
              className="form-select form-select-sm mx-2 show_type"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Kshetra</th>
                <th>Prant</th>
                <th>Vibhag</th>
                <th>Jila</th>
                <th>Sum of DP1</th>
                <th>Sum of DP2</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="text-center">{row.Kshetra}</td>
                  <td className="text-center">{row.Prant}</td>
                  <td className="text-center">{row.Vibhag}</td>
                  <td className="text-center">{row.Jila}</td>
                  <td className="text-center">{row["Sum of DP1"]}</td>
                  <td className="text-center">{row["Sum of DP2"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(data.length / rowsPerPage) },
                (_, index) => (
                  <li key={index + 1} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`page-link ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ViewKendraTable;