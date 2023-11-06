import React from 'react';
import { useNavigate } from 'react-router-dom';
interface IPaginationProps {
  currentPage: number;
}

const PaginationComponent: React.FC<
  IPaginationProps & { onPageChange: (page: number) => void }
> = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      {currentPage > 1 ? (
        <span>Page {currentPage}</span>
      ) : (
        <span>Page {currentPage}</span>
      )}

      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default PaginationComponent;
