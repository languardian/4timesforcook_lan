import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import ReactPlayer from 'react-player/youtube';
import diseasesData from './data/data.json';
import nutritionData from './data/nutritionData.json';

const cardStyle = {
  background: 'rgba(255, 255, 255, 1)',
  marginBottom: '18px',
  textAlign: 'center',
  fontFamily: '標楷體, sans-serif',
  border: '1px solid lightgray', // 將邊框改成淡色
  fontSize: '24px',
  lineHeight: '24px', // 設置行高為 24px
};

const DiseaseRelatedCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleCardClick = (index) => {
    setModalVisible(true);
    setSelectedDisease(diseasesData[index]);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDisease(null);
  };

  return (
    <Card 
      title="疾病相關" 
      style={{ ...cardStyle, background: 'none', width: '80%', margin: 'auto' }}
      headStyle={{ fontSize: '29px' }} // 設置標題字體大小為 24px
    >
      {diseasesData.map((disease, index) => (
        <Card.Grid key={index} style={{ ...cardStyle, background: 'none', width: '33.33333%' }} onClick={() => handleCardClick(index)}>
          {disease.title}
        </Card.Grid>
      ))}

      <Modal
        title={`${selectedDisease?.title}相關信息`}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div style={{ width: '100%', maxWidth: '800px', margin: 'auto'}}>
          {Array.isArray(selectedDisease?.content)
            ? selectedDisease?.content.map((line, index) => (
                <p key={index}>{line}</p>
              ))
            : <p>{selectedDisease?.content}</p>
          }
          <img src={selectedDisease?.img && require(`${selectedDisease.img}`)} alt={selectedDisease?.title} style={{ width: '100%' }} />
        </div>
      </Modal>
    </Card>
  );
};

const NutritionRelatedCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (index) => {
    setModalVisible(true);
    setSelectedItem(nutritionData[index]);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <Card 
      title="營養價值" 
      style={{ ...cardStyle, background: 'none', width: '80%', margin: 'auto' }}
      headStyle={{ fontSize: '29px' }} // 設置標題字體大小為 24px
    >
      {nutritionData.map((item, index) => (
        <Card.Grid key={index} style={{ ...cardStyle, background: 'none', width: '33.33333%' }} onClick={() => handleCardClick(index)}>
          {item.title}
        </Card.Grid>
      ))}

      <Modal
        title={`${selectedItem?.title}相關信息`}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
          {Array.isArray(selectedItem?.content)
            ? selectedItem?.content.map((line, index) => (
                <p key={index}>{line}</p>
              ))
            : <p>{selectedItem?.content}</p>
          }
          <img src={selectedItem?.img && require(`${selectedItem.img}`)} alt={selectedItem?.title} style={{ width: '100%' }} />
        </div>
      </Modal>
    </Card>
  );
};

const VideoRelatedCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const videoData = [
    { title: 'Bert', url: 'https://www.youtube.com/watch?v=0_rP_qzj_5U' },
    // { title: '營養素', url: '' },              // 之後要換成營養素影片
    { title: '慢性病介紹1', url: 'https://youtu.be/GIujqU6j9_c' },
    { title: '慢性病介紹2', url: 'https://youtu.be/1OfM_w1Y8A0' },
  ];

  const handleCardClick = (index) => {
    setSelectedVideoUrl(videoData[index].url);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedVideoUrl(null);
  };

  return (
    <Card 
      title="相關影片" 
      style={{ ...cardStyle, background: 'none', width: '80%', margin: 'auto' }}
      headStyle={{ fontSize: '29px' }}
    >
      {videoData.map((video, index) => (
        <Card.Grid 
          key={index} 
          style={{ ...cardStyle, background: 'none', width: '33.333%' }}
          onClick={() => handleCardClick(index)}
        >
          {video.title}
        </Card.Grid>
      ))}

      <Modal
        title={`${videoData[selectedVideoUrl ? videoData.findIndex(v => v.url === selectedVideoUrl) : -1]?.title}影片`}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedVideoUrl && (
          <ReactPlayer 
            url={selectedVideoUrl} 
            controls 
            width="100%" 
            height="400px" 
          />
        )}
      </Modal>
    </Card>
  );
};

const App = () => (
  <div style={{ backgroundImage: `url(${require('../../../pictures/ffff.png')})`, backgroundSize: 'cover', height: '100vh' }}>
    <DiseaseRelatedCard />
    <NutritionRelatedCard />
    <VideoRelatedCard /> {/* 新增相關影片的卡片 */}
  </div>
);

export default App;
