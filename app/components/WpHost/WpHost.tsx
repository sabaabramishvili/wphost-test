"use client";
import { useForm } from "react-hook-form";
import styles from "./WpHost.module.scss";
import axios from "axios";

const WpHost = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values: any) => {
    console.log(values, 'zdddddddddd');
    
    axios
      .post("http://localhost:3001/wordpress/setup", values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <span className={styles.labelText}>siteTitle</span>
        <input
          type="text"
          placeholder="siteTitle"
          {...register("siteTitle")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>wpAdminUser</span>
        <input
          type="text"
          placeholder="WpAdminUser"
          {...register("wpAdminUser")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>wpAdminEmail</span>
        <input
          type="text"
          placeholder="wpAdminEmail"
          {...register("wpAdminEmail")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>wpAdminPassword</span>
        <input
          type="text"
          placeholder="wpAdminPassword"
          {...register("wpAdminPassword")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>dbName</span>
        <input
          type="text"
          placeholder="dbName"
          {...register("dbName")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>dbUser</span>
        <input
          type="text"
          placeholder="dbUser"
          {...register("dbUser")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>dbPassword</span>
        <input
          type="text"
          placeholder="dbPassword"
          {...register("dbPassword")}
          className={styles.inputField}
        />

        <span className={styles.labelText}>siteUrl</span>
        <input
          type="text"
          placeholder="siteUrl"
          {...register("siteUrl")}
          className={styles.inputField}
        />

        <input type="submit" value="Create Wordpress" className={styles.submitButton} />
      </form>
    </div>
  );
};

export default WpHost;
