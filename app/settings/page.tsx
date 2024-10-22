'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import { Switch, Modal, Button } from 'antd';
import axios from 'axios';

const Settings = () => {
  const [marked, setMarked] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempMarked, setTempMarked] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('marked');
    if (savedState !== null) {
      setMarked(JSON.parse(savedState));
    }
  }, []);

  const toggleSiteStatus = (newState: boolean) => {
    setMarked(newState);
    localStorage.setItem('marked', JSON.stringify(newState));

    if (newState) {
      axios.post('http://10.10.51.116:3001/wp-cli/maintenance/enable');
    } else {
      axios.post('http://10.10.51.116:3001/wp-cli/maintenance/disable');
    }
  };

  const onClickSwitch = () => {
    setTempMarked(!marked);
    showModal();
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    toggleSiteStatus(tempMarked);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <p>Manage your site!</p>
      <span>Activate or Deactivate your WordPress site.</span>
      <div className={styles.container}>
        <Switch checked={marked} onClick={onClickSwitch} value={marked} />
      </div>
      <Modal
        open={open}
        title="Are you sure?"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
        <p>
          {tempMarked
            ? 'Do you want to enable maintenance mode?'
            : 'Do you want to disable maintenance mode?'}
        </p>
      </Modal>
    </div>
  );
};

export default Settings;
