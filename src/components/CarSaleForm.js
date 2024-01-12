
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

// Reusable component for form fields with validation
const FormField = ({ label, type, name, value, onChange, required, error }) => {
  return (
    <div>
      <label>
        {label}:
        {type === 'textarea' ? (
          <textarea name={name} value={value} onChange={onChange} required={required} />
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} required={required} />
        )}
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

const CarFormFields = ({ formData, handleChange, errors }) => {
  return (
    <>
      <FormField
        label="Make"
        type="text"
        name="make"
        value={formData.make}
        onChange={handleChange}
        required
        error={errors.make}
      />
      <FormField
        label="Model"
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        required
        error={errors.model}
      />
      <FormField
        label="Year"
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        required
        error={errors.year}
      />
      <FormField
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        error={errors.price}
      />
      <FormField
        label="More Details"
        type="textarea"
        name="moreDetails"
        value={formData.moreDetails}
        onChange={handleChange}
        error={errors.moreDetails}
      />
    </>
  );
};

CarFormFields.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const CarSaleForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    moreDetails: '',
  });

  const [errors, setErrors] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    moreDetails: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate each field
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] === '' && key !== 'moreDetails') {
          newErrors[key] = 'This field is required';
          isValid = false;
        } else {
          newErrors[key] = '';
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);

      setFormData({
        make: '',
        model: '',
        year: '',
        price: '',
        moreDetails: '',
      });

      navigate('/success');
    }
  };

  const firstInputRef = useRef(null);
  React.useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <CarFormFields formData={formData} handleChange={handleChange} errors={errors} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarSaleForm;

