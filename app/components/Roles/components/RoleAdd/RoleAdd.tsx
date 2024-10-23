"use client";
import { useState } from "react";
import axios from "axios";
import styles from './RoleAdd.module.scss'

const RoleAdd = () => {
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const displayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const onClick = async () => {
    try {
      await axios.post("http://localhost:3001/wp-cli/role/create", {
        roleName: user,
        displayName: displayName,
      });
      console.log(`Role created for user: ${user}`);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>RoleAdd</h1>

      <input
        className={styles.inputRole}
        type="text"
        value={user}
        onChange={inputChange}
        placeholder="Enter role for user"
      />
      <input
        className={styles.inputUser}
        type="text"
        value={displayName}
        onChange={displayChange}
        placeholder="Enter displayname for user"
      />
      <input className={styles.button} type="submit" onClick={onClick} value="Submit" />
    </div>
  );
};

export default RoleAdd;
