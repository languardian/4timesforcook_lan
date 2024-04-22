import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd'; // 导入 message 组件
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
// import background from'../../../pictures/Background.png'
import Axios from '../../../../components/Axios';
import { Link } from 'react-router-dom';



const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    setLoading(true);
    console.log('Received values:', values);
    const axiosInstance = Axios();
    axiosInstance.post("Center/login/", JSON.stringify(values))
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
        setLoading(false);
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
    <div className="loginpage-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h2 style={{ textAlign: "center" }}>登入</h2>
        <Form.Item
          name="account"
          rules={[{ required: true, message: '請輸入帳號!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="帳號" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '請輸入密碼!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密碼"
          />
        </Form.Item>
        <Form.Item>
          <div className="login-buttons">
            <Link to="/" style={{ textDecoration: 'underline' }}>遊客登入</Link>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              登入
            </Button>
            <Link to="/Member/register" style={{ textDecoration: 'underline' }}>尚未註冊</Link>
          </div>
        </Form.Item>
      </Form>
      {showMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default Login;
