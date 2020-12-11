import './App.css';
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Header.js'
import Users from './Users.js'
import Exam from './Exam.js'

const Home = () => {
  return <h2>Home</h2>;
}

const App = () => {
  const [currentUser, setCurrentUser] = useState(0)

  const chooseUser = (user) => {
    setCurrentUser(user)
  }

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/exam">
          <Exam />
        </Route>
        <Route path="/users">
          <Users chooseUser={chooseUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
