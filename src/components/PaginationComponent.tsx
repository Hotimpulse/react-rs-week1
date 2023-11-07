import React from 'react';
import { useNavigate } from 'react-router-dom';
interface IPaginationProps {
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<IPaginationProps> = ({
  currentPage,
  currentLimit,
  onPageChange,
}) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    navigate(`?offset=0&limit=${currentLimit}?page=${newPage}`);
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
