import React from 'react';
import { Menu, Row, Col, Image } from 'antd';
import { HomeOutlined, ReadOutlined, ExperimentOutlined, HeartOutlined, LoginOutlined } from '@ant-design/icons';
import logo from '../pictures/logo1000x400.png'
import { Link, useNavigate } from 'react-router-dom';

/**
 * 嗚嗚嗚沒辦法跳轉
 * @returns
 */
const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, isPostTest) => {
    // 根據所選連結設置不同的 is_post_test 參數
    const isPostTestParam = path === '/question' ? isPostTest : undefined;
    // 導航到指定路徑，同時傳遞 is_post_test 參數
    navigate(path, { state: { is_post_test: isPostTestParam } });
  
    // 強制重新加載頁面
    window.location.reload();
  };
  const jwtToken = window.localStorage.getItem('jwt');

  const LogIn = () => {
    const w = window.open("/Member/login", '_self');
  }

  const LogOut = () => {
    window.localStorage.removeItem('jwt');
    alert('您已登出');
    navigate('/');
    window.location.reload();
  }
  


  return (
    <Row justify="space-between">
      <Col>
        <div style={{ color: 'white', fontSize: '24px' }}>
          <Image width={190} preview={false} src={logo} />
        </div>
      </Col>
      <Col>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { navigate("/") }}>
            首頁
          </Menu.Item>
          <Menu.Item key="2" icon={<ReadOutlined />} onClick={() => { handleNavigation("/KnowledgeBase", 0) }}>
            知識專區
          </Menu.Item>
          <Menu.Item key="3" icon={<ExperimentOutlined />} onClick={() => { handleNavigation("/question", 0) }}>
            前測
          </Menu.Item>
          <Menu.Item key="4" icon={<ExperimentOutlined />} onClick={() => { handleNavigation("/question", 1) }}>
            後測
          </Menu.Item>
          <Menu.Item key="5" icon={<HeartOutlined />} onClick={() => { navigate("/Member/HealthMange") }}>
            健康管理
          </Menu.Item>
          {jwtToken === 'None' || jwtToken === null?
                      <Link className='nav-to-profile' onClick={() => LogIn()}>
                        <Menu.Item key="6" icon={<LoginOutlined />} onClick={()=>{navigate("/")}}>
                          登入
                        </Menu.Item>
                      </Link>
                      :
                      <Link className='nav-to-profile' onClick={() => LogOut()}>
                        <Menu.Item key="6" icon={<LoginOutlined />} onClick={()=>{navigate("/")}}>
                          登出
                        </Menu.Item>
                      </Link>
                    }
          <Menu.Item key="7" icon={<LoginOutlined />} onClick={() => { navigate("/Recipe/search") }}>
            食譜查詢
          </Menu.Item>
          {/* <Menu.Item key="8" icon={<LoginOutlined />} onClick={()=>{ navigate("/RecipePage")}}>
            搜尋結果
          </Menu.Item> */}
        </Menu>
      </Col>
    </Row>
  );
};

export default Navbar;