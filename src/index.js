import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CommentReducer from './reducers/index';

import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
   CommentReducer,
   window.devToolsExtension && window.devToolsExtension()
);

render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
