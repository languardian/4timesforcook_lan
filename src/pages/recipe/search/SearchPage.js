import React, { useState , useEffect} from 'react';
import { Input, Button, Row, Col, Divider } from 'antd';
import Axios from '../../../components/Axios';
import TagSelector from './TagSelector';
import SearchResult from '../result/SearchResultPage'; // 引入搜尋結果組件
import { SearchOutlined } from '@ant-design/icons';
import './SearchPage.css';
import '../result/SearchResultPage.css';
import PlaceholderLoading from 'react-placeholder-loading'

// 我這邊搜尋結果有用placehoder套件，要注意！！
// https://www.npmjs.com/package/react-placeholder-loading

function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false); // 新增狀態來控制是否顯示搜尋結果

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const handleSearch = async () => {
    const searchData = {
      tags: selectedTags,
      userInput: inputValue
    };
    try {
      const response = await Axios().get('Recipe/example_output/', { params: searchData });
      console.log('GET request successful:', response.data);
      setSearchResults(response.data);
      setShowSearchResult(true);
      console.log(searchData);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios().get('Recipe/example_output/');
        console.log('GET request successful:', response.data);
        setSearchResults(response.data); // 更新搜尋結果
        setShowSearchResult(true); // 顯示搜尋結果


      } catch (error) {
        console.error('Error making GET request:', error);
      }
    };
  
    fetchData();
  }, []);

  const timeTags = ['15分鐘或更少', '30分鐘或更少', '60分鐘或更少', '60分鐘以上'];
  const cuisineTags = ['日式', '中式', '韓式', '西班牙', '義式', '德式', '墨西哥'];
  const healthTags = ['不含酒精', '低卡路里', '低蛋白', '高蛋白', '無麩質', '低鈉', '低膽固醇'];
  const hotSearches = [
    "有哪些以扁豆和菠菜為特色的菜餚？",
    "您能推薦以菠菜和茄子為主要成分的餐點嗎？",
    "您能建議一個以豆腐、花椰菜和甜椒為主要材料的素食食譜，並且能在25分鐘或更短的時間內烹飪完成嗎？",
    "我該如何做一份美味的時令水果沙拉？",
    "準備帶有檸檬和香草的烤鮭魚有什麼簡單的方法？",
    "一些健康的午餐三明治餡料有哪些？"
  ];

  return (
    <div className="searchpage-container">
      <div className="search-content">
        <div className="search-bar">
          <Input 
            placeholder="輸入你想吃的類型或是食物名稱" 
            size='large' 
            prefix={<SearchOutlined />} 
            onChange={handleInputChange}
            value={inputValue}
          />
        </div>
        <div className="slogan">
          <p>選擇您想要的種類，讓我們幫你挑選您可能喜愛的料理~</p>
        </div>
        <div className="hot-searches">
          {hotSearches.map((search, index) => (
            <div>
              {index+1}. 
              <span key={index} onClick={() => setInputValue(search)}>{search}</span>
            </div>
            ))}
        </div>
        <Divider/>
        <div className="conditions">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p className='tagName'>製作時間</p>
              <TagSelector tags={timeTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
            <Col span={8}>
              <p className='tagName'>各國料理</p>
              <TagSelector tags={cuisineTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
            <Col span={8}>
              <p className='tagName'>健康選擇</p>
              <TagSelector tags={healthTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
            </Col>
          </Row>
        </div>
        <div className="search-button">
          <Button shape='round' size='large' onClick={handleSearch}>搜索</Button>
        </div>
        
        {/* 顯示搜尋結果 */}
        {showSearchResult ? <SearchResult searchResults={searchResults}/> : <PlaceholderLoading shape='rect'/>}
      </div>
    </div>
  );
}

export default SearchPage;