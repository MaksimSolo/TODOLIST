import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from "./app/AppWithRedux/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {HashRouter} from "react-router-dom";


ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </HashRouter>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
