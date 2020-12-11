import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card } from '@material-ui/core'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Question from './Question.js'


const Exam = () => {
  const { path, url } = useRouteMatch()
  const [exam, setExam] = useState([])

  const getExam = async () => {
    axios
      .get('http://localhost:3001/exam/')
      .then(response => {
        setExam(response.data)
    })
  }

  useEffect(() => {
    getExam()
  }, [])

  return (
    <div className="Tenttilista">
      <div>
        {exam.map(item => <Button key={uuid()} component={Link} to={`${url}/${item.id}`} color="primary">{item.name}</Button>)}
        <Button color="primary" >+</Button>
      </div>
      <Switch>
        <Route exact path={path}>
        </Route>
        <Route path={`${path}/:examid`}>
          <Question />
        </Route>
      </Switch>
      <div className="sulkuNappi"><Button color="secondary" >Poista Tentti</Button> </div>
    </div>
  )
}

export default Exam