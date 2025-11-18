import { useState } from 'react';

/**
 * Custom hook for form handling
 * Simplifies form state management and validation
 */
export const useForm = (initialValues, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (callback) => {
    return async (e) => {
      e.preventDefault();

      // Validate if validation function provided
      if (validateFn) {
        const validationErrors = validateFn(values);
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        await callback(values);
      } catch (error) {
        // Handle error
        const errorMessage = error.message || 'An error occurred';
        setErrors({ submit: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  /**
   * Reset form
   */
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  /**
   * Set errors manually
   */
  const setError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  /**
   * Set multiple errors
   */
  const setMultipleErrors = (errorObj) => {
    setErrors(errorObj);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setError,
    setMultipleErrors,
    setValues,
    setIsSubmitting,
  };
};

export default useForm;
