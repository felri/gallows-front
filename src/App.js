import Login from 'views/Login';
import Setup from 'views/Setup';
import Game from 'views/Game';
import Scoreboard from 'views/Scoreboard';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/index.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'App.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/setup'>
              <Setup />
            </Route>
            <Route path='/game'>
              <Game />
            </Route>
            <Route path='/scoreboard'>
              <Scoreboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
