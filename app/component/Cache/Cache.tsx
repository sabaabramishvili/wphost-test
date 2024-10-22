'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Cache.module.scss'
const Cache = () => {
    const [selectedOption, setSelectedOption] = useState('flush'); 

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value); 
    };

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 

        try {
            const response = await axios.post(`http://localhost:3001/wp-cli/cache/${selectedOption}`,);
            console.log(response.data); 
        } catch (err) {
            console.error('Error clearing cache:', err); 
        }
    };

    return (
        <div className={styles.cacheContainer}>
            <h1>Cache</h1>
            <select value={selectedOption} onChange={onChange}>
                <option value="flush">flush</option>
            </select>
            <button onClick={onClick}>Submit</button> 
        </div>
    );
};

export default Cache;
