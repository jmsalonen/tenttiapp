import './App.css';
import { useEffect, useReducer, useState } from 'react'
import { Button, Tab, TextField, Card } from '@material-ui/core'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const Home = () => {
  return <h2>Home</h2>;
}

const Exam = () => {
  let { path, url } = useRouteMatch()
  const [exam, setExam] = useState([])

  useEffect(() => {
    const getExam = async () => {
      axios
        .get('http://localhost:3001/exam/')
        .then(response => {
          setExam(response.data)
        })
    }
    getExam()
  }, [])

  if (exam.length < 1)
    return <>loading...</>
  return (
    <div>
      <div className="Tenttilista">
        {exam.map(item => <Button component={Link} to={`${url}/${item.id}`} color="primary">{item.name}</Button>)}
      </div>
      <Switch>
        <Route exact path={path}>
        </Route>
        <Route path={`${path}/:examid`}>
          <div className="Tenttilista"><Question /></div>
        </Route>
      </Switch>
    </div>
  )
}
 
const Question = () => {
  let { examid } = useParams()
  const [question, setQuestion] = useState([])

  useEffect(() => {
    const getQuestion = async () => {
      axios
        .get(`http://localhost:3001/exam/${examid}/question`)
        .then(response => {
          setQuestion(response.data)
        })
    }
    getQuestion()
  }, [examid])

  if (question.length < 1)
    return <>loading...</>
  return (
    <Card className="kortti">
       {question.map(item => item.nro == 1
        ? <><h3>{item.question}</h3><div>{item.choice}</div></>
        : <div>{item.choice}</div>
       )} 
    </Card>
  )
} 

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      axios
        .get('http://localhost:3001/user/')
        .then(response => {
          setUsers(response.data)
        })
    }
    getUsers()
  }, [])

  if (users.length < 1)
    return <>loading...</>
  return (
    <div>
      {users.map(item => <div>{item.name}</div>)}
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/exam">Exam</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/exam">
            <Exam />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
