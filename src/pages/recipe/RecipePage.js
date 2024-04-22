import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Row, Col, Card, Typography, Divider } from 'antd';
import './RecipePage.css'
import Axios from '../../components/Axios';

const { Title, Paragraph } = Typography;

const RecipePage = () => {
  const [data, setData] = useState(null);
  console.log(data)

  const { rid } = useParams();
  
  console.log(rid)

  useEffect(() => {
      Axios().get('Recipe/get_id/', {"params":{"rid":rid}})
      .then((res) => {
        let recipe = res['data'][0]
        // 因後端傳輸檔案為多檔案

        const modifiedRecipe = { 
          ...recipe, 
          nutrition: JSON.parse(recipe.attributes.nutrition.replace(/'/g, '"')), 
          ingredients: JSON.parse(recipe.ingredients.replace(/'/g, '"')), 
          steps: JSON.parse(recipe.steps.replace(/'/g, '"')), 
        };
        setData(modifiedRecipe);
      })
      .catch((err)=>{
          console.log(err)
          if (err.response.status === 404){
            alert("this recipe is not found")
          }
      })
    }
  , [rid]);

  return (
    <div className='recipepage-container'>
    {data && (
      <Row gutter={16}>
        <Card style={{ borderRadius: '10px', textAlign: 'left', padding: '20px', marginRight: 60, fontSize: '20px' }}>
          <Title>{data.name}</Title>
          <Paragraph>{data.description}</Paragraph>
          <Divider />
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>準備材料</Title>
                <ul>
                  {data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>                
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>營養資訊</Title>
                <ul>
                  {data.nutrition.map((value, index) => {
                    let label ,unit 

                    switch (index) {
                      case 0:
                        label = "卡路里（#）";unit="卡"
                        break;
                      case 1:
                        label = "總脂肪（PDV）";unit="%"
                        break;
                      case 2:
                        label = "糖（PDV）";unit="%"
                        break;
                      case 3:
                        label = "鈉（PDV）";unit="%"
                        break;
                      case 4:
                        label = "蛋白質（PDV）";unit="%"
                        break;
                      case 5:
                        label = "飽和脂肪（PDV）";unit="%"
                        break;
                      default:
                        label = "碳水化合物（PDV）";unit="%"
                    }
                    return <li key={index}>{label}: {value}{unit}</li>;
                  })}
                </ul>
                <p>
                  PDV：每種營養成分相對於每日建議攝取量的百分比
                </p>
              </div>                
            </Col>
          </Row>

          <div>
            <Title level={3}>步驟</Title>
            <ol>
              {data.steps.map((step, index) => (
                <div key={index}>
                  <li>{step.trim()}</li>
                  {index !== data.steps.length - 1 && <Divider />}
                </div>
              ))}
            </ol>
          </div>
        </Card>
      </Row>
    )}
    </div>
  );
};

export default RecipePage;