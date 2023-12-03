interface IMyButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  disabled: boolean;
  className: string;
}

export default function MyButtonComponent({
  type,
  disabled,
  label,
  className,
}: IMyButtonProps) {
  return (
    <button type={type} className={className} disabled={disabled}>
      {label}
    </button>
  );
}
