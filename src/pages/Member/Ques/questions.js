import React, { useState, useEffect } from 'react';
import { Modal, Radio, Button } from 'antd';
import Axios from '../../../components/Axios';
import backgroundImage from '../../../pictures/ffff.png';
import { useLocation, useNavigate } from 'react-router-dom'; // 引入 useLocation 和 useNavigate hooks

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 控制成功提示框顯示
  const location = useLocation(); // 初始化 useLocation hook
  const navigate = useNavigate(); // 初始化 useNavigate hook

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await Axios().get('/Test/question/');
        const updatedQuestions = response.data.map(question => ({ ...question, required: true }));
        setQuestions(updatedQuestions);
        setLoading(false);
        console.log(location.state)
      } catch (error) {
        console.error('無法獲取題目:', error);
        Modal.error({
          title: '錯誤',
          content: '無法獲取題目，請稍後再試。',
        });
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // 根據路由參數 is_post_test 的值來過濾題目
    const isPostTest = location.state?.is_post_test;
    if (isPostTest !== undefined) {
      const filteredQuestions = questions.filter(question => question.is_post_test === isPostTest);
      setQuestions(filteredQuestions);
    }
  }, [location.state?.is_post_test]);

  const handleAnswerChange = (qid, value) => {
    setAnswers({
      ...answers,
      [qid]: value,
    });
  };

  const recordAnswers = async () => {
    const unanswered = questions.filter(question => !answers[question.qid]);
    setUnansweredQuestions(unanswered);
    const answeredQuestions = Object.keys(answers);
  
    if (answeredQuestions.length !== questions.length) {
      Modal.warning({
        title: '提示',
        content: '請回答所有問題後再提交。',
      });
      return;
    }
  
    // 根據 is_post_test 設置值來組合資料
    const postData = questions.map(question => ({
      qid: question.qid,
      answer: answers[question.qid],
      is_post_test: location.state?.is_post_test || 0,
    }));
    console.log(postData)
    
    try {
      const response = await Axios().post('/Test/check/', postData);
      console.log('提交成功:', response.data.message);

      // 成功提交後顯示成功提示框
      setShowSuccessModal(true);
    } catch (error) {
      console.error('提交失敗:', error.response.data.message);
    }
  };
  

  return (
    <div style={{ position: 'relative' }}>
      <img src={backgroundImage} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.3)', zIndex: 0 }}></div>
      <div style={{ position: 'relative', zIndex: 1, padding: '50px', maxWidth: '600px', margin: 'auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ marginBottom: '16px', textAlign: 'center' }}>
          {location.state?.is_post_test === 1 ? '後測題目' : '前測題目'}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {questions.map((question, index) => (
              <React.Fragment key={question.qid}>
                <li>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* 顯示必填星號 */}
                    {unansweredQuestions.includes(question) && <p style={{ color: 'red' }}>*</p>}
                    <p>{question.content}</p>
                  </div>
                  {/* 使用 Radio 組件顯示選項 */}
                  <Radio.Group onChange={(e) => handleAnswerChange(question.qid, e.target.value)} value={answers[question.qid]}>
                    <Radio value={"A"}>{question.option1}</Radio>
                    <Radio value={"B"}>{question.option2}</Radio>
                    <Radio value={"C"}>{question.option3}</Radio>
                    <Radio value={"D"}>{question.option4}</Radio>
                  </Radio.Group>
                </li>
                {index !== questions.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </ul>
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={recordAnswers}>送出</Button>
        </div>
      </div>

      {/* 成功提示框 */}
      <Modal
        title="作答完成"
        visible={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        footer={[
          <Button key="back" onClick={() => navigate('/Recipe/search')}>
            前往食譜搜尋頁面
          </Button>,
        ]}
      >
        恭喜您，您已成功作答完成！
      </Modal>
    </div>
  );
};

export default QuestionPage;
