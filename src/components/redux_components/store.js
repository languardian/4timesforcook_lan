// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // 假設你有一個 reducers 文件夾並包含 rootReducer

const store = createStore(rootReducer);

export default store;