import React, { useState} from 'react';
import { Modal, Input, Checkbox } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './Health.css';
import Axios from '../Axios';
import { HealthProvider } from './HealthContext';


function Health({health}) {
  const [caloriesModalVisible, setCaloriesModalVisible] = useState(false);
  const [waterModalVisible, setWaterModalVisible] = useState(false);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [calories, setCalories] = useState('');
  const [water, setWater] = useState('');
  const [lowIntensity, setLowIntensity] = useState(false);
  const [mediumIntensity, setMediumIntensity] = useState(false);
  const [highIntensity, setHighIntensity] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [backendValues, setBackendValues] = useState(Object.values(health));
  const showCaloriesModal = () => {
    setCaloriesModalVisible(true);
  };

  const showWaterModal = () => {
    setWaterModalVisible(true);
  };

  const showExerciseModal = () => {
    setExerciseModalVisible(true);
  };

  const handleCaloriesOk = () => {
    Axios().post('/HManage/input_calories/', JSON.stringify({ "calories": parseInt(calories), "type":0}))
      .then(response => {
        console.log(response.data);
        setCaloriesModalVisible(false); // Close the modal
        window.location.reload();
            })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleWaterOk = () => {
    Axios().post('/HManage/input_water/', JSON.stringify({ "water": parseInt(water) }))
      .then(response => {
        console.log(response.data);
        setWaterModalVisible(false); // Close the modal
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleActivitiesOk = () => {
    const activities = [];
    if (lowIntensity) {
      activities.push(1);
    }
    if (mediumIntensity) {
      activities.push(2);
    }
    if (highIntensity) {
      activities.push(3);
    }
    Axios().post('/HManage/input_exercise/', JSON.stringify({ 
      "strong": parseInt(activities),
      "sport_time": parseInt(exerciseDuration)
    }))
      .then(response => {
        console.log(response.data);
        setExerciseModalVisible(false);
        window.location.reload();


      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancel = () => {
    setCaloriesModalVisible(false);
    setWaterModalVisible(false);
    setExerciseModalVisible(false);
  };

  const handleCaloriesInputChange = (e) => {
    setCalories(e.target.value);
  };

  const handleWaterInputChange = (e) => {
    setWater(e.target.value);
  };

  const renderIcon = (value) => {
    switch (value) {
      case 3:
        return <CheckCircleOutlined style={{ color: 'green' }}/>;
      case 1:
        return <CloseCircleOutlined style={{ color: 'red' }}/>;
      case 2:
        return <ExclamationCircleOutlined style={{ color: 'blue' }}/>;
      case 4:
        return <MinusCircleOutlined style={{ color: 'gray' }}/>;
      default:
        return null;
    }
  }

  return (
    <HealthProvider>
      <div className="health-container">
        <table className = "custom-table">
          <tbody>
            <tr>
              <td>一</td>
              <td>二</td>
              <td>三</td>
              <td>四</td>
              <td>五</td>
              <td>六</td>
              <td>七</td>
            </tr>
            <tr>
              {backendValues && Array.isArray(backendValues) && backendValues.map((value, week) => (
                <td key={week}>{renderIcon(value)}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button className="custom-button button-calories" onClick={showCaloriesModal}>卡路里</button>
          <button className="custom-button button-water" onClick={showWaterModal}>水份</button>
          <button className="custom-button button-exercise" onClick={showExerciseModal}>運動</button>
      </div>
      <Modal
        title="輸入卡路里"
        visible={caloriesModalVisible}
        onOk={handleCaloriesOk}
        onCancel={handleCancel}
      >
        <Input placeholder="請輸入卡路里" value={calories} onChange={handleCaloriesInputChange} />
      </Modal>
      <Modal
        title="輸入水份"
        visible={waterModalVisible}
        onOk={handleWaterOk}
        onCancel={handleCancel}
      >
        <Input placeholder="請輸入水份（毫升）" value={water} onChange={handleWaterInputChange} />
      </Modal>
      <Modal
        title="選擇運動強度"
        visible={exerciseModalVisible}
        onOk={handleActivitiesOk}
        onCancel={handleCancel}
      >
        <Checkbox checked={lowIntensity} onChange={(e) => setLowIntensity(e.target.checked)}>
          <p>低強度運動<br/>
          例如：散步、散步、伸展運動、舉起練手啞鈴、站立對著牆做掌上壓</p>
        </Checkbox>
        <Checkbox checked={mediumIntensity} onChange={(e) => setMediumIntensity(e.target.checked)}>
        <p>中強度運動：<br />
          例如：快步行、水中有氧運動、打網球（雙打）、在平路上踏單車、包含接與投的運動（例如排球和棒球）</p>
        </Checkbox>
        <Checkbox checked={highIntensity} onChange={(e) => setHighIntensity(e.target.checked)}>
        <p>高強度運動：<br />
          例如：緩步跑、快速游泳、跳快舞、跳繩、打網球（單打）、打籃球、踢足球</p>
        </Checkbox>
        <Input
          placeholder="請輸入運動時間（分鐘）"
          value={exerciseDuration}
          onChange={(e) => setExerciseDuration(e.target.value)}
        />
      </Modal>
      </div>
    </HealthProvider>
  );
}

export default Health;
