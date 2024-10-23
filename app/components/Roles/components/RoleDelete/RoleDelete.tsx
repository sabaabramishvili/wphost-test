"use client";
import { useState } from "react";
import styles from "./RoleDelete.module.scss";
import axios from "axios";

const RoleDelete = () => {
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const onClick = async () => {
    try {
      await axios.post("http://localhost:3001/wp-cli/roles/delete", {
        roleName: user,
      });
      console.log(`Role created for user: ${user}`);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <div className={styles.container}>
        <h1 className={styles.captions} >RoleDelete</h1>
      <input
        className={styles.input}
        type="text"
        value={user}
        onChange={inputChange}
        placeholder="Enter role for user"
      />
      <input className={styles.button} type="submit" onClick={onClick} value="Submit" />
    </div>
  );
};

export default RoleDelete;
