import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // 使用 Link
import './Recommend.css';
import Axios from '../Axios';

function Recommend({ recipe }) {
  const [data, setData] = useState(null);

  const { rid } = useParams();

  // useEffect(() => {
  //   Axios()
  //     .get('Recipe/get_id/', { params: { rid: rid } })
  //     .then((res) => {
  //       let recipe = res['data'][0];
  //       const changeRecipe = {
  //         ...recipe,
  //         ingredients: JSON.parse(recipe.ingredients.replace(/'/g, '"')),
  //       };
  //       setData(changeRecipe);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       if (err.response && err.response.status === 404) {
  //         alert('This recipe is not found');
  //       }
  //     });
  // }, [rid]);

  return (
    <div>
      <h1 style={{textAlign : "center"}}>根據您的身體狀況我們推薦您以下食譜</h1>
      <div className='recommend-container'>
        <div key={recipe.rid} className='recipe'>
          <div className='recipe-info'>
            <h2>食譜標題：{recipe.name}</h2>
            <p><strong>食譜介紹：</strong></p>
            <p>{recipe.description}</p>
            <p><strong>營養數值：</strong></p>
            <ul>
              {Object.entries(recipe.attributes.nutrition).map(([key, value]) => {
                let label, unit;
                switch (key) {
                  case 'calories':
                    label = '卡路里(cal)'; unit = '卡';
                    break;
                  case 'carbohydrates':
                    label = '碳水化合物(PDV)'; unit = '%';
                    break;
                  case 'fat':
                    label = '脂肪(PDV)'; unit = '%';
                    break;
                  case 'protein':
                    label = '蛋白質(PDV)'; unit = '%';
                    break;
                  case 'saturated_fat':
                    label = '飽和脂肪(PDV)'; unit = '%';
                    break;
                  case 'sodium':
                    label = '鈉(PDV)'; unit = '%';
                    break;
                  case 'sugar':
                    label = '糖(PDV)'; unit = '%';
                    break;
                  default:
                    label = key;
                }
                return <li key={key}>{label}: {value}{unit}</li>;
              })}
            </ul>
            <p style={{ fontSize: 'small' }}>PDV：每種營養成分相對於每日建議攝取量的百分比</p>
          </div>
          
        </div>
      </div> 
      <div  className='button-container'>
        <Link to={`/Recipe/result/${recipe.rid}`}>
          <button className='next-button' >Next</button> {/* 使用 Link 進行跳轉 */}
      </Link>
      </div>
      
    </div>
  );
}

export default Recommend;