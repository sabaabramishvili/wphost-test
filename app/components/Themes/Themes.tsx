"use client";
import { useState } from 'react';
import axios from 'axios';
import styles from './Themes.module.scss';

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
    <div className={styles.container}>
      <h1 className={styles.caption}>Select to add Theme</h1>
      <select value={selectedTheme} onChange={onHandleChange} className={styles.select}>
        <option value="impressionist">impressionist</option>
        <option value="adonay">adonay</option>
        <option value="colorloops">colorloops</option>
      </select>
      <button onClick={onSubmit} className={styles.button}>Submit</button>
      
      <div className={styles.section}> 
        <h1 className={styles.caption}>Select to delete Theme</h1>
        <select onChange={onHandleDelete} value={deletedTheme} className={styles.select}>
          <option value="impressionist">impressionist</option>
          <option value="adonay">adonay</option>
          <option value="colorloops">colorloops</option>
        </select>
        <button onClick={onDelete} className={styles.button}>Delete</button>
      </div>
    </div>
  );
};

export default Themes;
