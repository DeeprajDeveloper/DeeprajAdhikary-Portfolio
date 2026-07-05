import './Input.scss';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  disabled = false,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`input-field ${disabled ? 'input-field--disabled' : ''}`}>
      {label && (
        <label className="input-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className="input-field__control"
        id={inputId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}
