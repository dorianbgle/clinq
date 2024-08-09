"use client"

import React, { useState } from 'react';

// Supabase call with Search functionality

const Pharmacology = () => {
const [searchTerm, setSearchTerm] = useState('');

const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // handle search logic here
    console.log(`Searching for ${searchTerm}...`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  )
}

export default Pharmacology
