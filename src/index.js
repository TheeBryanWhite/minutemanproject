import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

// This is our app's entry point. The only thing you're going to end up putting here are components called providers.
// If you look below, you'll see two: Provider and WebfontLoader. Providers wrap the app in additional
// functionality. The Provider component is for Redux and WebfontLoader kind of speaks for itself. It's
// configuration object is above and the Store config is over in the Redux folder, which contains all of our
// Redux functionality.

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
