import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import './ViewKendraTable.css'; // Ensure you import the CSS file

const ViewKendraTable = () => {
  
  const data = useMemo(
    () => [
      { srNo: 1, kendraName: 'Kendra A', name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { srNo: 2, kendraName: 'Kendra B', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
      { srNo: 3, kendraName: 'Kendra C', name: 'Sam Green', email: 'sam@example.com', password: 'password789' },
      { srNo: 4, kendraName: 'Kendra D', name: 'Alice Brown', email: 'alice@example.com', password: 'password101' },
      { srNo: 5, kendraName: 'Kendra E', name: 'Bob White', email: 'bob@example.com', password: 'password202' },
      { srNo: 6, kendraName: 'Kendra F', name: 'Charlie Black', email: 'charlie@example.com', password: 'password303' },
      { srNo: 7, kendraName: 'Kendra G', name: 'Eve Adams', email: 'eve@example.com', password: 'password404' },
      { srNo: 8, kendraName: 'Kendra H', name: 'Frank Harris', email: 'frank@example.com', password: 'password505' },
      { srNo: 9, kendraName: 'Kendra I', name: 'Grace Lee', email: 'grace@example.com', password: 'password606' },
      { srNo: 10, kendraName: 'Kendra J', name: 'Henry Thomas', email: 'henry@example.com', password: 'password707' },
    ],
    []
  );

  
  const columns = useMemo(
    () => [
      { Header: 'Sr No.', accessor: 'srNo' },
      { Header: 'Kendra Name', accessor: 'kendraName' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email Id', accessor: 'email' },
      { Header: 'Password', accessor: 'password' },
    ],
    []
  );

 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, 
    },
    useFilters,  
    usePagination 
  );


  const handleKendraSearch = (e) => {
    setFilter('kendraName', e.target.value || undefined);
  };

  return (
    <Container className="view-kendra-table-container">
      <Row className="view-kendra-table-row mt-3">
        <Col>
          <h3 className="view-kendra-table-title">View Users</h3>
          
          <div className="view-kendra-table-search mb-3 d-flex justify-content-end">
            <Form.Group as={Row} className="view-kendra-table-form-group" style={{ maxWidth: '400px' }}>
              <Form.Label column sm={4} className="view-kendra-table-form-label">
         
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Search by Kendra Name"
                  onChange={handleKendraSearch}
                  className="view-kendra-table-input"
                />
              </Col>
            </Form.Group>
          </div>

          {/* Table */}
          <Table {...getTableProps()} responsive bordered className="view-kendra-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="view-kendra-table-pagination d-flex justify-content-between align-items-center mt-3">
            <div>
              <Button
                variant="secondary"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="view-kendra-table-pagination-btn"
              >
                {'<<'}
              </Button>{' '}
              <Button variant="secondary" onClick={() => previousPage()} disabled={!canPreviousPage} className="view-kendra-table-pagination-btn">
                {'<'}
              </Button>{' '}
              <Button variant="secondary" onClick={() => nextPage()} disabled={!canNextPage} className="view-kendra-table-pagination-btn">
                {'>'}
              </Button>{' '}
            </div>

            {/* Page Size Selector */}
            <Form.Control
              as="select"
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="view-kendra-table-page-size-selector"
            >
              {[5, 10, 20].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </Form.Control>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewKendraTable;
