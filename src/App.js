import React from 'react';
import logo from './assets/images/logotype_2.png';
import './App.scss';
import Navigation from './components/Navigation'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import JourneyDetails from './components/JourneyDetails/journey-details'


function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
            <div className="wrapper-header">
              <div className="logo">
                <img src={logo} alt="logotype" />
              </div>
              <Navigation />
            </div>
          </header>
          <Switch>
            <Route exact path='/' render={() => <JourneyDetails/>} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
