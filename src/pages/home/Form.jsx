import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

import Sectors from '../../database/Sector';
import { createUser } from '../../services/apiService';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.name.length <= 3 ||
      formData.sector.length === 0 ||
      !formData.agreeToTerms
    ) {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const createdUser = await createUser(formData);

      setLoading(false);
      navigate(`/edit-form/${createdUser.id}`);
    } catch (error) {
      console.error('Request was not successful', error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Test Form</h2>
      <p className="sub-title">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </p>
      <div className="inputs">
        <label>Fullname</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      {error && formData.name.length <= 3 ? (
        <p className="error">Characters must be more than 3!</p>
      ) : (
        ''
      )}
      <div className="inputs">
        <label>Sectors</label>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select a sector
          </option>
          {Sectors.map(
            (
              sectorItem,
              index, // Use index as the key
            ) => (
              <option key={index} value={sectorItem.value}>
                {sectorItem.label}
              </option>
            ),
          )}
        </select>
        {/*  */}
      </div>
      {error && formData.sector.length === 0 ? (
        <p className="error">You must select one!</p>
      ) : (
        ''
      )}

      <div className="inputs-checkbox">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
        />
        <label>Agree to Terms</label>
      </div>
      {error && !formData.agreeToTerms ? (
        <p className="error">Agree to Terms to proceed!</p>
      ) : (
        ''
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default Form;
