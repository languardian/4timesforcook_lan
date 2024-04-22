// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 引入 Provider
import store from './components/redux_components/store.js';
import Navbar from './components/NavBar.js';

//主頁
import IndexPage from "./pages/index/IndexPage.js"
import KnowledgeBase from "./pages/Member/Knowledge/KnowledgeBase.js"
import QuestionPage from './pages/Member/Ques/questions.js';
//會員相關-登入、註冊
import Loginpage from "./pages/Member/Login/Loginpage.js"
import RegistrationForm from "./pages/Member/Register/RegistrationForm.js"
//食譜
import SearchPage from "./pages/recipe/search/SearchPage.js"
import SearchResultPage from "./pages/recipe/result/SearchResultPage.js"
import RecipePage from './pages/recipe/RecipePage.js';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Navbar />
        <Routes>
          {/* 主頁 */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/KnowledgeBase" element={<KnowledgeBase />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/Member/login" element={<Loginpage />} />
          <Route path="/Member/register" element={<RegistrationForm />} />

          {/* 食譜 */}
          <Route path="/Recipe/search" element={<SearchPage />} />
          <Route path="/Recipe/result/:rid" element={<RecipePage />} />

          {/* 健康管理 */}
          {/* <Route path="/Member/HealthMange" element={} /> */}

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
