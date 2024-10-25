"use client";
import { useForm } from "react-hook-form";
import styles from "./Media.module.scss";
import axios from "axios";

const Media = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    const data = new FormData();
    if (values.file && values.file.length > 0) {
      data.append("file", values.file[0]);
    } else {
      console.error("No file selected!");
    }

    console.log(values);

    axios
      .post("http://localhost:3001/wp-cli/media/import", data)
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
        <input type="file" {...register("file")} className={styles.input}/>
        <input type="submit" value="Upload" className={styles.button} />
      </form>
    </div>
  );
};

export default Media;
