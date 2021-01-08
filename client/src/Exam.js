import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Button } from '@material-ui/core'
import axios from 'axios'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import Question from './Question.js'

//const Exam = ({userid, courseid}) => {
const Exam = ({ token, profile }) => {
  const [myToken, setMyToken] = useState(token)
  const [myProfile, setMyProfile] = useState(profile)
  const [exam, setExam] = useState([])
  const [courseId, setCourseId] = useState(localStorage.getItem('course'))

  const getToken = async () => {
    setMyToken(localStorage.getItem('token'))
  }

  const getProfile = async () => {
    await axios
      .get(`http://localhost:3001/user/profile`, {
        headers: {
          'authorization': `${myToken}`
        }
      })
      .then(response => {
        setMyProfile(response.data)
    })
  }

  const getExam = async () => {
    const data = {
      user: myProfile.id,
      course: courseId
    }
    await axios
      .put(`http://localhost:3001/course/exam`, data)
      .then(response => {
        setExam(response.data)
    })
  }

  const setId = async (id) => {
    setCourseId(id)
    localStorage.setExam('course', id)
  }

  useEffect(() => {
    if (!token)
      getToken()
    if (!profile)
      getProfile()
    if (myProfile)
      getExam()
  }, [myToken, myProfile])

  if (myProfile === undefined) 
    return <>.</>

  return (<>{courseId}</>)

/*   const { path, url } = useRouteMatch()
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
                // to={`${url}/${item.id}`}  
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
            {// <Route path={`${path}/:examid`}> }
            <Route path={`${path}/question`}>
              <Question userid={userid} courseid={courseid} examid={examId}/>
            </Route>
          </Switch>
          {userType === "teacher" ? <div className="sulkuNappi"><Button color="secondary" >Poista Tentti</Button> </div> : ""}
        </div>
      ) */
}

export default Exam