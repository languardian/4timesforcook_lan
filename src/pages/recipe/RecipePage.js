import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Row, Col, Card, Typography, Divider } from 'antd';
import './RecipePage.css'
import Axios from '../../components/Axios';

const { Title } = Typography;

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  // if (recipe) {
  //   console.log("食譜State:",recipe.attributes.nutrition)
  // }

  const { rid } = useParams();
  
  

  useEffect(() => {
      Axios().get('Recipe/get_id/', {"params":{"rid":rid.toString()}})
      .then((res) => {
        let recipe = res['data'][0]
        // console.log("從後端接收的食譜: ", recipe)
        // 因後端傳輸檔案為多檔案


        const changeRecipe = {
          ...recipe,
          ingredients: JSON.parse(recipe.ingredients.replace(/'/g, '"')), 
          steps: JSON.parse(recipe.steps.replace(/'/g, '"')), 
        };
        setRecipe(changeRecipe);
      })
      .catch((err)=>{
        console.log(err)
        if (err.response && err.response.status === 404){
            alert("找不到這個食譜")
        }
      })
    }
  , [rid]);

  return (
    <div className='recipepage-container'>
    {recipe && (
      <Row gutter={16}>
        <Card style={{ borderRadius: '10px', textAlign: 'left', padding: '20px', marginRight: 60, fontSize: '20px' }}>
          <Title>{recipe.name}</Title>
          <p>{recipe.description}</p>
          <Divider />
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>準備材料</Title>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>                
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>營養資訊</Title>
                <ul>
                  {Object.entries(recipe.attributes.nutrition).map(([key, value]) => {
                      let label;
                      switch (key) {
                        case 'calories':
                          label = '卡路里(cal)';
                          break;
                        case 'carbohydrates':
                          label = '碳水化合物(PDV)';
                          break;
                        case 'fat':
                          label = '脂肪(PDV)';
                          break;
                        case 'protein':
                          label = '蛋白質(PDV)';
                          break;
                        case 'saturated_fat':
                          label = '飽和脂肪(PDV)';
                          break;
                        case 'sodium':
                          label = '鈉(PDV)';
                          break;
                        case 'sugar':
                          label = '糖(PDV)';
                          break;
                        default:
                          label = key;
                      }
                      if (key === 'calories') {
                        return <li key={key}>{label}: {value} </li>;
                        
                      } else {
                        return <li key={key}>{label}: {value} % </li>;
                      }
                    
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
              {recipe.steps.map((step, index) => (
                <div key={index}>
                  <li>{step.trim()}</li>
                  {index !== recipe.steps.length - 1 && <Divider />}
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