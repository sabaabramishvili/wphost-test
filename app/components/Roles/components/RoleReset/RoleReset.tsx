"use client";
import { useState } from "react";
import styles from "./RoleReset.module.scss";
import axios from "axios";

const RoleReset = () => {
  const [user, setUser] = useState("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const onClick = async () => {
    try {
      await axios.post("http://localhost:3001/wp-cli/role/reset", {
        args: user,
      });
      console.log(`Role created for user: ${user}`);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.caption}>RoleReset</h1>
      <input
        type="text"
        value={user}
        onChange={inputChange}
        placeholder="Enter role for user"
        className={styles.input}
      />
      <input
        type="submit"
        onClick={onClick}
        value="Submit"
        className={styles.button}
      />
    </div>
  );
};

export default RoleReset;
