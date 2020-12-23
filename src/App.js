import { Provider } from 'react-redux'
import { store } from './redux/store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import ManageComcis from './containers/Comics/ManageComics'
import Comics from './containers/Comics/Comics'
import MasterLayout from './Layouts/Master'
import Home from './containers/Home/Home'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MasterLayout>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/comics' exact component={Comics}></Route>
            <Route path="/comics/manage" component={ManageComcis}></Route>
          </Switch>
        </MasterLayout>
      </Router>
    </Provider>
  );
}

export default App;
