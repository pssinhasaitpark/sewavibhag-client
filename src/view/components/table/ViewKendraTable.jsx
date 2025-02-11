import React, { useState } from "react";
import "./ViewKendraTable.css";

const ViewKendraTable = () => {
  
  const data = Array.from({ length: 30 }, (_, i) => ({
    district: `इन्दौर `,
    partNumber: 50 + i,
    bastiCount: 55 + i,
    serviceBastiCount: 32 + i,
    branchMilans: 42 + i,
    serviceBastiParentMilans: 56 + i,
    serviceBranchMilans: 84 + i,
    totalWorkers: 50 + i,
    totalServiceWorks: 55 + i,
    monthlyServiceBranches: 32 + i,
    districtCenter: 42 + i,
    otherCities: 56 + i,
    above5000Villages: 84 + i,
    above5000VillageCount: 50 + i,
    farmerVillages: 55 + i,
    serviceVillages: 32 + i,
    totalVillageWorks: 42 + i,
    below5000Villages: 56 + i,
    serviceBelow5000Villages: 84 + i,
    totalBelow5000Works: 84 + i,
  }));

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
                <th className="fixed-col">जिला</th>
                <th>जिला सम महानगर/भाग संख्या</th>
                <th>इनमें सेवा बस्ती संख्या</th>
                <th>सेवा कार्य युक्त सेवा बस्ती</th>
                <th>व्यवसायी व महाविद्यालय शाखा व मिलन संख्या</th>
                <th>सेवा बस्ती पालक शाखा व मिलन संख्या</th>
                <th>सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या</th>
                <th>कुल सेवा कार्यकर्ता</th>
                <th>महानगर में कुल सेवा कार्य</th>
                <th>मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td  className="text-center fixed-col">{row.district}</td>
                  <td className="text-center">{row.partNumber}</td>
                  <td className="text-center">{row.bastiCount}</td>
                  <td className="text-center">{row.serviceBastiCount}</td>
                  <td className="text-center">{row.branchMilans}</td>
                  <td className="text-center">{row.serviceBastiParentMilans}</td>
                  <td className="text-center">{row.serviceBranchMilans}</td>
                  <td className="text-center">{row.totalWorkers}</td>
                  <td className="text-center">{row.totalServiceWorks}</td>
                  <td className="text-center">{row.monthlyServiceBranches}</td>
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
