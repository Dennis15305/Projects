import React from 'react';
import styles from './RegistrationForm.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  infoText?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, infoText, className }) => (
  <div className={`${styles.checkboxWrapper} ${className}`}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.checkboxText}>{label}</span>
    </label>
    {infoText && <span className={styles.infoText}>{infoText}</span>}
  </div>
);

export default Checkbox;
