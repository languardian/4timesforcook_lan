import React, { useEffect, useState } from 'react'
import Health from '../../../components/manage_components/Health'
import Record from '../../../components/manage_components/Record'
import Recommend from '../../../components/manage_components/Recommend'
import './Healthmanage.css';
import Axios from '../../../components/Axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // 設定Modal的掛載點

function Healthmanage() {
  const [health, setHealth] = useState(null);
  const [record, setRecord] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false); // 用於彈窗
  const navigate = useNavigate(); // 用於導向

  useEffect(() => {
    Axios().get('/HManage/Personal/')
      .then(response => {
        const res = response.data;
        setHealth(res.week);
        setRecord(res.record);
        console.log(res.week);
        console.log(res.record);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setShowModal(true); // 顯示彈窗
          navigate('/Member/login'); // 導向到登入頁面
        } else {
          console.error('Error fetching data:', error);
        }
      });

    Axios().get('/HManage/recipe/')
      .then(response => {
        const res = response.data;
        setRecipe(res);
        console.log(recipe);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setShowModal(true); // 顯示彈窗
          navigate('/Member/login'); // 導向到登入頁面
        } else {
          console.error('獲取推薦食譜出錯:', error);
        }
      });
  }, []);

  if (!health && !record) {
    return (
      <div>
        <p>載入中...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div className='sss'>
      <Health health={health} className="healthdiv" />
      <Record record={record} className="recorddiv" />
      <Recommend recipe={recipe} className="recipediv" />

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="尚未登入"
      >
        <h2>尚未登入</h2>
        <p>請前往登入頁面</p>
        <button onClick={() => setShowModal(false)}>關閉</button>
      </Modal>
    </div>
  );
}

export default Healthmanage;
