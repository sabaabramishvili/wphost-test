import { useState } from "react";
import styles from "./SearchReplace.module.scss";
import axios from "axios";

const SearchReplace = () => {
  const [oldWord, setOldWord] = useState("");
  const [newWord, setNewWord] = useState("");

  const oldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldWord(e.target.value);
  };

  const newOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.target.value);
  };

  const onClick = () => {
    axios.post('http://localhost:3001/wp-cli/search-replace', {
      oldValue: oldWord,
      newValue: newWord,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Search for Replace</h1>
      <input
        type="text"
        value={oldWord}
        onChange={oldOnChange}
        placeholder="Old Word"
        className={styles.inputField}
      />
      <input
        type="text"
        value={newWord}
        onChange={newOnChange}
        placeholder="New Word"
        className={styles.inputField}
      />
      <input
        type="submit"
        value="Replace"
        onClick={onClick}
        className={styles.submitButton}
      />
    </div>
  );
};

export default SearchReplace;
