import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditForm.css';

import Sectors from '../../database/Sector';
import { updateUser, fetchUserData } from '../../services/apiService';

const EditForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    agreeToTerms: false,
  });

  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData(id);
        setFormData({
          name: userData.name,
          sector: userData.sector,
          agreeToTerms: userData.agreeToTerms,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [id]);

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

    try {
      await updateUser(id, formData);

      setSuccessMessage('User data updated successfully.');
    } catch (error) {
      console.error('Request was not successful', error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [successMessage]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Form</h2>
      <p className="sub-title">Edit and update your form if you want.</p>
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
          {Sectors.map((sectorItem) => (
            <option key={sectorItem.value} value={sectorItem.value}>
              {sectorItem.label}
            </option>
          ))}
        </select>
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

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
