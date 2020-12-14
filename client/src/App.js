import './App.css';
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import axios from 'axios'
import uuid from 'react-uuid'

import Header from './Header.js'
import Users from './Users.js'
import Exam from './Exam.js'
import { Card } from '@material-ui/core';

const Home = ({id, chooseCourse}) => {
  const [course, setCourse] = useState([])

  const getCourse = async () => {
    axios
      .get(`http://localhost:3001/course/${id}`)
      .then(response => {
        setCourse(response.data)
    })
  }

  useEffect(() => {
    if (id !== 0)
      getCourse()
  }, [])

  if (id === 0) 
    return <>{""}</>
  
  return (
    <div className="Tenttilista">
      <Card className="kortti">
        {course.map(item => <div key={uuid()}><Link to="/course/exam" onClick={() => chooseCourse(item.id)}>{item.name}</Link></div>)}
      </Card>
    </div>
  )
}

const App = () => {
  const [userId, setUserId] = useState(0)
  const [courseId, setCourseId] = useState(0)

  const chooseUser = (user) => {
    setUserId(user)
  }

  const chooseCourse = (course) => {
    setCourseId(course)
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/course/exam">
          <Exam userid={userId} courseid={courseId} />
        </Route>
        <Route path="/login">
          <Users chooseUser={chooseUser} />
        </Route>
        <Route path="/course">
          <Home id={userId} chooseCourse={chooseCourse} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
