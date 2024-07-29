import React from "react";

export default function Pagination({ recordsPerPage, length, currentPage, handlePagination }) {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / recordsPerPage); i++) {
    paginationNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < paginationNumbers.length) {
      handlePagination(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  return (
    <>
      <nav aria-label="..." className="float-end">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={prevPage}>Previous</button>
          </li>
          {paginationNumbers.map((pageNumber) => {
            return (
              <li key={pageNumber} onClick={() => handlePagination(pageNumber)} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                <a className="page-link" href="#">
                  {pageNumber}
                </a>  
              </li>
            );
          })}
          <li className={`page-item ${currentPage === paginationNumbers.length ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
