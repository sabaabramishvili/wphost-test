'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Language.module.scss';

const Language = () => {
    const [selectedOption, setSelectedOption] = useState(''); 

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value); 
    };

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:3001/wp-cli/language/core/install', {args: selectedOption});
            console.log(response.data); 
        } catch (err) {
            console.error('Error clearing cache:', err); 
        }
    };

    return (
        <div className={styles.container}>
            <h1>Languages</h1>
            <select value={selectedOption} onChange={onChange}>
                <option value="ru_RU">ru_RU</option>
                <option value="fr_FR">fr_FR</option>

            </select>
            <button onClick={onClick}>Submit</button> 
        </div>
    );
};

export default Language;
