import React, { Component } from 'react';
import './App.css';
import routes from './routes';


class App extends Component {
  
  
  
  render() {
    return (
      <div className="body">
        {routes}
      </div>
    );
  }
}

export default App;
