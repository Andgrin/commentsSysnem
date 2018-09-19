import React, { Component } from 'react';
import './styles/App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import './styles/reset.sass'

import Main from './components/Main';

library.add(fab, far, fas);

class App extends Component {
   render() {
      return (
         <div className="app">
            <Main />
         </div>
      );
   }
}

export default App;
