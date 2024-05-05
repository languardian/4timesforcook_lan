import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from '../../../components/redux_components/actions';
import Axios from '../../../components/Axios';
import { Modal, Form, Input, Button, Row, Col, Radio, Checkbox, DatePicker, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../pictures/ffff.png';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationData = useSelector((state) => state.registrationData);
  const [loading, setLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // 控制隱私條款互動視窗的顯示狀態

  useEffect(() => {
    // 組件掛載時顯示隱私條款互動視窗
    setShowPrivacyModal(true);
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // 使用 Date 物件將 ISO 8601 格式轉換成目標格式(YYYY/MM/DD)
      const birthDate = new Date(values.birth);
      const formattedBirth = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;

      // 使用 useSelector 從 store 中獲取 registrationData
      const existingData = registrationData;

      // 合併新的和已存在的資料
      const combinedData = {
        Private: {
          account: values.account,
          password: values.password,
          ...existingData?.Private, // 保留已存在的 Private 資料
        },
        Member: {
          name: values.name,
          birth: formattedBirth,
          email: values.email,
          gender: values.gender,
          job: values.job,
          ...existingData?.Member, // 保留已存在的 Member 資料
        },
        Health: {
          height: parseFloat(values.height),
          weight: parseFloat(values.weight),
          mental: values.mental || [],
          exercise_intensity: parseFloat(values.exercise_intensity),
          excercise_frequency: parseFloat(values.excercise_frequency),
          excercise_time: parseFloat(values.excercise_time),
          allergen: values.allergen || [],
          disease: values.disease || [],
        },
        Prefer: {
          target: values.target || [],
          restrict: values.restrict || [],
          prefer: values.prefer || [],
          Nut_need: values.Nut_need || [],
        },
        ...existingData, // 保留已存在的資料
      };

      // 更新 Redux store
      dispatch(updateRegistrationData(combinedData));

      console.log('Combined Data:', combinedData);


      const tokenResponse = await Axios().post('Center/register/', combinedData);

      // 從後端獲取JWT令牌
      const token = tokenResponse.data.token;

      // 將JWT令牌保存到LocalStorage中
      localStorage.setItem('jwt', token);

      // 如果後端回傳200狀態碼
      if (tokenResponse.status === 200) {
        Modal.success({
          title: '註冊成功',
          content: tokenResponse.data.message,
          onOk: () => {
            navigate('/Recipe/search');
          },
        });
      } else {
        // 如果後端回傳其他狀態碼
        Modal.error({
          title: '註冊失敗',
          content: '註冊失敗，請稍後再試，或者聯繫客服。',
        });
      }
    } catch (error) {
      console.error('註冊失敗:', error);
      let errorMessage = '';

      // 處理錯誤訊息
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = '請檢查您的註冊資料並嘗試重新提交。';
        } else if (error.response.status === 401 || error.response.status === 404) {
          errorMessage = '此信箱或帳號已被使用，請嘗試使用其他信箱或帳號。';
        } else {
          errorMessage = '註冊失敗，請稍後再試，或者聯繫客服。';
        }
      } else {
        errorMessage = '註冊失敗，請檢查您的網路連接或是後端並無開啟並稍後再試。';
      }

      // 顯示錯誤訊息
      Modal.error({
        title: '註冊失敗',
        content: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  const inputStyle = {
    height: '31px', // 設置固定的輸入框高度
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 背景圖片 */}
      <img src={backgroundImage} alt="Background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1000 }} />
      {/* 覆蓋層 */}
      <div style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', zIndex: -1 }}></div>
      {/* 註冊表單 */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '50px', maxWidth: '600px', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>

        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>註冊頁面</h1>
        <Form
          name="registration"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Col span={24}>

            <Divider style={{ margin: '20px 0', borderColor: 'rgba(0, 0, 0, 0.3)' }} />
            <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>會員基本資料</h3>

          </Col>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="使用者名稱"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '請輸入使用者名稱!',
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="生日"
                name="birth"
                rules={[
                  {
                    required: true,
                    message: '請選擇生日!',
                  },
                ]}
              >
                <DatePicker format="YYYY/MM/DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="電子郵件"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: '請輸入有效的電子郵件地址!',
                  },
                  {
                    required: true,
                    message: '請輸入電子郵件地址!',
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="性別"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: '請選擇性別!',
                  },
                ]}
              >
                <Radio.Group style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Radio value="male">男性</Radio>
                  <Radio value="female">女性</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="帳號"
                name="account"
                rules={[
                  {
                    required: true,
                    message: '請輸入帳號!',
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="職業"
                name="job"
                rules={[
                  {
                    required: true,
                    message: '請輸入職業!',
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="密碼"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '請輸入密碼!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="二次密碼"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '請再次輸入密碼!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('兩次輸入的密碼不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>

              <Divider style={{ margin: '20px 0', borderColor: 'rgba(0, 0, 0, 0.3)' }} />
              <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>飲食目標</h3>

            </Col>

            <Col span={12}>
              {/* 飲食目標 */}
              <Form.Item
                name="target"
                label="飲食目標"
                rules={[
                  {
                    required: true,
                    message: '請選擇飲食目標!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="loseWeight">減重</Checkbox>
                  <Checkbox value="muscleGain">增肌</Checkbox>
                  <Checkbox value="maintainHealth">保持健康</Checkbox>
                  <Checkbox value="controlBloodSugar">控制血糖</Checkbox>
                  <Checkbox value="controlCholesterol">控制膽固醇</Checkbox>
                  <Checkbox value="increaseEnergy">增加能量</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="飲食限制"
                name="restrict"
                rules={[
                  {
                    required: true,
                    message: '請選擇飲食限制和偏好!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="vegetarian">素食</Checkbox>
                  <Checkbox value="omnivorous">葷素搭配</Checkbox>
                  <Checkbox value="lowCarb">低醣飲食</Checkbox>
                  <Checkbox value="glutenFree">無麩質</Checkbox>
                  <Checkbox value="lowFat">低脂飲食</Checkbox>
                  <Checkbox value="organic">有機食材</Checkbox>
                  <Checkbox value="lowSodium">低鈉飲食</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* 其他表單項目 ... */}
              <Form.Item
                name="prefer"
                label="飲食偏好"
                rules={[
                  {
                    required: true,
                    message: '請選擇喜愛的料理類型!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="chinese">中式料理</Checkbox>
                  <Checkbox value="western">西式料理</Checkbox>
                  <Checkbox value="japanese">日式料理</Checkbox>
                  <Checkbox value="indian">印度料理</Checkbox>
                  <Checkbox value="thai">泰式料理</Checkbox>
                  <Checkbox value="mediterranean">地中海料理</Checkbox>
                  <Checkbox value="vegetarian">素食</Checkbox>
                  <Checkbox value="fastfood">快餐</Checkbox>
                  {/* 其他複選框 */}
                </Checkbox.Group>
              </Form.Item>
              {/* 其他表單項目 ... */}
            </Col>
            <Col span={12}>
              <Form.Item
                name="Nut_need"
                label="營養需求"
                rules={[
                  {
                    required: true,
                    message: '請選擇營養需求!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="highProtein">高蛋白質</Checkbox>
                  <Checkbox value="lowCarb">低碳水</Checkbox>
                  <Checkbox value="highFiber">高纖維</Checkbox>
                  <Checkbox value="lowFat">低脂肪</Checkbox>
                  <Checkbox value="calorieControl">控制總熱量</Checkbox>
                  <Checkbox value="balancedIntake">均衡攝取</Checkbox>
                  {/* 其他營養需求的複選框 */}
                </Checkbox.Group>
              </Form.Item>
              {/* 其他表單項目 ... */}
            </Col>


            <Col span={24}>

              <Divider style={{ margin: '20px 0', borderColor: 'rgba(0, 0, 0, 0.3)' }} />
              <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>會員健康資料</h3>

            </Col>


            <Col span={12}>
              <Form.Item
                label="身高(CM)"
                name="height"
                rules={[
                  {
                    required: true,
                    message: '請輸入身高!',
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="體重(KG)"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: '請輸入體重!',
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="運動頻率(每周)"
                name="excercise_frequency"
                rules={[
                  {
                    required: true,
                    message: '請選擇運動頻率!',
                  },
                ]}
              >
                <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Radio value="5">每天</Radio>
                  <Radio value="4">五次以上</Radio>
                  <Radio value="3">三到四次</Radio>
                  <Radio value="2">一到兩次</Radio>
                  <Radio value="1">從不運動</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="運動強度"
                name="exercise_intensity"
                rules={[
                  {
                    required: true,
                    message: '請選擇運動強度!',
                  },
                ]}
              >
                <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Radio value="4">強度高</Radio>
                  <Radio value="3">強度中</Radio>
                  <Radio value="2">強度低</Radio>
                  <Radio value="1">無</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="過敏原"
                name="allergen"
                rules={[
                  {
                    required: true,
                    message: '請選擇過敏原!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="dairy">乳製品</Checkbox>
                  <Checkbox value="gluten">麩質</Checkbox>
                  <Checkbox value="egg">蛋類</Checkbox>
                  <Checkbox value="peanut">花生</Checkbox>
                  <Checkbox value="nut">堅果</Checkbox>
                  <Checkbox value="seafood">海鮮</Checkbox>
                  <Checkbox value="soy">大豆</Checkbox>
                  <Checkbox value="not">無</Checkbox>
                  {/* 其他過敏原的複選框 */}
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="慢性疾病"
                name="disease"
                rules={[
                  {
                    required: true,
                    message: '請選擇慢性疾病!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="hypertension">高血壓</Checkbox>
                  <Checkbox value="diabetes">糖尿病</Checkbox>
                  <Checkbox value="highCholesterol">高膽固醇</Checkbox>
                  <Checkbox value="heartDisease">心臟病</Checkbox>
                  <Checkbox value="chronicKidneyDisease">慢性腎病</Checkbox>
                  <Checkbox value="chronicLungDisease">慢性肺病</Checkbox>
                  <Checkbox value="arthritis">關節炎</Checkbox>
                  <Checkbox value="gastrointestinalDisease">腸疾病</Checkbox>
                  <Checkbox value="not">無</Checkbox>
                  {/* 其他慢性疾病的複選框 */}
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="心理因素"
                name="mental"
                rules={[
                  {
                    required: true,
                    message: '請選擇心理因素!',
                  },
                ]}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox value="specialRituals">對飲食有特殊儀式感</Checkbox>
                  <Checkbox value="eatOutWhenBusy">工作繁忙時容易選擇外食</Checkbox>
                  <Checkbox value="snackWhenDown">情緒低落時愛吃零食</Checkbox>
                  <Checkbox value="appetiteDecreasesUnderStress">壓力時食慾減退</Checkbox>
                  <Checkbox value="bingeEatingUnderStress">壓力時容易暴飲暴食</Checkbox>
                  <Checkbox value="not">無</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="運動時間"
                name="excercise_time"
                rules={[
                  {
                    required: true,
                    message: '請選擇運動時間!',
                  },
                ]}
              >
                <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  <Radio value="3">時間長</Radio>
                  <Radio value="2">時間短</Radio>
                  <Radio value="1">無</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              完成註冊
            </Button>
          </Form.Item>
        </Form>
      </div>
            {/* 隱私條款互動視窗 */}
            <Modal
        title="隱私政策"
        visible={showPrivacyModal}
        onCancel={() => setShowPrivacyModal(false)}
        footer={[
          <Button key="agree" type="primary" onClick={() => setShowPrivacyModal(false)}>
            同意
          </Button>,
        ]}
      >
        <p>歡迎來到我們的註冊頁面！我們重視您的隱私，承諾不會外洩您的個人資訊。您的安全與信任是我們最重要的考量之一。請仔細閱讀我們的隱私政策，如有任何問題，請隨時聯繫我們。</p>
      </Modal>
      </div>

  );
};

export default RegistrationForm;
