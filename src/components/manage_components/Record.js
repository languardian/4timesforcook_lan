import React, { useState, useEffect } from 'react';
import './Record.css';
import CalImage from '../../pictures/Cal.png';
import WaterImage from '../../pictures/Water.png';
import ExerciseImage from '../../pictures/Exercise.png';


// 獨立的圖片元件
function ImageWithText({ src, alt, text, fontSize }) {
  return (
    <div style={{ marginRight: 20 }}>
      <img alt={alt} style={{ width: '100%' }} src={src} />
      <p style={{ textAlign: 'center', fontSize: fontSize }}>{text}</p>
    </div>
  );
}

function Record({record}) {
  const [C_remain,setC] = useState(record.calories_remain)
  const [W_remain,setW] = useState(record.water_remain)
  const [E_remain,setE] = useState(record.exercise_remain)
  useEffect(() => {
    if (C_remain <= 0) {
      setC("已達標");
    }
    if (W_remain <= 0) {
      setW("已達標");
    }
    if (E_remain <= 0) {
      setE("已達成");
    }
  }, []); // 只在組件初始化時執行一次
  return (
    <div className="record-wrapper">
      <h1 style={{textAlign:'center'}}>身體狀況記錄!</h1>
      <div className='record-container'>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <ImageWithText src={CalImage} alt="卡路里" text="卡路里攝取" fontSize="20px" />
          <div className="calories-info" style={{fontSize:"20px"}}>
            <div className="calories-row" >
              <span>目標<span className="bold">{record.calories_target}</span> 卡</span>
            </div>
            <div className="calories-row">
              <span>目前攝取<span className="bold">{record.calories_now}</span> 卡</span>
            </div>
            <div className="calories-row">
              {C_remain === '已達標' ? (
                  <span className="bold" style={{fontSize: 30, color: 'green'}}>{C_remain}</span>
              )
              :(
                <span>剩餘<span className="bold">{C_remain}</span> 卡</span>
              )}
            </div>
          </div>
          <ImageWithText src={WaterImage} alt="水份" text="水份攝取" fontSize="20px" />
          <div className="water-info" style={{fontSize:"20px"}}>
            <div className="water-row" >
              <span>目標<span className="bold">{record.water_target}</span> 毫升</span>
            </div>
            <div className="water-row">
              <span>目前飲用<span className="bold">{record.water_now}</span> 毫升</span>
            </div>
            <div className="water-row">
            {W_remain === '已達標' ? (
                  <span className="bold" style={{fontSize: 30, color: 'green'}}>{W_remain}</span>
              )
              :(
                <span>剩餘<span className="bold">{W_remain}</span> 卡</span>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <ImageWithText src={ExerciseImage} alt="運動" text="運動量" fontSize="20px" />
          <div className="exercise-info" style={{fontSize:"20px"}}>
            <div className="exercise-row">
              <span>目標<span className="bold">{record.exercise_target}</span> MET</span>
            </div>
            <div className="exercise-row">
              <span>目前達到<span className="bold">{record.exercise_now}</span> MET</span>
            </div>
            <div className="exercise-row">
            {E_remain === '已達成' ? (
                  <span className="bold" style={{fontSize: 30, color: 'green'}}>{E_remain}</span>
              )
              :(
                <span>剩餘<span className="bold">{E_remain}</span> 卡</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
