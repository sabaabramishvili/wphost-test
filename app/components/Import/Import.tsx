"use client";
import { useForm } from "react-hook-form";
import styles from './Import.module.scss'
import axios from "axios";

const Import = () => {
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

    axios
      .post("http://localhost:3001/wp-cli/import", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
      alert('succesfully imported')
    };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <input
          type="file"
          accept=".xml"
          {...register("file", {
            required: "Please select a file",
            validate: {
              isXml: (files) =>
                files && files[0].type === "text/xml" || "Only XML files are allowed"
            },
          })}
          className={styles.input}
        />
        <input type="submit" value="Upload" className={styles.button} />
      </form>
    </div>
  );
};

export default Import;
