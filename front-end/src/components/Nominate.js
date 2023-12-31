import React, { useState } from 'react';
import { LoaderSVG } from './design-components/Loader';

const NominationForm = ({setAppState}) => {
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAadharChange = (e) => {
    setAadhar(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    // Handle image upload logic here
    // You can use FileReader to preview the image before submission
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the form data to your server or perform any other actions
    console.log({
      name,
      aadhar,
      description,
      image,
    });
    setAppState("register")
  };
  const handleSkip = () => {
    setAppState('candidate-list');
  }

  return (
    <div className='form-container'>
      {/* Logo */}
      <LoaderSVG  width="64" height="64" color='#e1f1ff' />
      <br />
      <br />
      <br />
      {/* Name TextInput */}
      <h3>Nomination Form</h3>
      <div className='form-field name-input'>
        <input placeholder='Name' type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      {/* Aadhar TextInput */}
      <div className='form-field aadhar-input'>
        <input placeholder='Unique ID (AADHAAR)' type="text" id="aadhar" value={aadhar} onChange={handleAadharChange} />
      </div>
      {/* Image Upload */}
      <div className='form-field image-input'>
        <input placeholder='Profile picture' type="file" id="image" onChange={handleImageChange} />
      </div>

      {/* Description Textarea */}
      <div className='form-field description-input'>
        <textarea placeholder='Details about you' id="description" value={description} onChange={handleDescriptionChange} />
      </div>

      {/* Submit Button */}
      <div className='form-field submit-button'>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button className='skip-btn' onClick={handleSkip}>Skip</button>

      </div>
    </div>
  );
};

export default NominationForm;
