import { useNavigate } from 'react-router-dom';
import MyButton from './ButtonComponent';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <MyButton
          key={page}
          label={page.toString()}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        />
      ))}
    </div>
  );
}
