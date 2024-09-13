import React, { useState } from 'react';
import { Button, Col, Image, Row, Modal, message, Card } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import './IndexPage.css';
import Axios from '../../components/Axios';
import logo_540 from '../../pictures/logo_540.png';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // example
  const accounts = [
    { id: 1, username: 'DefaultAccount_01', password: 'DefaultAccount_01', description: '一般使用者' },
    { id: 2, username: 'DefaultAccount_02', password: 'DefaultAccount_02', description: '使用者為中年男子，因長年睡眠不足，患有高血壓之症狀' },
    { id: 3, username: 'DefaultAccount_03', password: 'DefaultAccount_03', description: '使用者為上班族，加班導致無規律的飲食，患有糖尿病之相關症狀' },
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
    console.log(accountData);

      Axios().post('/Center/login/', JSON.stringify(accountData))
      .then(response => {
        console.log('API response:', response.data);
        if (response.status === 200) {
          window.localStorage.setItem('jwt', response.data.token);
          message.success('登入成功', { style: { fontSize: '20px' } });
          setLoading(false);
          setShowMessage(true);
          setTimeout(() => {
            // Redirect to menu page after successful login
            window.location.href = "/Recipe/search"; // Use window.location to redirect
          }, 1000); // 1 second delay
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
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setErrorMessage(""); // Clear error message
        }, 1000);
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
        <Col xs={24} md={12}>
          <Link to="/Member/login">
            <Button type="primary" size='large' shape='round' icon={<LoginOutlined />} block>
              登入
            </Button>
          </Link>
        </Col>
        <Col xs={24} md={12}>
        <Link to="/Member/register">
          <Button type="default" size='large' shape='round' icon={<UserAddOutlined />} block>
            註冊
          </Button>
        </Link>
        </Col>
      </Row>

      <Row gutter={[16, 40]}>
        <Col xs={24} md={24} style={{ marginTop: '24px' }}>
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
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          {/* 使用卡片呈現每個使用者 */}
          {accounts.map(account => (
            <Card
              key={account.id}
              title={account.username}
              style={{ marginBottom: '12px' }}
              onClick={() => handleLogin(account)}
              loading={loading}
            >
              <p>{account.description}</p>
            </Card>
          ))}
          {/* 顯示錯誤訊息 */}
          {showMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
        </div>
</Modal>

        
    </div>
  );
};

export default IndexPage;