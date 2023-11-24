import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/store';

import './App.css';
import MainMovie from './Components/MainMovie';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainMovie />
      </div>
    </Provider>
  );
}

export default App;
