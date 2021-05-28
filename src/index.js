import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import { Provider } from 'react-redux';
import store from './redux/store';

const config = {
  google: {
    families: [
      'Open Sans:300, 300 italic, 400, 400 italic, 600, 600 italic, 700, 700 italic, 800, 800 italic, ', 
    ],
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebfontLoader config={config}>
        <App />
      </WebfontLoader>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
