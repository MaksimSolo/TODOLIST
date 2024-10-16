import {store} from "app/store/store";
import App from "app/ui/App";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<HashRouter>
  <Provider store={store}>
    <App/>
  </Provider>
</HashRouter>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
