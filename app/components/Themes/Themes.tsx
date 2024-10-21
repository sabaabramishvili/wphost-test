'use client';

import { useState } from 'react';
import axios from 'axios';

const Themes = () => {
  const [selectedTheme, setSelectedTheme] = useState('adonay');
  const [deletedTheme, setDeletedTheme] = useState('adonay');

  const onHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
  };

  const onHandleDelete = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeletedTheme(e.target.value);
  };

  const onSubmit = () => {
    axios
      .post('http://10.10.51.116:3001/wp-cli/theme/install', {
        args: selectedTheme,
      })
      .then((response) => {
        console.log('Theme selected successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error selecting theme:', error);
      });
  };

  const onDelete = () => {
    axios
      .post('http://10.10.51.116:3001/wp-cli/theme/delete', {
        args: deletedTheme,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <h1>Select to add Theme</h1>
      <select value={selectedTheme} onChange={onHandleChange}>
        <option value="impressionist">impressionist</option>
        <option value="adonay">adonay</option>
        <option value="colorloops">colorloops</option>
      </select>
      <button onClick={onSubmit}>Submit</button>
      <br />
      <br />
      <hr />
      <br />
      <div>
        <h1>Select to delete Theme</h1>
        <select onChange={onHandleDelete} value={deletedTheme}>
          <option value="impressionist">impressionist</option>
          <option value="adonay">adonay</option>
          <option value="colorloops">colorloops</option>
        </select>
        <p>Theme activation</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Themes;
