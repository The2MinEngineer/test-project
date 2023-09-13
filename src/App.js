import React from 'react';
import './App.css';
import Form from './pages/home/Form';
import EditForm from './pages/edit-page/EditForm';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/edit-form/:id" element={<EditForm />} />
      </Routes>
    </div>
  );
};

export default App;
