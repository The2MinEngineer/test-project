import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditForm.css';

import Sectors from '../../database/Sector';

const EditForm = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://6500c6f418c34dee0cd5653c.mockapi.io/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setSector(res.data.sector);
        setAgreeToTerms(res.data.agreeToTerms);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length <= 3 || sector.length === 0 || agreeToTerms === false) {
      setError(true);
      return;
    }

    axios
      .put(`https://6500c6f418c34dee0cd5653c.mockapi.io/users/${id}`, {
        name: name,
        sector: sector,
        agreeToTerms: agreeToTerms,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage('User data updated successfully.');
        }
      })
      .catch((err) => console.log(err));
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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      {error && name.length <= 3 ? (
        <p className="error">Characters must be more than 3!</p>
      ) : (
        ''
      )}

      <div className="inputs">
        <label>Sectors</label>
        <select
          name="sector"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
        >
          {Sectors.map((sectorItem) => (
            <option key={sectorItem.value} value={sectorItem.value}>
              {sectorItem.label}
            </option>
          ))}
        </select>
      </div>
      {error && sector.length === 0 ? (
        <p className="error">You must select one!</p>
      ) : (
        ''
      )}

      <div className="inputs-checkbox">
        <input
          type="checkbox"
          name="agreetoterms"
          checked={agreeToTerms}
          onChange={(event) => setAgreeToTerms(event.target.checked)}
        />
        <label>Agree to Terms</label>
      </div>
      {error && agreeToTerms === false ? (
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
