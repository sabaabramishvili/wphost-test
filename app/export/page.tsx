'use client';

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Export() {

    const [data, setData] = useState<String>('');

    return (
        <div className={styles.mainContainer} >
            <div className={styles.middleWrapper} >

                <div className={styles.mainContainer} >
                    <input placeholder="Type URL" className={styles.inputStyle} onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)} />
                </div>
                <button className={styles.buttonStyle} onClick={() => {
                    axios.post('http://localhost:3001/wp-cli/import', { path: data })
                        .then((response) => {
                            console.log(response.data);
                            console.log('Api request called successfully!')
                        })
                        .catch((response) => {
                            console.log(response.error)
                        })
                }} >
                    Export
                </button>
            </div>
        </div>
    )
}