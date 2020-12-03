import './App.css'
import Comics from './containers/Comics/Comics'
import Home from './containers/Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}>
        </Route>
        <Route path='/comics' exact component={Comics}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
