import { MouseEvent } from 'react';

interface IButtonProps {
  label?: string | number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function MyButton({ label, onClick }: IButtonProps) {
  return (
    <button className="bg-blue-500 text-white rounded p-2" onClick={onClick}>
      {label}
    </button>
  );
}
