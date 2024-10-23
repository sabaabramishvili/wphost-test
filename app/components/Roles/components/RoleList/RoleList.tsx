'use client';

import { useEffect, useState } from 'react';
import styles from './RoleList.module.scss';
import axios from 'axios';

const RoleList = () => {
  const [list, setList] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    axios.get('http://10.10.51.116:3001/wp-cli/roles').then((response) => {
      setList(response.data);
    });
  }, []);

  const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Role List</h1>
      <select
        className={styles.select}
        value={selectedRole}
        onChange={onRoleChange}
      >
        <option value="">Select a role</option>
        {list.map((role: any) => (
          <option key={role.name} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleList;
