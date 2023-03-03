import React from 'react';

function Pagination(props) {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handlePageChange(page) {
    onPageChange(page);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage !== 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
            <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
          </li>
        ))}
        {currentPage !== totalPages && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
