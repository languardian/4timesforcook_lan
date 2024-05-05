import React, { useState } from 'react';
import { Button, Col, Image, Row, Modal, message } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import './IndexPage.css';
import Axios from '../../components/Axios';
import logo_540 from '../../pictures/logo_540.png';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // example
  const accounts = [
    { id: 1, username: 'DefaultAccount_01', password: 'DefaultAccount_01' },
    { id: 2, username: 'DefaultAccount_02', password: 'DefaultAccount_02' },
    { id: 3, username: 'DefaultAccount_03', password: 'DefaultAccount_03' },
  ];

  const handleGuestLogin = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleLogin = (account) => {
    const accountData = {
      account: account.username,
      password: account.password,
    }

      Axios().post('/Center/login/', JSON.stringify(accountData))
      .then(response => {
        console.log('API response:', response.data);
        if (response.status === 200) {
          window.localStorage.setItem('jwt', response.data.token);
          window.location.reload()
          // message.success('登入成功', { style: { fontSize: '20px' } });
        }
      })
      .catch(error => {
        console.error('Error occurred:', error.response.data);
        if (error.response.status === 500) {
          // Handle 500 error
          message.error("發生非預期錯誤");
        } 
        else if (error.response.status === 400) {
          // Handle 400 error
          message.error("帳號密碼錯誤，請重試");
        }
      });
  };

  return (
    <div className="index-page-container" justify="center" align="middle">

      <Row>
        <Col xs={24} md={24}>
          <Image src={logo_540} preview={false} />
        </Col>        
      </Row>

      <Row gutter={[16, 40]} justify="center">
        <Col xs={24} md={24}>
          <Link to="/Member/login">
            <Button type="primary" size='large' shape='round' icon={<LoginOutlined />} block>
              登入
            </Button>
          </Link>
        </Col>
        <Col xs={24} md={12} style={{ marginTop: '12px' }}>
        <Link to="/Member/register">
          <Button type="default" size='large' shape='round' icon={<UserAddOutlined />} block>
            註冊
          </Button>
        </Link>
        </Col>
        <Col xs={24} md={12} style={{ marginTop: '12px' }}>
          <Button size='large' shape='round' icon={<UserOutlined />} block onClick={handleGuestLogin}>
            訪客登入
          </Button>
        </Col>
      </Row>  

      {/* Modal 组件 */}
      <Modal
        title="選擇訪客帳號"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', height: '300px', overflowY: 'auto' }}>
          {/* example */}
          {accounts.map(account => (
            <Link to="/Recipe/search">
              <Button key={account.id} type="default" size="large" block style={{ marginBottom: '12px' }} onClick={() => handleLogin(account)}>
                {account.username}
              </Button>
            </Link>
          ))}
        </div>
      </Modal>
        
    </div>
  );
};

export default IndexPage;