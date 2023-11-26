import React from 'react';
interface IPaginationProps {
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<IPaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-center items-center mt-3 mb-3 gap-5">
      <button
        className="m-0"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      <span>Page {currentPage}</span>

      <button className="m-0" onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
