import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

import Sectors from '../../database/Sector';

const Form = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (name.length <= 3 || sector.length === 0 || agreeToTerms === false) {
      setError(true);
      return;
    }

    axios
      .post('https://6500c6f418c34dee0cd5653c.mockapi.io/users', {
        name: name,
        sector: sector,
        agreeToTerms: agreeToTerms,
      })
      .then((res) => {
        if (res.status === 201) {
          const createdUserId = res.data.id;
          navigate(`/edit-form/${createdUserId}`);
        } else {
          console.log('Request was not successful');
        }
      })
      .catch((err) => console.log(err));
  }

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
          onChange={(event) => setAgreeToTerms(event.target.checked)}
        />
        <label>Agree to Terms</label>
      </div>
      {error && agreeToTerms === false ? (
        <p className="error">Agree to Terms to proceed!</p>
      ) : (
        ''
      )}

      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
