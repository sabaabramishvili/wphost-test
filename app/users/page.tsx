'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import axios from 'axios';

interface RolesPropsInterface {
  role: string;
}

interface RolesCapabilitiesPropsInterface {
  name: string;
}

const Users = () => {
  const [capabilities] = useState<string[]>([
    'switch_themes',
    'edit_themes',
    'activate_plugins',
    'edit_plugins',
    'edit_users',
    'edit_files',
    'manage_options',
    'moderate_comments',
    'manage_categories',
    'manage_links',
    'upload_files',
    'import',
    'unfiltered_html',
    'edit_posts',
    'edit_others_posts',
    'edit_published_posts',
    'publish_posts',
    'edit_pages',
    'read',
    'level_10',
    'level_9',
    'level_8',
    'level_7',
    'level_6',
    'level_5',
    'level_4',
    'level_3',
    'level_2',
    'level_1',
    'level_0',
    'edit_others_pages',
    'edit_published_pages',
    'publish_pages',
    'delete_pages',
    'delete_others_pages',
    'delete_published_pages',
    'delete_posts',
    'delete_others_posts',
    'delete_published_posts',
    'delete_private_posts',
    'edit_private_posts',
    'read_private_posts',
    'delete_private_pages',
    'edit_private_pages',
    'read_private_pages',
    'delete_users',
    'create_users',
    'unfiltered_upload',
    'edit_dashboard',
    'update_plugins',
    'delete_plugins',
    'install_plugins',
    'update_themes',
    'install_themes',
    'update_core',
    'list_users',
    'remove_users',
    'promote_users',
    'edit_theme_options',
    'delete_themes',
    'export',
  ]);

  const [roles, setRoles] = useState<RolesPropsInterface[]>([]);
  const [roleCapabilities, setRoleCapabilities] = useState<
    RolesCapabilitiesPropsInterface[]
  >([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCapability, setSelectedCapability] = useState<string>('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          'http://10.10.51.116:3001/wp-cli/roles'
        );
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const fetchRoleCapabilities = async () => {
        try {
          const response = await axios.post(
            'http://10.10.51.116:3001/wp-cli/cap',
            {
              role: selectedRole,
            }
          );
          setRoleCapabilities(response.data);
        } catch (error) {
          console.error('Error fetching role capabilities:', error);
        }
      };
      fetchRoleCapabilities();
    }
  }, [selectedRole]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    setRoleCapabilities([]);
  };

  const handleCapabilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCapability(event.target.value);
  };

  const selectedRoleCapabilityNames = roleCapabilities.map((item) => item.name);
  const filteredCapabilities = capabilities.filter(
    (capability) => !selectedRoleCapabilityNames.includes(capability)
  );

  const onHandleSubmit = async () => {
    if (selectedCapability) {
      try {
        await axios.post('http://10.10.51.116:3001/wp-cli/cap-add', {
          role: selectedRole,
          capability: selectedCapability,
        });

        setRoleCapabilities((prev) => [...prev, { name: selectedCapability }]);
        setSelectedCapability('');
      } catch (error) {
        console.error('Error adding capability:', error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainWrapper}>
        <div className={styles.labelWrapper}>
          <label htmlFor="select1">Select Role</label>
          <select
            id="select1"
            defaultValue="Choose a role"
            onChange={handleRoleChange}
          >
            <option value="" disabled>
              Choose a role
            </option>
            {roles.map((item, index) => (
              <option value={item.role} key={index}>
                {item.role}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.labelWrapper}>
          <label htmlFor="select2">{"Role's Capabilities"}</label>
          <select id="select2">
            {roleCapabilities.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.labelWrapper}>
          <label htmlFor="capabilities">Capabilities</label>
          <select id="capabilities" onChange={handleCapabilityChange}>
            {filteredCapabilities.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className={styles.Button} onClick={onHandleSubmit}>
        Add Capabilities
      </button>
    </div>
  );
};

export default Users;
