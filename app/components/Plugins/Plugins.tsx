'use client';

import styles from "./plugins.module.scss";
import { ChangeEvent, useState } from "react";
import axios from "axios";

interface Data {
    title: string;
    value: string;
}

const Plugins = () => {
    const [activateData, setActivateData] = useState<string>('');
    const [deactivateData, setDeactivateData] = useState<string>('');
    const [forDeleteData, setForDeleteData] = useState<string>('');
    const [data, setData] = useState<string>('');
    const [pluginArray, setPluginArray] = useState<Data[]>([
        { title: 'Akismet Anti-spam: Spam Protection', value: 'akismet' },
        { title: 'bbPress', value: 'bbpress' },
        { title: 'Gutenberg', value: 'gutenberg' },
        { title: 'Classic Editor', value: 'classiceditor' },
        { title: 'Hello Dolly', value: 'hello dolly' }
    ]);

    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setData(e.target.value);
    };

    const handleAddPlugin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/wp-cli/plugin/install', { args: data });
            const pluginExists = pluginArray.some(plugin => plugin.value === data.toLowerCase());

            if (!pluginExists && data) {
                setPluginArray(prev => [...prev, { title: data, value: data.toLowerCase() }]);
            }
        }
        catch (error) {
            console.error('Error adding plugin:', error);
        }
    };

    const handleDeletePlugin = async () => {
        const deleteData = forDeleteData === 'Akismet Anti-spam: Spam Protection' ? 'akismet' : forDeleteData;

        try {
            const response = await axios.post('http://localhost:3001/wp-cli/plugin/delete', { args: deleteData });
            console.log('Plugin deleted:', response.data);
            setPluginArray(prev => prev.filter(plugin => plugin.value !== deleteData.toLowerCase()));
        }
        catch (error) {
            console.error('Error deleting plugin:', error);
        }
    };

    const handleActivatePlugin = async () => {
        if (!activateData) return;

        const args = activateData === 'akismet' ? 'akismet' : activateData;

        try {
            const response = await axios.post('http://localhost:3001/wp-cli/plugin/activate', { args });
            console.log('Plugin activated:', response.data);
        }
        catch (error) {
            console.error('Error activating plugin:', error);
        }
    };

    const handleDeactivatePlugin = async () => {
        if (!deactivateData) return;

        const args = deactivateData === 'akisme' ? 'akismet' : deactivateData;

        try {
            const response = await axios.post('http://localhost:3001/wp-cli/plugin/deactivate', { args });
            console.log('Plugin deactivated:', response.data);
        }
        catch (error) {
            console.error('Error deactivating plugin:', error);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.wrapper}>
                <div className={styles.containerWrapper}>
                    <h1>Plugin Add</h1>
                    <select className={styles.select} onChange={onChangeSelect}>
                        <option value="">....</option>
                        <option value="akismet">Akismet Anti-spam: Spam Protection</option>
                        <option value="gutenberg">Gutenberg</option>
                        <option value="classiceditor">Classic Editor</option>
                        <option value="bbpress">bbPress</option>
                    </select>
                    <button className={styles.button} onClick={handleAddPlugin}>
                        Submit
                    </button>
                </div>

                <div>
                    <div className={styles.containerWrapper}>
                        <h1>Plugin Delete</h1>
                        <select className={styles.select} onChange={(e: ChangeEvent<HTMLSelectElement>) => setForDeleteData(e.target.value)}>
                            <option value="">....</option>
                            {pluginArray.map(plugin => (
                                <option key={plugin.value} value={plugin.value}>
                                    {plugin.title}
                                </option>
                            ))}
                        </select>
                        <button className={styles.button} onClick={handleDeletePlugin}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.containerWrapper}>
                    <h1>Activate plugin</h1>
                    <select className={styles.select} onChange={(e: ChangeEvent<HTMLSelectElement>) => setActivateData(e.target.value)}>
                        <option value="">....</option>
                        {pluginArray.map(plugin => (
                            <option key={plugin.value} value={plugin.value}>
                                {plugin.title}
                            </option>
                        ))}
                    </select>
                    <button className={styles.button} onClick={handleActivatePlugin}>
                        Submit
                    </button>
                </div>
                <div>
                    <div className={styles.containerWrapper} >
                        <h1>Deactivate plugin</h1>
                        <select className={styles.select} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDeactivateData(e.target.value)}>
                            <option value="">....</option>
                            {pluginArray.map(plugin => (
                                <option key={plugin.value} value={plugin.value}>
                                    {plugin.title}
                                </option>
                            ))}
                        </select>
                        <button className={styles.button} onClick={handleDeactivatePlugin}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plugins;
