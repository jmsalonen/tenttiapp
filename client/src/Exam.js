import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Card, ExpansionPanelSummary } from '@material-ui/core'
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


const Exam = ({userid, courseid}) => {
  const { path, url } = useRouteMatch()
  const [exam, setExam] = useState([])
  const [examId, setExamId] = useState(0)
  const [userType, setUserType] = useState("")

  const getUser = async () => {
    await axios
      .get(`http://localhost:3001/user/${userid}`)
      .then(response => {
        setUserType(response.data[0].usertype)
      })
  }

  const getExam = async () => {
    const data = {
      user: userid,
      course: courseid
    }
    await axios
      .put(`http://localhost:3001/course/exam`, data)
      .then(response => {
        setExam(response.data)
    })
  }

  useEffect(() => {
    getUser()
    getExam()
  }, [])
  
  if (exam.length < 1)
    return <> {""} </>
  if (exam.length > 0)
    if (exam[0].id === null)
      return <> {""} </>
    else 
      return (
        <div className="Tenttilista">
          <div>
            {exam.map(item => 
              <Button 
                key={uuid()} 
                component={Link} 
                /* to={`${url}/${item.id}`}  */
                to={`${url}/question`}
                onClick={() => setExamId(item.id)}
                color="primary">
                  {item.name}
              </Button>)}
            {userType === "teacher" ? <div className="sulkuNappi"><Button color="primary" > + </Button> </div> : ""}
          </div>
          <Switch>
            <Route exact path={path}>
            </Route>
            {/* <Route path={`${path}/:examid`}> */}
            <Route path={`${path}/question`}>
              <Question userid={userid} courseid={courseid} examid={examId}/>
            </Route>
          </Switch>
          {userType === "teacher" ? <div className="sulkuNappi"><Button color="secondary" >Poista Tentti</Button> </div> : ""}
        </div>
      )
}

export default Exam