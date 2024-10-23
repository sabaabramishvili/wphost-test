import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import style from './UserGenerate.module.scss';

interface UserPropsInterface {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

const UserGenerate = () => {
  const [, setUserCounter] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState<number | string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPropsInterface>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      displayName: '',
    },
  });

  const onHandleClick = async () => {
    const count =
      typeof numberOfUsers === 'number' && numberOfUsers > 0
        ? numberOfUsers
        : 0;
    setUserCounter((prevCount) => prevCount + count);

    if (count > 0) {
      try {
        await axios.post('http://10.10.51.116:3001/wp-cli/user/generate', {
          count: count,
        });
      } catch {
        alert('Could not generate users');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfUsers(isNaN(value) ? '' : value);
  };

  const onSubmit = async (data: UserPropsInterface) => {
    try {
      await axios.post('http://10.10.51.116:3001/wp-cli/user/create', data);
      alert('User created successfully!');
    } catch {
      alert('Could not add user');
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <p>Generate Users!</p>
        <input
          type="number"
          value={numberOfUsers}
          onChange={handleInputChange}
          placeholder="Enter number of users"
          min="0"
          max="10"
        />
        <button onClick={onHandleClick}>Add</button>
      </div>
      <div className={style.wrapperContainer}>
        <p>User Creation</p>
        <form onSubmit={handleSubmit(onSubmit)} className={style.inputWrapper}>
          <div className={style.inputContainer}>
            <div className={style.inputs}>
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <span className={style.error}>{errors.username.message}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className={style.error}>{errors.email.message}</span>
              )}
            </div>
            <div className={style.inputs}>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <span className={style.error}>{errors.password.message}</span>
              )}

              <input
                type="text"
                placeholder="Display Name"
                {...register('displayName', {
                  required: 'Display name is required',
                })}
              />
              {errors.displayName && (
                <span className={style.error}>
                  {errors.displayName.message}
                </span>
              )}
            </div>
          </div>
          <button type="submit" className={style.button}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserGenerate;
