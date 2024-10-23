import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import styles from './UsersTable.module.scss';

interface UserType {
  ID: number;
  user_login: string;
  display_name: string;
  user_email: string;
  user_registered: string;
  roles: string;
}

const UsersTable: React.FC = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [tempMarkedUser, setTempMarkedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<UserType[]>(
          'http://10.10.51.116:3001/wp-cli/user/list/sorted',
          { args: '--json' }
        );
        setData(response.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (user_login: string) => {
    try {
      await axios.post(`http://10.10.51.116:3001/wp-cli/user/delete`, {
        userName: user_login,
      });
      setData((prevData) =>
        prevData.filter((user) => user.user_login !== user_login)
      );
    } catch {
      console.log('Could not delete');
    }
  };

  const showModal = (user_login: string) => {
    setTempMarkedUser(user_login);
    setOpen(true);
  };

  const handleOk = async () => {
    if (tempMarkedUser) {
      await deleteUser(tempMarkedUser);
    }
    setOpen(false);
    setTempMarkedUser(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setTempMarkedUser(null);
  };

  const columns: TableProps<UserType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'User Login',
      dataIndex: 'user_login',
      key: 'user_login',
    },
    {
      title: 'Display Name',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: 'User Registered',
      dataIndex: 'user_registered',
      key: 'user_registered',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record.user_login)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table<UserType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="ID"
      />
      <Modal
        open={open}
        title="Delete Confirmation"
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
          Are you sure you want to delete the{' '}
          <span className={styles.userName}>{tempMarkedUser}</span>?
        </p>
      </Modal>
    </div>
  );
};

export default UsersTable;
