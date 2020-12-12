import './App.css'
import Comics from './containers/Comics/Comics'
import Home from './containers/Home/Home'
import MasterLayout from './Layouts/Master'
import ManageComcis from './containers/Comics/ManageComics'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <MasterLayout>
        <Switch>
          <Route path='/' exact component={Home}>
          </Route>
          <Route path='/comics' exact component={Comics}>
          </Route>
          <Route path="/comics/manage" component={ManageComcis}>
          </Route>
        </Switch>
      </MasterLayout>
    </Router>
  );
}

export default App;
