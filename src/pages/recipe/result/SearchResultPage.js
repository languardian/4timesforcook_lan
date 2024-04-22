import React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom'; // 引入 Link 組件
import './SearchResultPage.css';

function dealIngrdientValue(Text){
    let text = JSON.parse(Text.replace(/'/g, '"')) ; let str =""
    for (let i = 0 ; i < text.length ; i ++){
      if (i === (text.length-1)){
        str = str + text[i]
      }
      else{
        str = str + text[i] + "、"
      }
      
    }
    return str
}


function SearchResult({ searchResults }) {
  return (
    <div className="search-results-container">
      <Divider />
      {searchResults.map((item, index) => (
        <div key={index} className="search-result-item">
          <div className="search-result-content">
            {/* 使用 Link 將連結導向到 RecipePage，並將食譜的 ID 傳遞為路由參數 */}
            <Link to={`/Recipe/result/${item.rid}`}>{item.name}</Link>
            <Divider />
            <p className="description">食譜介紹：</p>
            <p className="description">{item.description}</p>
            <p className="description">有幾個步驟：  {item.attributes.n_steps}</p>
            <p className="description">食材的挑選：</p>
            <p className="description">{dealIngrdientValue(item.ingredients)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
