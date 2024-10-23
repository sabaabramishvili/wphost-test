"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Language.module.scss";

const Language = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [installLanguage, setInstallLanguage] = useState("");
  const [languages, setLanguages] = useState<any>([]);
  const [installed, setInstalled] = useState<any[]>([]);
  const [deleteChange, setDeleteChange] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const onDeleteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeleteChange(e.target.value);
  };

  const onInstallChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstallLanguage(e.target.value);
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/wp-cli/site/switch-language",
        { args: selectedOption }
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error switching language:", err);
    }
  };

  const onInstall = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await axios.post("http://localhost:3001/wp-cli/language/install", {
        language: installLanguage,
      });
      console.log(`Language ${installLanguage} installed.`);
    } catch (err) {
      console.error("Error installing language:", err);
    }
  };

  const onDelete = async () => {
    try {
      await axios.post("http://localhost:3001/wp-cli/language/uninstall", {
        language: deleteChange,
      });
      console.log(`Language ${deleteChange} uninstalled.`);

      const response = await axios.get(
        "http://localhost:3001/wp-cli/language/installed"
      );
      const installedData = JSON.parse(response.data.data);
      setInstalled(installedData);

      setDeleteChange("");
    } catch (err) {
      console.error("Error uninstalling language:", err);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/wp-cli/language/all-languages"
        );
        const languagesData = JSON.parse(resp.data.data);
        setLanguages(languagesData);
      } catch (err) {
        console.error("Error fetching languages:", err);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchInstalled = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3001/wp-cli/language/installed"
        );
        const installedData = JSON.parse(resp.data.data);
        setInstalled(installedData);
      } catch (err) {
        console.error("Error fetching installed languages:", err);
      }
    };
    fetchInstalled();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1>All Languages</h1>
        <div className={styles.wrapper} >
          <select className={styles.select} value={installLanguage} onChange={onInstallChange}>
            <option value="">Select a language</option>
            {languages.map((language: any) => (
              <option key={language.language} value={language.language}>
                {language.english_name}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={onInstall}>Install Language</button>
        </div>
      </div>

      <div className={styles.container}>
        <h1>Installed Languages</h1>
        <div className={styles.wrapper} >
          <select className={styles.select} value={selectedOption} onChange={onChange}>
            <option value="">Select a language</option>
            {installed.map((lang: any) => (
              <option key={lang.language} value={lang.language}>
                {lang.english_name}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={onClick}>Switch Language</button>
        </div>
      </div>

      <div className={styles.container}>
        <h1>Installed Languages to Delete</h1>
        <div className={styles.wrapper} >
          <select className={styles.select} value={deleteChange} onChange={onDeleteChange}>
            <option value="">Select a language</option>
            {installed.map((lang: any) => (
              <option
                key={lang.language}
                value={lang.language}
                disabled={lang.status === "active"}
              >
                {lang.english_name}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={onDelete} disabled={deleteChange === ""}>
            Delete Language
          </button>
        </div>
      </div>
    </div>
  );
};

export default Language;
