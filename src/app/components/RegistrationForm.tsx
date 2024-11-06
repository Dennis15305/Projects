"use client";

import React, { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.scss';
import FormField from './FormField';
import CityDropdown from './CityDropdown';
import Checkbox from './Checkbox';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
    agree: false,
  });

  const [cities, setCities] = useState<Array<{ id: number; name: string; population: number }>>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string>('Человек');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();

    const savedName = localStorage.getItem('submittedName');
    if (savedName) {
      setSubmittedName(savedName);
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    if (name in errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const passwordRegex = /^(?:\d+|[a-zA-Z0-9]+)$/;
    if (!passwordRegex.test(formData.password) || formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов и только латинские буквы.';
      isValid = false;
    }

    if (!newErrors.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    if (formData.agree && !formData.email) {
      newErrors.email = 'Email обязателен при согласии получать информацию';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setLastUpdated(new Date().toLocaleString('ru-RU'));
          setSubmittedName(formData.name);
          localStorage.setItem('submittedName', formData.name);
          setFormData({
            name: '',
            city: '',
            password: '',
            confirmPassword: '',
            phone: '',
            email: '',
            agree: false,
          });
        } else {
          console.error('Ошибка при отправке формы');
        }
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registrationForm}>
      <h2>Здравствуйте, <span>{submittedName}</span></h2>

      <FormField
        label="Имя"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Введите имя"
        infoText="Должно содержать не менее 2 символов и только кириллица."
        className={`${styles.formField} ${styles.important}`}
      />

      <CityDropdown
        label="Ваш город"
        required
        value={formData.city}
        onChange={(value) => {setFormData({ ...formData, city: value });}}
        options={cities}
        infoText="Выберите ваш город из списка."
        className={`${styles.formField} ${styles.important}`}
      />

      {/* Разделительная линия перед паролями */}
      <div className={styles.divider} />

      <FormField
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Введите пароль"
        infoText="Должно содержать не менее 6 символов и только латинские буквы."
        className={`${styles.formField} ${styles.important}`}
        error={errors.password}
      />

      <FormField
        label="Пароль еще раз"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        placeholder="Повторите пароль"
        infoText="Проверка на совпадение с паролем."
        className={`${styles.formField} ${styles.important}`}
        error={errors.confirmPassword}
      />

      {/* Разделительная линия после паролей */}
      <div className={styles.divider} />

      <FormField
        label="Номер телефона"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+7 (999) 999-99-99"
        infoText='Маска с международным форматом "+7 (999) 999-99-99".'
        className={styles.formField}
      />

      <FormField
        label="Электронная почта"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required={formData.agree}
        placeholder="Введите email"
        infoText="Проверка на валидность email."
        className={`${styles.formField} ${formData.agree ? styles.important : ''}`}
        error={errors.email}
      />

      <div className={styles.checkboxWrapper}>
        <span>Я согласен</span>
        <Checkbox
          label="принимать актуальную информацию на email"
          checked={formData.agree}
          onChange={(checked) => setFormData({ ...formData, agree: checked })}
        />
      </div>
      
      <div className={styles.submit}>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Изменить'}
        </button>

        {lastUpdated && (
          <p className={styles.submitInfo}>
            последние изменения: {lastUpdated}
          </p>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
