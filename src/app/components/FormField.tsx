import React from 'react';
import styles from './RegistrationForm.module.scss';
import MaskedInput from 'react-text-mask';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  infoText?: string;
  className?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
  infoText,
  className,
  error
}) => {
  const phoneMask = ['+', '7', ' ', '(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  const inputClassName = `${styles.input} ${error ? styles.errorInput : ''}`;

  return (
    <div className={`${styles.formField} ${className} ${error ? styles.errorField : ''}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {type === 'tel' ? (
          <MaskedInput
            mask={phoneMask}
            guide={true}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            placeholder={placeholder}
            className={inputClassName}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={styles.input}
          />
        )}
        {error && <span className={styles.errorText}>{error}</span>}
        {infoText && <span className={styles.infoText}>{infoText}</span>}
      </div>
    </div>
  );
};

export default FormField;