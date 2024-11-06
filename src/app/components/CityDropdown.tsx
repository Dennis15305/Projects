"use client";

import React from 'react';
import styles from './RegistrationForm.module.scss';

type Option = {
  id: number;
  name: string;
};

interface CityDropdownProps {
  label: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  infoText?: string;
  error?: string;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
  label,
  required,
  value,
  onChange,
  options,
  className,
  infoText,
  error
}) => {
  return (
    <div className={`${className} ${error ? styles.errorField : ''}`}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
        >
          <option value="">Выберите город</option>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorText}>{error}</span>}
        {infoText && <span className={styles.infoText}>{infoText}</span>}
      </div>
    </div>
  );
};

export default CityDropdown;
